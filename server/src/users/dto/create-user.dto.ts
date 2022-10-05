import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public nonce: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsOptional()
  public name?: string;

  @IsOptional()
  public signature?: any;
}
