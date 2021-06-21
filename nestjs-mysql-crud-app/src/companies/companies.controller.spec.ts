import { Test, TestingModule } from '@nestjs/testing';
import { CompanieController } from './companies.controller';

describe('CompanieController', () => {
  let controller: CompanieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanieController],
    }).compile();

    controller = module.get<CompanieController>(CompanieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
