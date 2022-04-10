console.log("Starting...");

import "./core/db";
import "./requests/sessionServer";
import "./requests/servicesServer";
import "./requests/accountsServer";
import "./requests/authServer";

import { generateKeys, setKey } from "./core/keys";

generateKeys();
setKey();
