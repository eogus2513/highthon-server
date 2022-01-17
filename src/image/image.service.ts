import { Injectable, NotFoundException } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import 'dotenv/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  public async uploadImage(file: Express.Multer.File, headers): Promise<void> {
    if (!file) {
      throw new NotFoundException();
    }
    const user = await this.authService.bearerToken(headers.authorization);
    const uploadResult = await new S3()
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Body: file.buffer,
        Key: `${Date.now().toString()} - ${file.originalname}`,
      })
      .promise();

    await this.userRepository.update(
      { id: user.sub },
      { profileImage: uploadResult.Location },
    );
  }
}
