
import { IsArray, IsDate, IsString, MaxLength } from 'class-validator';

export class CreateSectorDto {
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

export class UpdateSectorDto {
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
