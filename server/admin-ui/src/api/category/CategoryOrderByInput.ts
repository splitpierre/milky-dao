import { SortOrder } from "../../util/SortOrder";

export type CategoryOrderByInput = {
  createdAt?: SortOrder;
  id?: SortOrder;
  slug?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
};
