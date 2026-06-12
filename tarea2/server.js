require("dotenv").config();

const express = require("express");
const path = require("path");

const indexRoutes = require("./routes/index.routes");
const contactoRoutes = require("./routes/contacto.routes");

const app = express();
const PORT = process.env.PORT;

if (!PORT) {
  throw new Error("La variable de entorno PORT no esta definida.");
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRoutes);
app.use("/contacto", contactoRoutes);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
