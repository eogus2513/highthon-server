import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn } from 'typeorm';
import { SCHOOL } from '../dto/request/school';
import { Post } from '../../post/entity/post.entity';

@Entity()
export class User {
  @PrimaryColumn({ length: 16 })
  id: string;

  @Column({ nullable: false, length: 4 })
  name: string;

  @Column({ nullable: false, length: 16 })
  school: SCHOOL;

  @Column({ nullable: false, length: 60 })
  password: string;

  @Column({ name: 'profile_image', nullable: true })
  profileImage: string;

  @OneToMany(() => Post, (post) => post.id, {
    nullable: false,
  })
  @JoinColumn()
  post: Post[];
}
