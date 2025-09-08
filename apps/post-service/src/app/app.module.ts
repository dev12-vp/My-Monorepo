import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Post } from '../post/entity/post.entity';
import { PostModule } from '../post/post.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12321232',
    database: 'postgres',
    entities: [Post],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Post])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
