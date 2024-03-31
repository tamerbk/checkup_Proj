import { Member } from "src/member/member.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'soin_checkup' })

export class Soin {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member)
  member: Member;

  @Column()
  date: Date;


  @Column()
  time: string;


  @Column()
  shiftDay: string;

  @Column('text', { array: true, nullable: true })
  missingMaterials: string[];


}