import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Joke } from '../jokes/joke.entity';
import { AxiosError } from 'axios';

@Injectable()
export class JokesService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Joke)
    private jokesRepository: Repository<Joke>
  ) {}

  async getRandomJoke(category?: string, name?: string): Promise<any> {
    let url = 'https://api.chucknorris.io/jokes/random';

    if(category) {
      url += `?category=${category}`;
    }
    
    const { data } = await lastValueFrom(this.httpService.get(url));

    if(name) {
      data.value = data.value.replace(/Chuck Norris/gi, name);
      data.value = data.value.replace(/Chuck/gi, name);
    }

    return data;
  }

  async getCategories(): Promise<string[]> {
    const request = this.httpService
      .get<string[]>('https://api.chucknorris.io/jokes/categories')
      .pipe(
        map(axiosResponse => axiosResponse.data)
      );
    const categories = await lastValueFrom(request);
    return categories;
  }

  async saveJoke(jokeText: string, userId: number): Promise<Joke>{
    const newJoke = this.jokesRepository.create({
      value: jokeText,
      user: {id: userId} as any,
    });
    return this.jokesRepository.save(newJoke);
  }

  async getUserJokes(userId: number): Promise<Joke[]> {
    return this.jokesRepository.find({
      where: { user: { id: userId } },
    });
  }

  async deleteJoke(id: number, userId: number): Promise<void> {
    await this.jokesRepository.delete({ id, user: { id: userId} });
  }
}
