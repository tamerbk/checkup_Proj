import { Injectable, NotFoundException } from "@nestjs/common";
import {  Sector} from "./sector.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSectorDto, UpdateSectorDto } from "./SectorDto";

@Injectable()
export class sectorService{
    constructor(
        @InjectRepository(Sector)
        private readonly sectorRepository: Repository<Sector>,
     ){}

     async create(createSectorDto: CreateSectorDto): Promise<Sector> {
      const sector = this.sectorRepository.create(createSectorDto);
      return this.sectorRepository.save(sector);
    }
  
    async findAll(): Promise<Sector[]> {
      return this.sectorRepository.find();
    }
  
    async findOne(id: number): Promise<Sector> {
      const sector = await this.sectorRepository.findOne({ where: { id:id } });
      if (!sector) {
        throw new NotFoundException(`Sector with id ${id} not found`);
      }
      return sector;
    }
  
    async update(id: number, updateSectorDto: UpdateSectorDto): Promise<Sector> {
      const sectorToUpdate = await this.sectorRepository.findOne({ where: { id:id } });
      if (!sectorToUpdate) {
        throw new NotFoundException(`Sector with id ${id} not found`);
      }
      Object.assign(sectorToUpdate, updateSectorDto);
      return this.sectorRepository.save(sectorToUpdate);
    }
  
    async remove(id: number): Promise<void> {
      const result = await this.sectorRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Sector with id ${id} not found`);
      }
    }
}