import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequest } from './dto/request/signUp.request';
import { SignInRequest } from './dto/request/signIn.request';
import { TokenResponse } from './dto/response/Token.response';

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
}
