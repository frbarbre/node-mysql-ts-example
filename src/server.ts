import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World Carrot");
});

app.post("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Post Request Received for id: ${id}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
