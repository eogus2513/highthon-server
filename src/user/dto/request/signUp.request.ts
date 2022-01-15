import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SCHOOL } from './school';

export class SignUpRequest {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(SCHOOL)
  school: SCHOOL;

  @IsString()
  @IsNotEmpty()
  password: string;
}
