import User from "../models/User.js";

export async function updateProfile(req, res) {
  const { bio, interests, avatar } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { bio, interests, avatar },
    { new: true, runValidators: true }
  ).select("-passwordHash");
  res.json(user);
}
