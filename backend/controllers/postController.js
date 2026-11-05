import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export async function createPost(req, res) {
  const { group, title, content } = req.body;
  if (!group || !title || !content) return res.status(400).json({ message: "Group, title and content are required" });
  const post = await Post.create({ group, title, content, author: req.user._id });
  res.status(201).json(await post.populate("author", "username avatar"));
}

export async function toggleLike(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const id = req.user._id.toString();
  const exists = post.likes.some(x => x.toString() === id);
  if (exists) post.likes.pull(req.user._id);
  else post.likes.push(req.user._id);
  await post.save();
  res.json({ likes: post.likes.length, liked: !exists });
}

export async function listComments(req, res) {
  res.json(await Comment.find({ post: req.params.postId }).populate("author", "username avatar").sort({ createdAt: 1 }));
}

export async function createComment(req, res) {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: "Comment cannot be empty" });
  const comment = await Comment.create({ post: req.params.postId, author: req.user._id, content });
  res.status(201).json(await comment.populate("author", "username avatar"));
}
