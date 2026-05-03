import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { HttpModule } from '@nestjs/axios';
import { Joke } from './joke.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Joke]),
    ConfigModule,
    AuthModule,
  ],
  providers: [JokesService],
  controllers: [JokesController]
})
export class JokesModule {}
