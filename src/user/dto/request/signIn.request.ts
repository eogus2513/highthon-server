import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInRequest {
  @Length(5, 15)
  @IsString()
  @IsNotEmpty()
  id: string;

  @Length(8, 30)
  @IsString()
  @IsNotEmpty()
  password: string;
}
