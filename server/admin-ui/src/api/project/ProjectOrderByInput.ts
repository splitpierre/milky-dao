import { SortOrder } from "../../util/SortOrder";

export type ProjectOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  projectDescription?: SortOrder;
  projectIcon?: SortOrder;
  projectName?: SortOrder;
  updatedAt?: SortOrder;
};
