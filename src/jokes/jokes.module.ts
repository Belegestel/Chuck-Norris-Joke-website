import { Module } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { JokesController } from './jokes.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [JokesService],
  controllers: [JokesController]
})
export class JokesModule {}
