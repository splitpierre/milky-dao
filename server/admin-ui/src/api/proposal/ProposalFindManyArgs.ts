import { ProposalWhereInput } from "./ProposalWhereInput";
import { ProposalOrderByInput } from "./ProposalOrderByInput";

export type ProposalFindManyArgs = {
  where?: ProposalWhereInput;
  orderBy?: Array<ProposalOrderByInput>;
  skip?: number;
  take?: number;
};
