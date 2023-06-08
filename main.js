const elliptic = require("elliptic");
const ec = new elliptic.ec("secp256k1");

window.onSubmit = function () {
  const privateKey = document.getElementById("private").value;
  const addressToSign = document.getElementById("address").value;

  const keiPair = ec.keyPair({ priv: privateKey, privEnc: "hex" });

  const publicKey = keiPair.getPublic(true, "hex");

  console.log("PublicKey:", publicKey);

  const result = btoa(JSON.stringify(ec.sign(addressToSign, privateKey, "hex")));

  console.log("Signed text", result);
};
