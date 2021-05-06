import crypto from "crypto";
import fs from "fs";
import path from "path";

const keysDir = path.join(__dirname, "../../keys");
const privateKeyPath = path.join(keysDir, "private.pem");

export function generateKeys(): void {
    if (fs.existsSync(privateKeyPath))
        return console.log("Keys exists, skip generate");

    if (!fs.existsSync(keysDir)) fs.mkdirSync(keysDir);
    const keys = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "der",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
        },
    });

    fs.writeFileSync(privateKeyPath, keys.privateKey);
    console.log("Private key saved");
    fs.writeFileSync(
        path.join(keysDir, "yggdrasil_session_pubkey.der"),
        keys.publicKey
    );
    console.log("Public key saved");
}

export function getSignature(data: Buffer) {
    return crypto
        .privateEncrypt(fs.readFileSync(privateKeyPath), data)
        .toString("base64");
}
