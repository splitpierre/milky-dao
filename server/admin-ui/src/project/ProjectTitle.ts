import { Project as TProject } from "../api/project/Project";

export const PROJECT_TITLE_FIELD = "projectName";

export const ProjectTitle = (record: TProject): string => {
  return record.projectName || record.id;
};
