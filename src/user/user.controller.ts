import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpRequest } from './dto/request/signUp.request';
import { SignInRequest } from './dto/request/signIn.request';
import { TokenResponse } from './dto/response/Token.response';
import { JwtGuard } from '../middleware/jwt/jwt.guard';
import { ProfileResponse } from './dto/response/profile.response';
import { ImageService } from '../image/image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly imageService: ImageService,
  ) {}

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

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  public async addPrivateFile(
    @UploadedFile() file: Express.Multer.File,
    @Headers() headers,
  ): Promise<void> {
    await this.imageService.uploadPrivateFile(file, headers);
  }
}
