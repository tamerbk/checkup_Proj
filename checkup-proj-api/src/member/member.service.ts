import { Injectable, NotFoundException } from "@nestjs/common";
import { Member } from "./member.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateMemberDto, UpdateMemberDto } from "./MemberDto";

@Injectable()
export class memberService{
    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
     ){}

     async findOneByCardId(id: number): Promise<Member> {
      return this.memberRepository.findOne({ where: { cardNb:id } });
    }
     async create(createMemberDto: CreateMemberDto): Promise<Member> {
      const member = this.memberRepository.create(createMemberDto);
      return this.memberRepository.save(member);
    }
  
    async findAll(): Promise<Member[]> {
      return this.memberRepository.find();
    }
  
    async findOne(id: number): Promise<Member> {
      return this.memberRepository.findOne({ where: { member_id:id } });
    }
  
    async update(id: number, updateMemberDto: UpdateMemberDto): Promise<Member> {
      
      const memberToUpdate = await this.memberRepository.findOne({ where: { member_id:id } });
  
      if (!memberToUpdate) {
        throw new NotFoundException(`Member with id ${id} not found`);
      }
      Object.assign(memberToUpdate, updateMemberDto);
      return this.memberRepository.save(memberToUpdate);
    }
  
    async remove(id: number): Promise<void> {
      await this.memberRepository.delete(id);
    }
}