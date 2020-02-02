import * as fs from "fs";
import * as path from "path";
import * as uuid from "uuid";
import { AdamiteConfig } from "../types/AdamiteConfig";
import { AdamiteService } from "../types/AdamiteService";
import RelayServer from "@adamite/relay-server";

export default class AdamiteHelper {
  verifyCwdIsAdamiteProject() {
    if (!fs.existsSync(this.getAdamiteConfigPath())) {
      throw new Error(process.cwd() + " is not an Adamite project.");
    }
  }

  getApiKey() {
    if (fs.existsSync(path.join(process.cwd(), "data", "api.json"))) {
      const apiJsonContents = fs.readFileSync(
        path.join(process.cwd(), "data", "api.json"),
        "utf-8"
      );

      const apiJson = JSON.parse(apiJsonContents);

      return apiJson.key;
    }
  }

  generateApiKey() {
    const apiKey = uuid.v4();
    const apiJson = JSON.stringify({ key: apiKey }, null, 2);

    if (!fs.existsSync(path.join(process.cwd(), "data"))) {
      fs.mkdirSync(path.join(process.cwd(), "data"));
    }

    if (!fs.existsSync(path.join(process.cwd(), "data", "api.json"))) {
      fs.writeFileSync(path.join(process.cwd(), "data", "api.json"), apiJson);
    }
  }

  getAdamiteConfig() {
    return require(this.getAdamiteConfigPath()) as AdamiteConfig;
  }

  getAdamiteConfigPath() {
    return path.join(process.cwd(), "adamite.js");
  }

  getPackageJson() {
    return require(path.join(process.cwd(), "package.json"));
  }

  getEnabledServices() {
    const { services } = this.getAdamiteConfig();
    return services;
  }

  startServices(port: number, services: AdamiteService[]) {
    const rootConfig = this.getAdamiteConfig();

    const manager = new RelayServer({
      port,
      apiKey: rootConfig.api.key,
      authSecret: this.getAuthSecret()
    });

    services.forEach(service =>
      this.startService(manager, service, rootConfig)
    );
  }

  startService(
    server: RelayServer,
    service: AdamiteService,
    rootConfig: AdamiteConfig
  ) {
    new service.service(server, service.options, rootConfig);
  }

  private getAuthSecret() {
    const rootConfig = this.getAdamiteConfig();
    const authService = rootConfig.services.find(s => s.name === "auth");
    if (!authService) return;
    return authService.options.secret;
  }
}
