import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JokesService } from './jokes.service';
import { AuthGuard } from '../auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('jokes')
export class JokesController {
  constructor(private readonly jokesService: JokesService) {}

  @Get('random')
  getRandom(
    @Query('category') category?: string,
    @Query('name') name?: string
  ) {
    return this.jokesService.getRandomJoke(category, name);
  }

  @Get('categories')
  getCategories() {
    return this.jokesService.getCategories();
  }
}
