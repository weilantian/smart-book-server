import { TestingModule, Test } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: DeepMockProxy<AuthService>;

  const exampleUser = {
    name: 'Lantian',
    profileImgUrl: 'https://avatars.githubusercontent.com/u/18092334?v=4',
    id: randomUUID(),
    email: '',
  };

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    })
      .overrideProvider(AuthService)
      .useValue(mockDeep<AuthService>())
      .compile();

    authController = authModule.get<AuthController>(AuthController);
    authService = authModule.get(AuthService);
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(authController.login).toBeDefined();
    });

    it('should return access token', async () => {
      authService.login.mockResolvedValue({
        access_token: 'access_token',
      });

      await expect(
        authController.login({
          email: exampleUser.email,
          password: 'password',
        }),
      ).resolves.toHaveProperty('access_token');
    });
  });

  describe('signup', () => {
    it('should be defined', () => {
      expect(authController.signup).toBeDefined();
    });

    it('should return access token', async () => {
      authService.signup.mockResolvedValue({
        access_token: 'access_token',
      });

      await expect(
        authController.signup({
          email: exampleUser.email,
          password: 'password',
          name: exampleUser.name,
        }),
      ).resolves.toHaveProperty('access_token');
    });
  });
});
