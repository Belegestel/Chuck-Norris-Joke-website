import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Joke } from '../jokes/joke.entity';

@Entity() 
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string; 

  @OneToMany(() => Joke, (joke) => joke.user)
  jokes: Joke[];
}
