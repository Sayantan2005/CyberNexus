import Bookmark from "../models/Bookmark.js";

export async function toggleBookmark(req, res) {
  const { type } = req.body;
  if (!["news", "ctf"].includes(type)) return res.status(400).json({ message: "Invalid bookmark type" });
  const existing = await Bookmark.findOne({ user: req.user._id, type, item: req.params.itemId });
  if (existing) {
    await existing.deleteOne();
    return res.json({ bookmarked: false });
  }
  await Bookmark.create({ user: req.user._id, type, item: req.params.itemId });
  res.status(201).json({ bookmarked: true });
}

export async function listBookmarks(req, res) {
  res.json(await Bookmark.find({ user: req.user._id }).sort({ createdAt: -1 }));
}
