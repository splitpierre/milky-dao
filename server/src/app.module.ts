import { Module } from '@nestjs/common';
import { AccessControlModule } from 'nest-access-control';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { CategoriesModule } from './categories/categories.module';
import { UserRolesModule } from './user-roles/user-roles.module';
import { ProposalsModule } from './proposals/proposals.module';
import { VotesModule } from './votes/votes.module';
import { AuthModule } from './auth/auth.module';
import { rolesBuilder } from './app.roles';
@Module({
  imports: [
    UsersModule,
    ProjectsModule,
    CategoriesModule,
    UserRolesModule,
    ProposalsModule,
    VotesModule,
    AuthModule,
    AccessControlModule.forRoles(rolesBuilder),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
