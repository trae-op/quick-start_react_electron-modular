import { app } from "electron";
import path from "node:path";
import { isDev } from "./utils.js";
import { folders } from "../config.js";

export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/" + folders.distMain + "/preload.cjs"
  );
}

export function getUIPath() {
  return path.join(
    app.getAppPath(),
    "/" + folders.distRenderer + "/index.html"
  );
}

export function getAssetsPath() {
  return path.join(app.getAppPath(), isDev() ? "." : "..", "src/assets");
}
