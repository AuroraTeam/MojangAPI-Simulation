import { execSync } from "child_process";
import fs from "fs";

import { generateKeys } from "./src/core/keys";

generateKeys();

if (!fs.existsSync("./authlib")) {
    execSync("git submodule init");
    execSync("git submodule update");
}

fs.copyFileSync(
    "./keys/yggdrasil_session_pubkey.der",
    "./authlib/src/main/resources/yggdrasil_session_pubkey.der"
);

execSync("gradlew build", { cwd: "./authlib" });
