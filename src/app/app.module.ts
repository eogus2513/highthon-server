import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeormConfigModule } from '../typeorm/typeorm-config.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ImageModule } from '../image/image.module';

@Module({
  imports: [TypeormConfigModule, AuthModule, UserModule, ImageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
