import { RolesBuilder } from 'nest-access-control';

export enum AppRoles {
  USER_CREATE_ANY_CATEGORY = 'USER_CREATE_ANY_CATEGORY',
  ADMIN_MANAGE_ANY_ANYTHING = 'ADMIN_MANAGE_ANY_ANYTHING',
  PROJECT_MANAGER_MANAGE_ANY_PROJECT = 'PROJECT_MANAGER_MANAGE_ANY_PROJECT',
  USER_MANAGE_OWN_PROPOSAL = 'USER_MANAGE_OWN_PROPOSAL',
  USER_MANAGE_OWN_VOTE = 'USER_MANAGE_OWN_VOTE',
}

export const rolesBuilder: RolesBuilder = new RolesBuilder();

rolesBuilder
  .grant([AppRoles.USER_MANAGE_OWN_PROPOSAL, AppRoles.USER_MANAGE_OWN_VOTE]) // define new or modify existing role. also takes an array.
  .createOwn(['proposals', 'votes']) // equivalent to .createOwn('categories', ['*'])
  .deleteOwn(['proposals', 'votes'])
  .updateOwn(['proposals', 'votes']) //.updateOwn('proposals', ['title', 'description']) // explicitly defined attributes
  .readAny(['proposals', 'votes'])
  .grant(AppRoles.PROJECT_MANAGER_MANAGE_ANY_PROJECT)
  .updateOwn('projects')
  .readAny('projects')
  .grant(AppRoles.ADMIN_MANAGE_ANY_ANYTHING)
  .createAny([
    'proposals',
    'categories',
    'projects',
    'votes',
    'users',
    'user-roles',
  ])
  .updateAny([
    'proposals',
    'categories',
    'projects',
    'votes',
    'users',
    'user-roles',
  ])
  .deleteAny([
    'proposals',
    'categories',
    'projects',
    'votes',
    'users',
    'user-roles',
  ])
  .readAny([
    'proposals',
    'categories',
    'projects',
    'votes',
    'users',
    'user-roles',
  ]);
