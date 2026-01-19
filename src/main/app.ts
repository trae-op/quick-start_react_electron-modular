import { app, Menu } from "electron";
import dotenv from "dotenv";
import path from "node:path";
import { initSettings, bootstrapModules } from "@devisfuture/electron-modular";
import { isDev } from "./@shared/utils.js";
import { AppModule } from "./app/module.js";
import { AddModule } from "./add/module.js";
import { AppPreloadModule } from "./app-preload/module.js";
import { AppVersionModule } from "./app-version/module.js";
import { DeleteModule } from "./delete/module.js";
import { ItemsModule } from "./items/module.js";
import { folders } from "./config.js";

const envPath = path.join(process.resourcesPath, ".env");
dotenv.config(!isDev() ? { path: envPath } : undefined);

app.disableHardwareAcceleration();

Menu.setApplicationMenu(null);

initSettings({
  baseRestApi: process.env.BASE_REST_API ?? "",
  localhostPort: process.env.LOCALHOST_ELECTRON_SERVER_PORT ?? "",
  folders: {
    distRenderer: folders.distRenderer,
    distMain: folders.distMain,
  },
});

app.on("ready", async () => {
  await bootstrapModules([
    AppModule,
    AppPreloadModule,
    AppVersionModule,
    AddModule,
    ItemsModule,
    DeleteModule,
  ]);
});
