import { Project } from "../project/Project";
import { User } from "../user/User";

export type Proposal = {
  createdAt: Date;
  id: string;
  longDescription: string | null;
  project?: Project;
  shortDescription: string | null;
  status?: "Active" | "Pending" | "Closed" | null;
  title: string | null;
  updatedAt: Date;
  user?: User | null;
};
