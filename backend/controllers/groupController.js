import Group from "../models/Group.js";
import Post from "../models/Post.js";

export async function listGroups(req, res) {
  const groups = await Group.find().populate("owner", "username").sort({ createdAt: -1 });
  res.json(groups);
}

export async function createGroup(req, res) {
  const { name, description, category } = req.body;
  if (!name) return res.status(400).json({ message: "Group name is required" });
  const group = await Group.create({
    name, description, category,
    owner: req.user._id,
    members: [req.user._id]
  });
  res.status(201).json(await group.populate("owner", "username"));
}

export async function joinGroup(req, res) {
  const group = await Group.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { members: req.user._id } },
    { new: true }
  );
  if (!group) return res.status(404).json({ message: "Group not found" });
  res.json(group);
}

export async function groupPosts(req, res) {
  const posts = await Post.find({ group: req.params.id })
    .populate("author", "username avatar")
    .sort({ createdAt: -1 });
  res.json(posts);
}
