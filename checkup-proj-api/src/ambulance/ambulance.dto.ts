
import { IsDate, IsInt, IsString, MaxLength } from 'class-validator';
import { MemberDto } from 'src/member/MemberDto';

export class AmbulanceDto {
  @IsInt()
  id: number;

  @IsDate()
  date: Date;

  @IsString()
  @MaxLength(255)
  time: string;

  @IsInt()
  carNb: number;

  @IsString()
  @MaxLength(255)
  shiftDay: string;

  @IsString({ each: true })
  missingMaterials: string[];

  @IsInt()
  oxygenMainPercent: number;

  @IsInt()
  oxygenTankPercent: number;

  member: MemberDto; // Change memberId to MemberDto object
}
