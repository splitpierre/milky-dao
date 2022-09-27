import { Test, TestingModule } from '@nestjs/testing';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';

describe('ProposalsController', () => {
  let controller: ProposalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProposalsController],
      providers: [ProposalsService],
    }).compile();

    controller = module.get<ProposalsController>(ProposalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
