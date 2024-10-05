import { Test, TestingModule } from '@nestjs/testing';
import { PostRepositoryService } from './post.repository.service';
import {
  NotFoundError,
  InternalError,
  NetworkError,
  TimeoutError,
} from '../error';

describe('UserService', () => {
  let service: PostRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostRepositoryService],
    }).compile();

    service = module.get<PostRepositoryService>(PostRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should realFindOne', async () => {
    const result = await service.realFindOne(1);
    expect(result).toBeDefined();
  });

  it('should realFindOne throw network error', async () => {
    const result = await service.realFindOne(2).catch((e) => {
      expect(e).toBe(NetworkError);
      return 'NetworkError';
    });

    expect(result).toBe('NetworkError');
  });

  it('should realFindOne throw network error', async () => {
    const result = await service.realFindOne(3).catch((e) => {
      expect(e).toBe(TimeoutError);
      return 'TimeoutError';
    });

    expect(result).toBe('TimeoutError');
  });

  it('should realFindOne throw network error', async () => {
    const result = await service.realFindOne(4).catch((e) => {
      expect(e).toBe(NotFoundError);
      return 'NotFoundError';
    });

    expect(result).toBe('NotFoundError');
  });

  it('should realFindOne throw network error', async () => {
    const result = await service.realFindOne(5).catch((e) => {
      expect(e).toBe(InternalError);
      return 'InternalError';
    });

    expect(result).toBe('InternalError');
  });

  it('should realFindOne throw network error', async () => {
    const result = await service.realFindOne(6);

    expect(result).toBe(null);
  });
});
