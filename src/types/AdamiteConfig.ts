import { AdamiteService } from "./AdamiteService";

export type AdamiteConfig = {
  api: { key: string; port: number };
  services: AdamiteService[];
};
