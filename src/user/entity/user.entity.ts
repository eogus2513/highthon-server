import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { SCHOOL } from '../dto/request/school';
import { Post } from '../../post/entity/post.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false, length: 15 })
  name: string;

  @Column({ nullable: false })
  school: SCHOOL;

  @Column({ nullable: false, length: 60 })
  password: string;

  @OneToMany(() => Post, (post) => post.id, {
    nullable: false,
  })
  @JoinColumn()
  post: Post[];
}
