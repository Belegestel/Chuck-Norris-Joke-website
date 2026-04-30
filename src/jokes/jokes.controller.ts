import { Controller, Get, Query } from '@nestjs/common';
import { JokesService } from './jokes.service';

@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get('random')
  getRandom(@Query('category') category?: string) {
    return this.jokesService.getRandomJoke(category);
  }

  @Get('categories')
  getCategories() {
    return this.jokesService.getCategories();
  }
}
