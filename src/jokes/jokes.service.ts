import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class JokesService {
  constructor(private readonly httpService: HttpService) {}

  async getRandomJoke(category?: string): Promise<any> {
    let url = 'https://api.chucknorris.io/jokes/random';

    if(category) {
      url += '?category=${category}';
    }
    
    const { data } = await firstValueFrom(this.httpService.get(url));
    return data;
  }

  async getCategories(): Promise<string[]> {
    const { data } = await firstValueFrom(this.httpService.get(
      'https://api.chucknorris.io/jokes/categories'
    ));
    return data;
  }
}
