import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProposalDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public projectId: string;

  @IsString()
  @IsNotEmpty()
  public userId: any;

  @IsOptional()
  @IsString()
  public description: any;

  @IsOptional()
  @IsString()
  public status: any;

  @IsOptional()
  @IsString()
  public startAt: any;

  @IsOptional()
  @IsString()
  public endAt: any;

  @IsOptional()
  @IsString()
  public createdAt: any;

  @IsOptional()
  @IsString()
  public id: any;
}
