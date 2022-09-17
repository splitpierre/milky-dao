import { ProjectCreateNestedManyWithoutCategoriesInput } from "./ProjectCreateNestedManyWithoutCategoriesInput";

export type CategoryCreateInput = {
  project?: ProjectCreateNestedManyWithoutCategoriesInput;
  slug?: string | null;
  title: string;
};
