import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Parser from "rss-parser";
import cron from "node-cron";

const parser = new Parser();

const feeds = [
  { source: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { source: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
  { source: "KrebsOnSecurity", url: "https://krebsonsecurity.com/feed/" }
];

const newsSchema = new mongoose.Schema({
  title: String, description: String, url: { type: String, unique: true },
  image: String, source: String, category: String, publishedAt: Date, tags: [String]
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model("News", newsSchema);

function categoryFor(title = "") {
  const t = title.toLowerCase();
  if (/(cve|vulnerability|patch|exploit)/.test(t)) return "Vulnerability";
  if (/(ransomware|trojan|malware|botnet|stealer)/.test(t)) return "Malware";
  if (/(breach|leak|stolen data)/.test(t)) return "Data Breach";
  if (/(phishing|social engineering)/.test(t)) return "Phishing";
  if (/(ai|artificial intelligence|llm)/.test(t)) return "AI Security";
  return "Cybersecurity";
}

async function ingest() {
  console.log("News ingestion started:", new Date().toISOString());
  for (const feed of feeds) {
    try {
      const parsed = await parser.parseURL(feed.url);
      for (const item of parsed.items.slice(0, 20)) {
        if (!item.link || !item.title) continue;
        await News.updateOne(
          { url: item.link },
          {
            $setOnInsert: {
              title: item.title.trim(),
              description: item.contentSnippet || item.content || "",
              url: item.link,
              image: item.enclosure?.url || "",
              source: feed.source,
              category: categoryFor(item.title),
              publishedAt: item.isoDate ? new Date(item.isoDate) : new Date(),
              tags: []
            }
          },
          { upsert: true }
        );
      }
      console.log(`Imported ${feed.source}`);
    } catch (err) {
      console.error(`Feed failed: ${feed.source}`, err.message);
    }
  }
}

await mongoose.connect(process.env.MONGO_URI);
await ingest();
cron.schedule(process.env.NEWS_CRON || "*/30 * * * *", ingest);
