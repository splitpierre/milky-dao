import { Category } from "../category/Category";
import { Proposal } from "../proposal/Proposal";

export type Project = {
  categories?: Array<Category>;
  createdAt: Date;
  id: string;
  projectDescription: string | null;
  projectIcon: string;
  projectName: string;
  proposals?: Array<Proposal>;
  updatedAt: Date;
};
