import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProposalUpdateInput = {
  longDescription?: string | null;
  project?: ProjectWhereUniqueInput;
  shortDescription?: string | null;
  status?: "Active" | "Pending" | "Closed" | null;
  title?: string | null;
  user?: UserWhereUniqueInput | null;
};
