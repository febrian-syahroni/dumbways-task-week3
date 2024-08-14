require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

// body parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

// setup view engine
app.set("views", "./views");
app.set("view engine", "hbs");

// array of object
const projects = [];

// route
app.get("/", (req, res) => {
  res.render("index", { projects: [...projects] });
});

app.get("/add-project", (req, res) => {
  res.render("add-projects");
});

app.post("/add-project", (req, res) => {
  const addProject = {
    id: projects.length + 1,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    description: req.body.description,
    checklist: req.body.checklist,
  };
  projects.push(addProject);
  res.redirect("/");
});

app.get("/edit-project/:id", (req, res) => {
  const id = req.params.id;
  const project = projects.find((e) => e.id == id);
  res.render("edit-project", { data: project });
});

app.post("/edit-project/:id", (req, res) => {
  const id = req.params.id;
  const index = projects.findIndex((e) => e.id == id);

  projects[index] = {
    id: id,
    title: req.body.title,
    start: req.body.start,
    end: req.body.end,
    description: req.body.description,
    checklist: req.body.checklist,
  };

  res.redirect("/");
});

app.get("/delete-project/:id", (req, res) => {
  const id = req.params.id;
  const index = projects.findIndex((e) => e.id == id);
  projects.splice(index, 1);
  res.redirect("/");
});

app.get("/project-details/:id", (req, res) => {
  const id = req.params.id;
  const project = projects.find((e) => e.id == id);
  res.render("project-details", { data: project });
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(PORT, () => {
  console.log("Server berjalan di port 3000");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
