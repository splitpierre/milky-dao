import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const getRoles = await this.userService.findOne(req.user.userId);
    req.user.id = req.user.userId;
    const allPermissions = [];
    for (const role of getRoles.roles) {
      const rolePermissions: any = role.permissions;
      for (const permission of rolePermissions) {
        allPermissions.push(permission);
      }
    }
    req.user.roles = [...new Set(allPermissions)];
    return true;
  }
}
