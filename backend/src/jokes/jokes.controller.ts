import { Controller, Get, Post, Delete, Query, UseGuards, Param, Body, Request } from '@nestjs/common';
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

  @Post('save')
  async save(@Body('value') jokeText: string, @Request() req) {
    return this.jokesService.saveJoke(jokeText, req.user.sub);
  }

  @Get('my-jokes')
  async getMyJokes(@Request() req) {
    return this.jokesService.getUserJokes(req.user.sub);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    return this.jokesService.deleteJoke(id, req.user.sub);
  }

  @Post('add')
  async addJoke(@Body('value') value: string, @Request() req) {
    return this.jokesService.saveJoke(value, req.user.sub);
  }
}
