import { CategoryUpdateManyWithoutProjectsInput } from "./CategoryUpdateManyWithoutProjectsInput";
import { ProposalUpdateManyWithoutProjectsInput } from "./ProposalUpdateManyWithoutProjectsInput";

export type ProjectUpdateInput = {
  categories?: CategoryUpdateManyWithoutProjectsInput;
  projectDescription?: string | null;
  projectIcon?: string;
  projectName?: string;
  proposals?: ProposalUpdateManyWithoutProjectsInput;
};
