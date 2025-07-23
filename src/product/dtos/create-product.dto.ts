import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 20, {
    message: 'Name must be at least 3 characters long and max 20',
  })
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsString()
  readonly description: string;
}
