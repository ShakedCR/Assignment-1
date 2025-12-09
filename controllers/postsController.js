const postModel = require('../models/postsModel');

const getAllPosts = async (req, res) => {
  try {
    const senderId = req.query.sender;
    if (senderId) {
      const posts = await postModel.find({ sender: senderId });
      if(!posts || posts.length === 0) {
        return res.status(404).send("No posts found for the specified sender");
      }
      return res.json(posts);
    } 
    const allPosts = await postModel.find();
    return res.status(200).json(allPosts);
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving posts");
  }
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.findById(id);
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving post by ID");
  }
};

const createPost = async (req, res) => {
  const postData = req.body;
  try {
    const newPost = new postModel(postData);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating post");
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedPost = await postModel.findByIdAndDelete(id);
    res.status(200).json(deletedPost);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting post");
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  try {
    const post = await postModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating post");
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost,
  updatePost,
};