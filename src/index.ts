console.log('Starting...');

import "./core/db";

import App from "./core/main";
export default App;

import { generateKeys } from "./core/keys";
generateKeys();

import "./requests/sessionHost";
import "./requests/servicesHost";
import "./requests/accountsHost";
