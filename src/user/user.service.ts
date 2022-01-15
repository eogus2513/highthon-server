import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenResponse } from './dto/response/Token.response';
import { AuthService } from '../auth/auth.service';
import { SignUpRequest } from './dto/request/signUp.request';
import { SignInRequest } from './dto/request/signIn.request';
import { compare, hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileResponse } from './dto/response/profile.response';
import { Post } from '../post/entity/post.entity';
import { PostListResponse } from './dto/response/postList.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  public async signUp({
    id,
    name,
    school,
    password,
  }: SignUpRequest): Promise<void> {
    if (await this.userRepository.findOne({ id: id })) {
      throw new ConflictException();
    }

    const hashedPassword = await hash(password, 12);
    await this.userRepository.save({
      id: id,
      name: name,
      school: school,
      password: hashedPassword,
      count: 0,
    });
  }

  public async signIn({ id, password }: SignInRequest): Promise<TokenResponse> {
    const user: User = await this.userRepository.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }
    if (!(await compare(password, user.password))) {
      throw new BadRequestException();
    }

    return {
      access_token: await this.authService.generateAccessToken(id),
    };
  }

  public async profile(headers): Promise<ProfileResponse> {
    const token = await this.authService.bearerToken(headers.authorization);
    const user: User = await this.userRepository.findOne(token.sub);
    const post: PostListResponse[] = await this.postRepository.find();

    return {
      post_list: post,
      name: user.name,
      image: user.profileImage,
      school: user.school,
    };
  }
}
