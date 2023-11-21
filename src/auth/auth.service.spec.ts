import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { ConfigModule } from '@nestjs/config';
import { randomUUID } from 'crypto';
import * as argon from 'argon2';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaClient } from '@prisma/client';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: DeepMockProxy<{
    [K in keyof PrismaClient]: Omit<PrismaClient[K], 'groupBy'>;
  }>;

  const exampleUser = {
    name: 'Lantian',
    profileImgUrl: 'https://avatars.githubusercontent.com/u/18092334?v=4',
    id: randomUUID(),
    email: 'weilantian2016@icloud.com',
    password: 'password',
  };

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({}), ConfigModule.forRoot()],
      providers: [PrismaService, AuthService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    authService = authModule.get<AuthService>(AuthService);
    prismaService = authModule.get(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(prismaService).toBeDefined();
  });

  it('Sign user in', async () => {
    expect(authService.login).toBeDefined();

    prismaService.user.findUnique.mockResolvedValue({
      ...exampleUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await argon.hash(exampleUser.password),
    });

    await expect(
      authService.login({
        email: exampleUser.email,
        password: exampleUser.password,
      }),
    ).resolves.toHaveProperty('access_token');
  });

  it("Don't sign user in if user not found", async () => {
    expect(authService.login).toBeDefined();

    prismaService.user.findUnique.mockResolvedValue(null);

    await expect(
      authService.login({
        email: exampleUser.email,
        password: exampleUser.password,
      }),
    ).rejects.toThrowError('Invalid credentials');
  });

  it('Do not sign user in if password is wrong', async () => {
    expect(authService.login).toBeDefined();

    prismaService.user.findUnique.mockResolvedValue({
      ...exampleUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await argon.hash(exampleUser.password),
    });

    await expect(
      authService.login({
        email: exampleUser.email,
        password: 'wrong password',
      }),
    ).rejects.toThrowError('Invalid credentials');
  });

  it("Don't sign user up if email already exists", async () => {
    expect(authService.signup).toBeDefined();

    prismaService.user.create.mockImplementation(() => {
      throw new PrismaClientKnownRequestError('Email already exists', {
        code: 'P2002',
        clientVersion: '2.24.1',
      });
    });

    await expect(
      authService.signup({
        name: exampleUser.name,
        email: exampleUser.email,
        password: exampleUser.password,
      }),
    ).rejects.toThrowError('Email already exists');
  });

  it('Sign user up', async () => {
    expect(authService.signup).toBeDefined();

    prismaService.user.create.mockResolvedValue({
      ...exampleUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      password: await argon.hash(exampleUser.password),
    });

    await expect(
      authService.signup({
        name: exampleUser.name,
        email: exampleUser.email,
        password: exampleUser.password,
      }),
    ).resolves.toHaveProperty('access_token');
  });
});
