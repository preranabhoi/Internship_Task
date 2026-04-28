import appConfig from "../config/app.json";
import { validateConfig } from "./validator";

export const config = validateConfig(appConfig);
