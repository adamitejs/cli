import { Command, flags } from "@oclif/command";
import AdamiteHelper from "../helpers/AdamiteHelper";
import chalk from "chalk";

export default class Start extends Command {
  static description = "starts an Adamite server";

  static args = [{ name: "executable" }];

  async run() {
    const { args } = this.parse(Start);

    const adamiteHelper = new AdamiteHelper();
    adamiteHelper.verifyCwdIsAdamiteProject();

    const { name, version } = adamiteHelper.getPackageJson();

    console.log(chalk.inverse(name));
    console.log(`v${version}\n`);

    const enabledServices = adamiteHelper.getEnabledServices();
    const totalServices = enabledServices.length;

    console.log(`Found ${chalk.bold(totalServices + " services")}...`);
    console.log(enabledServices.map(s => chalk.green(s)).join(", ") + "\n");

    if (
      args.executable &&
      args.executable !== "api" &&
      !enabledServices.includes(args.executable)
    ) {
      console.log(
        `${chalk.red("Error")}: Invalid executable: ${chalk.red(
          args.executable
        )}`
      );

      console.log("Available options: api, " + enabledServices.join(", "));

      return;
    }

    if (!args.executable) {
      adamiteHelper.startServices(["api", ...enabledServices]);
    } else if (args.executable === "api") {
      adamiteHelper.startServices(["api"]);
    } else {
      adamiteHelper.startServices([args.executable]);
    }
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
