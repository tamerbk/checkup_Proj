import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity({ name: 'members' })
export class Member{
    @PrimaryGeneratedColumn()
   member_id:number;

    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
  
    @Column({ type: 'integer', nullable: false })
    cardNb: number;
  
    @Column()
    shiftDay: string;

  
    @Column({ type: 'integer', nullable: true })
    phoneNumber: number;
  
    
  
}