import { IsInt, IsString } from 'class-validator';

export class MemberDto {
  @IsInt()
  member_id: number;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  cardNb: number;

  @IsString()
  shiftDay: string;

  @IsInt()
  phoneNumber: number;
}



export class CreateMemberDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  cardNb: number;

  @IsString()
  shiftDay: string;

  @IsInt()
  phoneNumber: number;
}

export class UpdateMemberDto {
  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;

  @IsInt()
  cardNb?: number;

  @IsString()
  shiftDay?: string;

  @IsInt()
  phoneNumber?: number;
}
