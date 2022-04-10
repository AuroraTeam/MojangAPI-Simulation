console.log("Starting...");

import "./core/db";

import { generateKeys, setKey } from "./core/keys";

generateKeys();
setKey();

import "./requests/sessionServer";
import "./requests/servicesServer";
import "./requests/accountsServer";
import "./requests/authServer";
