import { Member } from "src/member/member.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'sector_checkup' })

export class Sector {
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