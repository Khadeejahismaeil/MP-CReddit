// import express, { json } from "express";
const express = require("express");
const { json } = express;
const { posts } = require("./data");
const { v4: uuidv4 } = require("uuid");


const app = express();
app.use(json());

app.get("/", (req, res) => {
    res.send("Welcome to the API! khadeejah loves being creative so she added this extra root route");
  });
  

//find post by id
const findPostById = (id) => posts.find((post) => post.id === id);

// 1) get /posts - get all posts or filter
app.get("/posts", (req, res) => {
  const { title } = req.query; // optional title

  // flter by title, else return all 
  const filteredPosts = title? posts.filter((post) => post.title.toLowerCase().includes(title.toLowerCase())): posts;

  res.status(200).json(filteredPosts); // return filtered or full list of posts
  });

//2)get /posts/:id - grt a single post by ID
app.get("/posts/:id", (req, res) => {
  const post = findPostById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
  }
  res.status(200).json(post);
});

//3)post /posts - it adds new post
app.post("/posts", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and descreption are requir" });
  }

  const newPost = { id: uuidv4(), title, description, comments: [] };
  posts.push(newPost);
  res.status(201).json(newPost);
});

//4)delet /posts/:id - delet a post by ID
app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((post) => post.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: `Post with ID ${req.params.id} not found` });
  }

  posts.splice(index, 1); // remov post
  res.status(200).json({ message: "Post has been deleted successfully" });
});

//5)post /posts/:id/comments - addong comments to post
app.post("/posts/:id/comments", (req, res) => {
  const post = findPostById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const { username, comment } = req.body;

  if (!username || !comment) {
    return res.status(400).json({ message: "Username and comment are required" });
  }

  const newComment = { id: uuidv4(), username, comment };
  post.comments.push(newComment);
  res.status(201).json(newComment);
});

//6)dlete /posts/comments/:id - delte a comment by comment id

app.delete("/posts/comments/:id", (req, res) => {
  //search posts to find and delete the comment
  const commentFound = posts.some((post) => {
    const commentIndex = post.comments.findIndex((c) => c.id === req.params.id);

    if (commentIndex !== -1) {
      post.comments.splice(commentIndex, 1); //rmove comment
      return true;
    }
  });

  if (!commentFound) {
    return res.status(404).json({ message: "Comment not found" });
  }

  res.status(200).json({ message: "Comment has been deleted successfully" });
});

// lets Goooooooooooooooooooo
const PORT = 3000;
app.listen(PORT, () => {console.log(`Server is running on http://localhost:${PORT}`);
});
