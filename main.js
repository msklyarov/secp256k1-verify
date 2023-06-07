const elliptic = require("elliptic");
const ec = new elliptic.ec("secp256k1");

window.onSubmit = function () {
  const privateKey = document.getElementById("private").value;
  const textToSign = document.getElementById("text").value;

  const keiPair = ec.keyPair({ priv: privateKey, privEnc: "hex" });

  const publicKey = keiPair.getPublic(true, "hex");

  console.log("PublicKey:", publicKey);

  const result = JSON.stringify(ec.sign(textToSign, privateKey, "hex"));

  console.log("Signed text", result);
};
