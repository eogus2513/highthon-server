import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions['SDK'])],
})
export class TypeormConfigModule {}
