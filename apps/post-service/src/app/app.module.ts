import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Post } from '../post/entity/post.entity';
import { PostModule } from '../post/post.module';
import * as dotenv from "dotenv";
dotenv.config();

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    PostModule,
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST ,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USERNAME ,
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME ,
    entities: [Post],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([Post])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
