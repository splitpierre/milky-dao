import { Module } from "@nestjs/common";
import { ProposalModuleBase } from "./base/proposal.module.base";
import { ProposalService } from "./proposal.service";
import { ProposalController } from "./proposal.controller";
import { ProposalResolver } from "./proposal.resolver";

@Module({
  imports: [ProposalModuleBase],
  controllers: [ProposalController],
  providers: [ProposalService, ProposalResolver],
  exports: [ProposalService],
})
export class ProposalModule {}
