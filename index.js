const express = require("express");
const elliptic = require("elliptic");

const ec = new elliptic.ec("secp256k1");
const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/verify", function (req, res) {
  const { message, signedMessage, publikKey } = req.body;

  try {
    res.json({ success: ec.verify(message, JSON.parse(signedMessage), publikKey, "hex") });
  } catch (e) {
    res.json({ success: false, error: e.toString() });
  }
});

app.listen(3000);
