import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


    describe('Authentication', () => {
        let jwtToken: string

        describe('AuthModule', () => {
            // assume test data includes user test@example.com with password 'password'
            it('authenticates user with valid credentials and provides a jwt token', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({ email: 'test@mail.ru', password: '123456' })
                    .expect(201)

                // set jwt token for use in subsequent tests
                jwtToken = response.body.access_token
                expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // jwt regex
            })

            it('fails to authenticate user with an incorrect password', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({ email: 'test@mail.ru', password: 'wrong' })
                    .expect(401)

                expect(response.body.accessToken).not.toBeDefined()
            })

            // assume test data does not include a nobody@example.com user
            it('fails to authenticate user that does not exist', async () => {
                const response = await request(app.getHttpServer())
                    .post('/auth/login')
                    .send({ email: 'nobody@example.com', password: 'test' })
                    .expect(401)

                expect(response.body.accessToken).not.toBeDefined()
            })
        })

        describe('Tasks', () => {

            it('/tasks (GET)', () => {
                return request(app.getHttpServer())
                    .get('/tasks')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
                    .expect([]);
            });

            it('/tasks/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/tasks/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
                    .expect('');
            });

            it('/tasks (POST)', async () => {
                return request(app.getHttpServer())
                    .post('/tasks')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send({ title: 'Новая задача', status: 'in_progress', text: 'Выполнить задачу', deadline: '2023-12-12' })
                    .expect(201)
                    .expect(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                title: expect.any(String),
                            }),
                        );
                    })
            });

            it('/tasks (GET)', () => {
                return request(app.getHttpServer())
                    .get('/tasks')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
            });

            it('/tasks/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/tasks/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
                    .expect({
                        id: 1,
                        title: 'Новая задача'
                    });
            });

            it('/tasks/1 (DELETE)', () => {
                return request(app.getHttpServer())
                    .delete('/tasks/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200);
            });

            it('/tasks (GET)', () => {
                return request(app.getHttpServer())
                    .get('/tasks')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
                    .expect([]);
            });
        })

        describe('Users', () => {

            it('/user (GET)', () => {
                return request(app.getHttpServer())
                    .get('/user')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
            });

            it('/user (POST)', async () => {
                return request(app.getHttpServer())
                    .post('/user')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send({ firstName:"Тест", lastName:"Тестов",birthday:"1991-11-11",email:"test56@mail.ru",password: "232323" })
                    .expect(201)
                    .expect(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                firstName: expect.any(String),
                                lastName: expect.any(String),
                                email: expect.any(String),
                            }),
                        );
                    })
            });

            it('/user (GET)', () => {
                return request(app.getHttpServer())
                    .get('/user')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
            });

            it('/user/1 (PATCH)', async () => {
                return request(app.getHttpServer())
                    .patch('/user/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send({ firstName:"Тест Обновлен" })
                    .expect(201)
                    .expect(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                firstName: expect.any(String),
                                lastName: expect.any(String),
                                email: expect.any(String),
                            }),
                        );
                    })
            });

            it('/user (GET)', () => {
                return request(app.getHttpServer())
                    .get('/user')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
            });

            it('/user/1 (DELETE)', () => {
                return request(app.getHttpServer())
                    .delete('/user/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200);
            });

            it('/user (GET)', () => {
                return request(app.getHttpServer())
                    .get('/user')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .expect(200)
            });
        });

        describe('Comments', () => {
            it('/comments (GET)', () => {
                return request(app.getHttpServer()).get('/comments').expect(200).expect([]);
            });

            it('/comments/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/comments/1')
                    .expect(200)
                    .expect('');
            });

            it('/comments (POST)', async () => {
                return request(app.getHttpServer())
                    .post('/comments')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send({ text: 'Новый комментарий', task: 2 })
                    .expect(201)
                    .expect(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                text: expect.any(String)
                            }),
                        );
                    })
            });

            it('/comments (GET)', () => {
                return request(app.getHttpServer())
                    .get('/comments')
                    .expect(200)
            });

            it('/comments/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/comments/1')
                    .expect(200)
                    .expect({
                        id: 1,
                        text: 'Новый комментарий',
                    });
            });

            it('/comments/1 (PATCH)', async () => {
                return request(app.getHttpServer())
                    .patch('/comments/1')
                    .set('Authorization', `Bearer ${jwtToken}`)
                    .send({ text: 'Текст комментария обновлен' })
                    .expect(200)
                    .expect(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                text: expect.any(String)
                            }),
                        );
                    })
            });

            it('/comments (GET)', () => {
                return request(app.getHttpServer())
                    .get('/comments')
                    .expect(200)
            });

            it('/comments/1 (DELETE)', () => {
                return request(app.getHttpServer())
                    .delete('/comments/1')
                    .expect(200);
            });

            it('/comments (GET)', () => {
                return request(app.getHttpServer())
                    .get('/comments')
                    .expect(200)
                    .expect([]);
            });
        });

        describe('Files', () => {
            it('/files (GET)', () => {
                return request(app.getHttpServer()).get('/files').expect(200).expect([]);
            });

            it('/files/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/files/1')
                    .expect(200)
                    .expect('');
            });

            it('/files (POST)', () => {
                return request(app.getHttpServer())
                    .post('/files')
                    .send({ name: 'Новый файл', path: 'https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg', task: 2 })
                    .expect(201)
                    .expect(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String)
                            }),
                        );
                    })
            });

            it('/files (GET)', () => {
                return request(app.getHttpServer())
                    .get('/files')
                    .expect(200)
            });

            it('/files/1 (GET)', () => {
                return request(app.getHttpServer())
                    .get('/files/1')
                    .expect(200)
                    .expect({
                        id: 1,
                        name: 'Новый файл',
                        path: 'Ссылка на файл'
                    });
            });

            it('/files/1 (PATCH)', () => {
                return request(app.getHttpServer())
                    .patch('/files/1')
                    .send({ name: 'Файл обновлен', path: 'https://img.freepik.com/free-photo/a-cupcake-with-a-strawberry-on-top-and-a-strawberry-on-the-top_1340-35087.jpg' })
                    .expect(201)
                    .expect(res => {
                        expect(res.body).toEqual(
                            expect.objectContaining({
                                id: expect.any(Number),
                                name: expect.any(String)
                            }),
                        );
                    })
            });

            it('/files (GET)', () => {
                return request(app.getHttpServer())
                    .get('/files')
                    .expect(200)
            });

            it('/files/1 (DELETE)', () => {
                return request(app.getHttpServer())
                    .delete('/files/1')
                    .expect(200);
            });

            it('/files (GET)', () => {
                return request(app.getHttpServer())
                    .get('/files')
                    .expect(200)
                    .expect([]);
            });
        });
    });


  afterAll((done) => {
    app.close();
    done();
  });
});
