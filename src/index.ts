import "./core/db";

import App from "./core/main";
export default App;

import { generateKeys } from "./core/keys";
generateKeys();

import "./requests/sessionServer";
import "./requests/servicesServer";
import "./requests/accountsServer";
