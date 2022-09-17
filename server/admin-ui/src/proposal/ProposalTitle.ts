import { Proposal as TProposal } from "../api/proposal/Proposal";

export const PROPOSAL_TITLE_FIELD = "title";

export const ProposalTitle = (record: TProposal): string => {
  return record.title || record.id;
};
