import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { ProjectWhereUniqueInput } from "../project/ProjectWhereUniqueInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProposalWhereInput = {
  id?: StringFilter;
  longDescription?: StringNullableFilter;
  project?: ProjectWhereUniqueInput;
  shortDescription?: StringNullableFilter;
  status?: "Active" | "Pending" | "Closed";
  title?: StringNullableFilter;
  user?: UserWhereUniqueInput;
};
