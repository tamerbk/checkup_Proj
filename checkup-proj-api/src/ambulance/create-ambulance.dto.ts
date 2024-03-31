

import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAmbulanceDto {
  @IsInt()
  memberId: number;

  @IsDate()
  date: Date;

  @IsString()
  @IsNotEmpty()
  time: string;

  @IsInt()
  carNb: number;

  @IsString()
  @IsNotEmpty()
  shiftDay: string;

  @IsOptional()
  @IsString({ each: true })
  missingMaterials?: string[];

  @IsOptional()
  @IsInt()
  oxygenMainPercent?: number;

  @IsOptional()
  @IsInt()
  oxygenTankPercent?: number;
}