import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import CTF from "./models/CTF.js";

await mongoose.connect(process.env.MONGO_URI);

await CTF.deleteMany({});
await CTF.insertMany([
  {
    name: "CyberNexus Demo CTF",
    description: "Demo event for local development. Replace this with verified upcoming CTF data.",
    platform: "Online",
    startDate: new Date(Date.now() + 7*86400000),
    endDate: new Date(Date.now() + 9*86400000),
    categories: ["Web", "Forensics", "OSINT"],
    registrationUrl: "https://ctftime.org/",
    source: "CyberNexus Demo"
  }
]);

console.log("Seeded demo CTF");
await mongoose.disconnect();
