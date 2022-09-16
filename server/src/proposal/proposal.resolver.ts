import * as common from "@nestjs/common";
import * as graphql from "@nestjs/graphql";
import * as nestAccessControl from "nest-access-control";
import { GqlDefaultAuthGuard } from "../auth/gqlDefaultAuth.guard";
import * as gqlACGuard from "../auth/gqlAC.guard";
import { ProposalResolverBase } from "./base/proposal.resolver.base";
import { Proposal } from "./base/Proposal";
import { ProposalService } from "./proposal.service";

@graphql.Resolver(() => Proposal)
@common.UseGuards(GqlDefaultAuthGuard, gqlACGuard.GqlACGuard)
export class ProposalResolver extends ProposalResolverBase {
  constructor(
    protected readonly service: ProposalService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
