import { IsNotEmpty, IsString } from 'class-validator';

export class SignInRequest {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
