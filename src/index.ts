import express from "express";

const app = express();
const PORT = 3000;

const objetoJSON = { status: "Servidor en línea", version: "1.0.0" };

app.get("/api/status", function (req, res) {
  res.send(objetoJSON);
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
