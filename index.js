const express = require("express");
const elliptic = require("elliptic");
const crypto = require("crypto");
const sha3 = require("js-sha3");

const createHash = crypto.createHash;
const ec = new elliptic.ec("secp256k1");
const app = express();

app.use(express.json());

app.post("/verify", function (req, res) {
  const { address, signedAddress, publicKey } = req.body;

  try {
    const addressFromPubKey = createHash("rmd160").update(sha3.sha3_256(publicKey)).digest().toString("hex");

    res.json({
      success:
        ec.verify(address, JSON.parse(Buffer.from(signedAddress, "base64").toString("binary")), publicKey, "hex") &&
        address === addressFromPubKey,
    });
  } catch (e) {
    res.json({ success: false, error: e.toString() });
  }
});

app.use("*", function (req, res) {
  res.send("Wrong route");
});

app.listen(process.env.PORT || 3000);
