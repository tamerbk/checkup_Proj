import { Injectable, NotFoundException } from "@nestjs/common";
import { Soin} from "./soin.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSoinDto, UpdateSoinDto } from "./SoinDto";

@Injectable()
export class soinService{
    constructor(
        @InjectRepository(Soin)
        private readonly soinRepository: Repository<Soin>,
     ){}

     async create(createSoinDto: CreateSoinDto): Promise<Soin> {
      const soin = this.soinRepository.create(createSoinDto);
      return this.soinRepository.save(soin);
    }
  
    async findAll(): Promise<Soin[]> {
      return this.soinRepository.find();
    }
  
    async findOne(id: number): Promise<Soin> {
      const soin = await this.soinRepository.findOne({ where: { id:id } });
      if (!soin) {
        throw new NotFoundException(`Soin with id ${id} not found`);
      }
      return soin;
    }
  
    async update(id: number, updateSoinDto: UpdateSoinDto): Promise<Soin> {
      const soinToUpdate = await this.soinRepository.findOne({ where: { id:id } });
      if (!soinToUpdate) {
        throw new NotFoundException(`Soin with id ${id} not found`);
      }
      Object.assign(soinToUpdate, updateSoinDto);
      return this.soinRepository.save(soinToUpdate);
    }
  
    async remove(id: number): Promise<void> {
      const result = await this.soinRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Soin with id ${id} not found`);
      }
    }
}