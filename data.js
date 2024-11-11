const { v4: uuidv4 } = require("uuid");

const posts = [
  {
    id: uuidv4(),
    title: "I have no idea what to write here",
    description: "Did they even mention anything related to the description part?",
    comments: [
      { id: uuidv4(), username: "User1", comment: "Great post!" },
    ],
  },
  {
    id: uuidv4(),
    title: "Khadeejah",
    description: "Just a regular description",
    comments: [
      { id: uuidv4(), username: "User2", comment: "Not a great post!" },
    ],
  },
];

module.exports = { posts };
