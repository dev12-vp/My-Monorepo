import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@my-workspace/common';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from "dotenv";
dotenv.config();


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
      username: process.env.DB_USERNAME ,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_NAME ,
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
