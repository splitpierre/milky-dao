import { ProjectUpdateManyWithoutCategoriesInput } from "./ProjectUpdateManyWithoutCategoriesInput";

export type CategoryUpdateInput = {
  project?: ProjectUpdateManyWithoutCategoriesInput;
  slug?: string | null;
  title?: string;
};
