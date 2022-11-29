const { Router } = require("express");
const nodemailer = require("nodemailer");
const router = Router();

router.get("/", (req, res) => {
  try {
    res.send("hola");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/email", async (req, res) => {
  try {
    console.log(req.body);
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
        user: "hectordubs24@gmail.com",
        pass: "xtbicyokoxruiagb",
      },
    });

    transporter.verify().then(() => console.log("listo para enviar "));

    const info = await transporter.sendMail({
      from: "Registro de usuario <Copilot PC>",
      to: email,
      subject: "Registro de usuario",
      html: contentHTML,
    });

    console.log(info);

    res.send("hola");
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/orderd", async (req, res) => {
  try {
    const { order, email, orderId } = req.body;
    const { shippingAddress, orderItems, totalPrice, createdAt } = order;
    contentHTML = `
      <h2>Confirmación de pedido: ${orderId}</h2>
      <h4>Hola, tu pedido se ha realizado.</h4>
      <hr>
      <h4>Los detalles del pedido se indican a continuación:</h4>
      <hr>
      <p>Fecha de realización: ${String(createdAt).substring(0, 10)} </p>
      <p>Tu pedido será enviado a: </p>
      <ul>
        <li>Nombre: ${shippingAddress.fullName}</li>
        <li>Dirección: ${shippingAddress.address}</li>
        <li>Ciudad: ${shippingAddress.city}</li>
        <li>Código postal: ${shippingAddress.postalCode}</li>
        <li>País: ${shippingAddress.country}</li>
      </ul>
      <p>Total del pedido (impuestos aplicables incluidos): $${totalPrice}.00</p>


      <p>Gracias por tu preferencia 😀</p>
    `;
    const transporter = nodemailer.createTransport({
      // host: "smpt.gmail.com",
      service: "gmail",
      port: 465,
      secure: false,
      auth: {
        user: "hectordubs24@gmail.com",
        pass: "xtbicyokoxruiagb",
      },
    });

    transporter.verify().then(() => console.log("listo para enviar "));

    const info = await transporter.sendMail({
      from: "Confirmación de pedido <Copilot PC>",
      to: email,
      subject: "Confirmación de pedido",
      html: contentHTML,
    });

    console.log(info);

    res.send("hola");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
