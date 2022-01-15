import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { SCHOOL } from './school';

export class SignUpRequest {
  @Length(5, 15)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Length(2, 4)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(SCHOOL)
  school: SCHOOL;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  password: string;
}
