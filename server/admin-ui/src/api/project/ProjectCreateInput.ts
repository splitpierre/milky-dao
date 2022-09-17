import { CategoryCreateNestedManyWithoutProjectsInput } from "./CategoryCreateNestedManyWithoutProjectsInput";
import { ProposalCreateNestedManyWithoutProjectsInput } from "./ProposalCreateNestedManyWithoutProjectsInput";

export type ProjectCreateInput = {
  categories?: CategoryCreateNestedManyWithoutProjectsInput;
  projectDescription?: string | null;
  projectIcon: string;
  projectName: string;
  proposals?: ProposalCreateNestedManyWithoutProjectsInput;
};
