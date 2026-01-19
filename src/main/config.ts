import dotenv from "dotenv";
import path from "node:path";
import { isDev } from "./$shared/utils.js";

const envPath = path.join(process.resourcesPath, ".env");
dotenv.config(!isDev() ? { path: envPath } : undefined);

export const windows: TWindows = {
  main: "window:main",
  updateResource: "window/resource/update",
  addResource: "window/resource/add",
  deleteResource: "window/resource/delete",
  preloadApp: "window:preload-app",
  updateApp: "window:update-app",
  masterKey: "window:master-key",
  twoFactorQA: "window:two-factor-qa",
  twoFactorVerify: "window:two-factor-verify",
  authSocialNetwork: "window:auth-social-network",
};

export const folders = {
  distRenderer: "dist-renderer",
  distMain: "dist-main",
  download: "app-update",
};

export const menu = {
  labels: {
    app: "App",
    checkUpdate: "Check for updates...",
    showApp: "Show",
    quit: "Quit",
    resources: "Resources",
    devTools: "Developer tools",
  },
};

export const icons = {
  trayIconTemplate: "16x16.png",
  trayIcon: "16x16.png",
  notificationIcon: "72x72.png",
};

export const messages = {
  autoUpdater: {
    checkingForUpdate: "Checking for update...",
    updateNotAvailable: "Update not available",
    updateAvailable: "Update available",
    updateDownloaded: "Update downloaded",
    notificationTitle: "New updates",
    notificationBody: "Your app has new updates!",
    error: "Something wrong!",
    errorCreatingFolder: "Unknown error creating folder",
    errorOpenFolder: "Failed to open folder",
    errorVerifyDownload: "File does not exist",
  },
  auth: {
    errorGenerateQA: "Something wrong with generate QR code!",
    errorEnableTwoFactor: "Something wrong with Enable Two Factor!",
    errorTwoFactorAuthenticate: "Something wrong with two factor authenticate",
    errorTokenUserMissing: "Token or userId is missing!",
    userAlreadyExists: "User already exists!",
  },
  user: {
    errorNotFoundUser: "The user is not found!",
  },
  crash: {
    uncaughtException: "Uncaught synchronous error in main process!",
    unhandledRejection: "Unhandled Promise failure in main process!",
    renderProcessGone: "The renderer process terminated unexpectedly!",
  },
};

export const publishOptions = {
  repo: "electron-password-generation",
  owner: "trae-op",
};

export const restApi = {
  urls: {
    base: process.env.BASE_REST_API,
    baseApi: "/api",
    auth: {
      base: "/auth",
      google: "/google",
      facebook: "/facebook",
      twoFactor: "/two-factor",
      generate: "/generate",
      authenticate: "/authenticate",
      enable: "/enable",
      access: "/access",
    },
    user: {
      base: "/user",
      byId: (id: string) => `/${id}`,
    },
    resources: {
      base: "/resources",
      byId: (id: string) => `/${id}`,
    },
    githubReleases: `https://api.github.com/repos/${publishOptions.owner}/${publishOptions.repo}/releases`,
  },
};

export const timers = {
  intervalCheckAuth: 60000,
};

export const cryptoOptions = {
  AES_KEY_LENGTH_BYTES: 32,
  SALT_LENGTH_BYTES: 16,
  PBKDF2_ITERATIONS: 500000,
  PBKDF2_DIGEST: "sha512",
  AES_ALGORITHM: "aes-256-cbc",
};
