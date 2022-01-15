import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
