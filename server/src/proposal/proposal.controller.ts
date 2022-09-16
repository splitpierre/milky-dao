import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import { ProposalService } from "./proposal.service";
import { ProposalControllerBase } from "./base/proposal.controller.base";

@swagger.ApiTags("proposals")
@common.Controller("proposals")
export class ProposalController extends ProposalControllerBase {
  constructor(
    protected readonly service: ProposalService,
    @nestAccessControl.InjectRolesBuilder()
    protected readonly rolesBuilder: nestAccessControl.RolesBuilder
  ) {
    super(service, rolesBuilder);
  }
}
