import { Category as TCategory } from "../api/category/Category";

export const CATEGORY_TITLE_FIELD = "title";

export const CategoryTitle = (record: TCategory): string => {
  return record.title || record.id;
};
