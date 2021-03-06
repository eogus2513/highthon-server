import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../middleware/jwt/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Post } from '../post/entity/post.entity';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post]), AuthModule, ImageModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
