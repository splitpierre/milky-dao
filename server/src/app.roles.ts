import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER_CREATE_ANY_CATEGORY = 'USER_CREATE_ANY_CATEGORY',
  ADMIN_MANAGE_ANY_ANYTHING = 'ADMIN_MANAGE_ANY_ANYTHING',
  PROJECT_MANAGER_MANAGE_ANY_PROJECT = 'PROJECT_MANAGER_MANAGE_ANY_PROJECT',
  USER_MANAGE_OWN_PROPOSAL = 'USER_MANAGE_OWN_PROPOSAL',
}

export const rolesBuilder: RolesBuilder = new RolesBuilder();

rolesBuilder
  .grant(AppRoles.USER_MANAGE_OWN_PROPOSAL) // define new or modify existing role. also takes an array.
  .createOwn('proposals') // equivalent to .createOwn('categories', ['*'])
  .deleteOwn('proposals')
  .updateOwn('proposals') //.updateOwn('proposals', ['title', 'description']) // explicitly defined attributes
  .readAny('proposals')
  .grant(AppRoles.PROJECT_MANAGER_MANAGE_ANY_PROJECT)
  .updateOwn('projects')
  .readAny('projects')
  .grant(AppRoles.ADMIN_MANAGE_ANY_ANYTHING)
  .createAny(['proposals', 'categories', 'projects', 'votes', 'users'])
  .updateAny(['proposals', 'categories', 'projects', 'votes', 'users'])
  .deleteAny(['proposals', 'categories', 'projects', 'votes', 'users'])
  .readAny(['proposals', 'categories', 'projects', 'votes', 'users']);
