const express = require("express");
const path = require("path");

const router = express.Router();

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "contacto.html"));
});

router.get("/enviado", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "enviado.html"));
});

router.post("/", async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();

  if (!accessKey || accessKey === "pon_tu_access_key_aqui") {
    return res.status(500).send("La variable de entorno WEB3FORMS_ACCESS_KEY no esta configurada.");
  }

  if (!nombre || !email || !mensaje) {
    return res.status(400).send("Todos los campos del formulario son obligatorios.");
  }

  const confirmationUrl = `${req.protocol}://${req.get("host")}/contacto/enviado`;

  return res.send(`<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Enviando mensaje | Aldo Velazquez</title>
  <link rel="stylesheet" href="/css/global.css">
  <link rel="stylesheet" href="/css/contacto.css">
</head>
<body>
  <main class="confirmation">
    <section>
      <p class="eyebrow">Contacto</p>
      <h1>Enviando mensaje</h1>
      <p>Estamos procesando tu mensaje.</p>
      <form id="web3forms-form" action="https://api.web3forms.com/submit" method="POST">
        <input type="hidden" name="access_key" value="${escapeHtml(accessKey)}">
        <input type="hidden" name="name" value="${escapeHtml(nombre)}">
        <input type="hidden" name="email" value="${escapeHtml(email)}">
        <input type="hidden" name="message" value="${escapeHtml(mensaje)}">
        <input type="hidden" name="subject" value="Nuevo mensaje desde el CV en linea">
        <input type="hidden" name="from_name" value="CV en linea - Aldo Velazquez">
        <input type="hidden" name="redirect" value="${escapeHtml(confirmationUrl)}">
        <input type="checkbox" name="botcheck" style="display: none;">
        <noscript>
          <button class="button primary" type="submit">Continuar envio</button>
        </noscript>
      </form>
    </section>
  </main>
  <script>
    document.getElementById("web3forms-form").submit();
  </script>
</body>
</html>`);
});

module.exports = router;
