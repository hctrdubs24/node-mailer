const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.send("hola");
  } catch (error) {
    console.log(error);
  }
});

router.post("/email", async (req, res) => {
  try {
    const { email } = req.body;
    contentHTML = `
    <h2>¡Su cuenta ha sido registrada!</h2>
    <p>Puede ver nuestro catálogo en: <a href="https://copilot-pc.vercel.app/">Copilot PC</a></p>
  `;
    const transporter = nodemailer.createTransport({
      // host: "smpt.gmail.com",
      service: "gmail",
      port: 465,
      secure: false,
      auth: {
        user: email,
        pass: "xtbicyokoxruiagb",
      },
    });

    transporter.verify().then(() => console.log("listo para enviar "));

    const info = await transporter.sendMail({
      from: "Registro de usuario <Copilot PC>",
      to: "hectordubs24@gmail.com",
      subject: "Registro de usuario",
      html: contentHTML,
    });

    console.log(info);

    res.send("hola");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
