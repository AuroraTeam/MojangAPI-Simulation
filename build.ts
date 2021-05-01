import fs from "fs"
import os from "os"
import { spawn } from "child_process"

import { generateKeys } from "./src/core/keys";
generateKeys();

if (!fs.existsSync('./authlib')) {
    console.error("Отсутствует репозиторий Authlib! Выполните команды `git submodule init` и `git submodule update`, после чего запустите скрипт повторно");
    process.exit(0)
}

fs.copyFileSync('./keys/yggdrasil_session_pubkey.der', './authlib/src/main/resources/yggdrasil_session_pubkey.der')

const proc = spawn(os.platform() === "win32" ? 'gradlew.bat' : 'gradlew', ['build'], { cwd: './authlib' });
proc.stdout.pipe(process.stdout);
proc.stderr.pipe(process.stderr);
