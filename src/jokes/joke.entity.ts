import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Joke {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jokeId: string;

  @Column()
  value: string;

  @Column({nullable: true})
  category: string;

  @ManyToOne(() => User, (user) => user.jokes)
  user: User;
}
