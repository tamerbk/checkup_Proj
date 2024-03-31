import { Member } from "src/member/member.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'ambulance_checkup' })

export class Ambulance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Member)
  member: Member;

  @Column()
  date: Date;


  @Column()
  time: string;

  @Column({ type: 'integer' })
  carNb: number;

  @Column()
  shiftDay: string;

  @Column('text', { array: true, nullable: true })
  missingMaterials: string[];

  @Column({ type: 'integer', nullable: true })
  oxygenMainPercent: number;

  @Column({ type: 'integer', nullable: true })
  oxygenTankPercent: number;
}