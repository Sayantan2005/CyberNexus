import CTF from "../models/CTF.js";

export async function listCTFs(req, res) {
  const { category, search } = req.query;
  const query = { endDate: { $gte: new Date() } };
  if (category && category !== "All") query.categories = category;
  if (search) query.name = { $regex: search, $options: "i" };
  const items = await CTF.find(query).sort({ startDate: 1 });
  res.json(items);
}

export async function getCTF(req, res) {
  const item = await CTF.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "CTF not found" });
  res.json(item);
}
