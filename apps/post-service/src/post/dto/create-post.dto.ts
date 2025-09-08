import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    @IsNotEmpty()
    authorId: number
}