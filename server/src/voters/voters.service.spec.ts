import { Test, TestingModule } from '@nestjs/testing';
import { VotersService } from './voters.service';

describe('VotersService', () => {
  let service: VotersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotersService],
    }).compile();

    service = module.get<VotersService>(VotersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
