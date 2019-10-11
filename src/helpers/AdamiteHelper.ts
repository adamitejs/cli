import * as fs from "fs";
import * as path from "path";

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

  startApi() {
    require(path.join(process.cwd(), "node_modules", "@adamite/api"))(
      this.getAdamiteConfig()
    );
  }

  startService(serviceId: string) {
    if (!this.getEnabledServices().includes(serviceId)) {
      throw new Error(
        `Service "${serviceId}" does not exist and can't be started.`
      );
    }

    const adamiteConfig = this.getAdamiteConfig();
    const service = adamiteConfig.services[serviceId];

    service.service(service.config, adamiteConfig);
  }
}
