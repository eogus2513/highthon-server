import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequest } from './dto/request/signUp.request';
import { SignInRequest } from './dto/request/signIn.request';
import { TokenResponse } from './dto/response/Token.response';
import { JwtGuard } from '../middleware/jwt/jwt.guard';
import { ProfileResponse } from './dto/response/profile.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  public async signup(@Body() body: SignUpRequest): Promise<void> {
    await this.userService.signUp(body);
  }

  @HttpCode(200)
  @Post('signin')
  public async login(@Body() body: SignInRequest): Promise<TokenResponse> {
    return await this.userService.signIn(body);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  public async profile(@Headers() headers): Promise<ProfileResponse> {
    return await this.userService.profile(headers);
  }
}
