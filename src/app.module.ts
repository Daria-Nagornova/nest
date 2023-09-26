import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Task } from './tasks/entities/task.entity';
import { Comment } from './comments/entities/comment.entity';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nest',
        entities: [User,Task,Comment],
        synchronize: true,
      }), UserModule, TasksModule, CommentsModule],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
