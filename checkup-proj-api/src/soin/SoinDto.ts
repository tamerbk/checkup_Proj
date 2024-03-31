import { IsArray, IsDate, IsString, MaxLength } from 'class-validator';

export class CreateSoinDto {
  @IsDate()
  date: Date;

  @IsString()
  @MaxLength(255)
  time: string;

  @IsString()
  @MaxLength(255)
  shiftDay: string;

  @IsArray()
  missingMaterials: string[];
}

export class UpdateSoinDto {
  @IsDate()
  date?: Date;

  @IsString()
  @MaxLength(255)
  time?: string;

  @IsString()
  @MaxLength(255)
  shiftDay?: string;

  @IsArray()
  missingMaterials?: string[];
}
