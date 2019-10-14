import * as fs from "fs";
import * as path from "path";
import * as concurrently from "concurrently";

export default class AdamiteHelper {
  verifyCwdIsAdamiteProject() {
    if (!fs.existsSync(this.getAdamiteConfigPath())) {
      throw new Error(process.cwd() + " is not an Adamite project.");
    }
  }

  getAdamiteConfig() {
    return require(this.getAdamiteConfigPath());
  }

  getAdamiteConfigPath() {
    return path.join(process.cwd(), "adamite.js");
  }

  getPackageJson() {
    return require(path.join(process.cwd(), "package.json"));
  }

  getEnabledServices() {
    const { services } = this.getAdamiteConfig();
    return Object.keys(services);
  }

  startServices(services: string[]) {
    return concurrently(
      services.map(s => ({
        command: `node bin/${s}`,
        name: s
      }))
    );
  }
}
