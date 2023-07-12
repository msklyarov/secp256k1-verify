const express = require('express');
const elliptic = require('elliptic');
const crypto = require('crypto');
const sha3 = require('js-sha3');

const createHash = crypto.createHash;
const ec = new elliptic.ec('secp256k1');
const app = express();

app.use(express.json());

app.post('/verify', function (req, res) {
    const {uuid, signature} = req.body;

    const hexToDecimal = x => ec.keyFromPrivate(x, 'hex').getPrivate().toString(10);

    try {
        const objSignature = JSON.parse(Buffer.from(signature, 'base64').toString('binary'));

        const publicKey = ec
            .recoverPubKey(hexToDecimal(uuid), objSignature, objSignature.recoveryParam, 'hex')
            .encodeCompressed('hex');

        if (!ec.verify(uuid, JSON.parse(Buffer.from(signature, 'base64').toString('binary')), publicKey, 'hex')) {
            return res.json({
                success: false,
                error: 'Wrong signature'
            });
        }

        res.json({
            success: true,
            address: createHash('rmd160').update(sha3.sha3_256(publicKey)).digest().toString('hex')
        });
    } catch (e) {
        res.json({success: false, error: e.toString()});
    }
});

app.use('*', function (req, res) {
    res.send('Wrong route');
});

app.listen(process.env.PORT || 3000);
