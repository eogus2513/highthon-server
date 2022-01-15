import {
  BadRequestException,
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

@Injectable()
export class UserService {
  constructor(
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
      throw new NotFoundException();
    }

    const hashedPassword = await hash(password, 12);
    await this.userRepository.save({
      id: id,
      name: name,
      school: school,
      password: hashedPassword,
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
      refresh_token: await this.authService.generateRefreshToken(id),
    };
  }
}
