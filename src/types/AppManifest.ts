export enum AppServices {
  database = "database",
  functions = "functions",
  auth = "auth",
  analytics = "analytics"
}

export enum PackageManager {
  yarn = "yarn",
  npm = "npm"
}

export type AppManifest = {
  appName: string;
  packageName: string;
  packageVersion: string;
  services: AppServices[];
  packageManager: PackageManager;
};
