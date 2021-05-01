import crypto from "crypto";
import fs from "fs";
import path from "path";

const keysDir = path.join(__dirname, "../../keys");
const privateKeyPath = path.join(keysDir, "private.pem");

if (fs.existsSync(privateKeyPath)) {
    console.log("Keys exists, skip generate");
} else {
    if (!fs.existsSync(keysDir)) fs.mkdirSync(keysDir);
    crypto.generateKeyPair(
        "rsa",
        {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: "spki",
                format: "der",
            },
            privateKeyEncoding: {
                type: "pkcs8",
                format: "pem",
            },
        },
        (err, publicKey, privateKey) => {
            if (err) return console.error(err);

            fs.writeFile(privateKeyPath, privateKey, () =>
                console.log("Private key saved")
            );
            fs.writeFile(
                path.join(keysDir, "yggdrasil_session_pubkey.der"),
                publicKey,
                () => console.log("Public key saved")
            );
        }
    );
}

export function getSignature(data: Buffer) {
    return crypto
        .privateEncrypt(fs.readFileSync(privateKeyPath), data)
        .toString("base64");
}
