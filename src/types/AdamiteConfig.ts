import { AdamiteService } from "./AdamiteService";

export type AdamiteConfig = {
  api: { key: string };
  services: AdamiteService[];
};
