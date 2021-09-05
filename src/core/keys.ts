import crypto from "crypto";
import fs from "fs";
import path from "path";

const keysDir = path.join(__dirname, "../../keys");
const privateKeyPath = path.join(keysDir, "private.pem");
const publicKeyPath = path.join(keysDir, "yggdrasil_session_pubkey.der");
let privateKey: string;

export function generateKeys(): void {
    if (fs.existsSync(privateKeyPath) && fs.existsSync(publicKeyPath))
        return console.log("[Key Manager] Keys exists, skip generate");

    if (!fs.existsSync(keysDir)) fs.mkdirSync(keysDir);
    const keys = crypto.generateKeyPairSync("rsa", {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: "spki",
            format: "der",
        },
        privateKeyEncoding: {
            type: "pkcs8",
            format: "pem",
        },
    });

    fs.writeFileSync(privateKeyPath, keys.privateKey);
    console.log("[Key Manager] Private key saved");
    fs.writeFileSync(publicKeyPath, keys.publicKey);
    console.log("[Key Manager] Public key saved");
}

export function setKey() {
    privateKey = fs.readFileSync(privateKeyPath).toString();
}

export function getSignature(data: string) {
    const sign = crypto.createSign("sha1");
    sign.update(data);
    sign.end();
    return sign.sign(privateKey, "base64");
}
