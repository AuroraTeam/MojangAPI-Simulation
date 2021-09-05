console.log('Starting...');

import "./core/db";

import App from "./core/main";
export default App;

import { generateKeys, setKey } from "./core/keys";
generateKeys();
setKey();

import "./requests/sessionHost";
import "./requests/servicesHost";
import "./requests/accountsHost";
