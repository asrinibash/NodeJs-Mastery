const express = require("express");
const data = require("./MOCK_DATA.json");

const app = express();
const port = 8000;

//hybrid APIs
app.get("/users", (req, res) => {
  const html = `
      <ul>
      ${data
        .map((user) => `<li>${user.first_name} ${user.last_name}</li>`)
        .join("")}
      </ul>
      `;
  return res.send(html);
});

//REST APIs -> check out task.txt page for detailing of REST APIs
app.get("/api/users", (req, res) => {
  return res.json(data);
});

app.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = data.find((user) => user.id == id);
  return res.json(user);
});

app.listen(port, () => {
  console.log(`Server Started at ${port}`);
});
