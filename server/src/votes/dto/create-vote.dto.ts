import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateVoteDto {
  @IsString()
  @IsOptional()
  public id?: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsOptional()
  public proposalId?: any;

  @IsOptional()
  public userId?: any;

  @IsOptional()
  public choice?: any;
}
