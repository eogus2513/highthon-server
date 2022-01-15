import { IsDate, IsNumber, IsString } from 'class-validator';

export class PostListResponse {
  @IsNumber()
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  image: string;

  @IsString()
  category: string;

  @IsDate()
  create_at: Date;
}
