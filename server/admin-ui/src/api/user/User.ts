import { Proposal } from "../proposal/Proposal";

export type User = {
  address: string;
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  proposals?: Array<Proposal>;
  roles: Array<string>;
  updatedAt: Date;
  username: string;
};
