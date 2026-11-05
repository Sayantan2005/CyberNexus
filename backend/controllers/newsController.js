import News from "../models/News.js";

export async function listNews(req, res) {
  const { category, search, page = 1, limit = 12 } = req.query;
  const query = {};
  if (category && category !== "All") query.category = category;
  if (search) query.$or = [
    { title: { $regex: search, $options: "i" } },
    { description: { $regex: search, $options: "i" } }
  ];
  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    News.find(query).sort({ publishedAt: -1 }).skip(skip).limit(Number(limit)),
    News.countDocuments(query)
  ]);
  res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
}

export async function getNews(req, res) {
  const item = await News.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "News not found" });
  res.json(item);
}
