import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { SignUpDto } from 'src/auth/dto/signup.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let accessToken: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);
    await prisma.clearDb();
  });

  describe('Auth', () => {
    const dto: SignUpDto = {
      email: 'ericwei7890@gmail.com',
      name: 'Eric',
      password: '12345678',
    };

    it('/POST auth/signup', () => {
      // Expect return of a access token
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send(dto)
        .expect(201)
        .expect((res) => {
          expect(res.body.access_token).toHaveLength(231);
        });
    });

    it('/POST auth/login', (done) => {
      // Expect return of a access token

      request(app.getHttpServer())
        .post('/auth/login')
        .send(dto)
        .expect(201)
        .expect((res) => {
          expect(res.body.access_token).toHaveLength(231);
        })
        .end((err, res) => {
          accessToken = res.body.access_token;
          done();
        });
    });
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
