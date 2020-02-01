import { Command, flags } from "@oclif/command";
import AdamiteHelper from "../helpers/AdamiteHelper";
import chalk from "chalk";
const packageJson = require("root-require")("package.json");

export default class Start extends Command {
  static description = "starts an Adamite server";

  static args = [{ name: "executable" }];

  async run() {
    const { args } = this.parse(Start);

    const adamiteHelper = new AdamiteHelper();
    adamiteHelper.verifyCwdIsAdamiteProject();

    const { name, version } = adamiteHelper.getPackageJson();
    const port = process.env.PORT ? parseInt(process.env.PORT) : 9000;

    console.log(chalk.inverse(name));
    console.log(`v${version}\n`);

    console.log("Environment info:");
    console.log(`  * node:  ${process.version}`);
    console.log(`  *  cli:  v${packageJson.version}`);
    console.log("\n");

    const enabledServices = adamiteHelper.getEnabledServices();
    const totalServices = enabledServices.length;

    console.log(`Found ${chalk.bold(totalServices + " services")}:`);
    console.log(
      "  * " +
        enabledServices.map(s => chalk.green(s.name)).join("\n  * ") +
        "\n"
    );

    if (args.executable && !enabledServices.includes(args.executable)) {
      console.log(
        `${chalk.red("Error")}: Invalid executable: ${chalk.red(
          args.executable
        )}`
      );

      console.log("Available options: " + enabledServices.join(", "));

      return;
    }

    if (!args.executable) {
      adamiteHelper.startServices(port, enabledServices);
    } else {
      adamiteHelper.startServices(port, [args.executable]);
    }

    console.log("🎉  " + chalk.bgGreen(`listening on port ${port}`));
  }

  getRequiredServices(specifiedServices: string, allServices: string[]) {
    if (specifiedServices === "all") {
      return allServices;
    }

    if (specifiedServices === "none") {
      return [];
    }

    const splitSpecifiedServices = specifiedServices
      .split(",")
      .map(s => s.trim());

    return allServices.filter(s => splitSpecifiedServices.includes(s));
  }
}
