import { Project } from "../project/Project";

export type Category = {
  createdAt: Date;
  id: string;
  project?: Array<Project>;
  slug: string | null;
  title: string;
  updatedAt: Date;
};
