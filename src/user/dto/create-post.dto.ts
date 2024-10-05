// Please not modify this file 😭

import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsInt()
  authorId: number;
}
