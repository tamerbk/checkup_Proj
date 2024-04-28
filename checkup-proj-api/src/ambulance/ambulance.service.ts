import { Injectable } from "@nestjs/common";
import { Ambulance} from "./ambulance.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AmbulanceDto } from "./ambulance.dto";
import { CreateAmbulanceDto } from "./create-ambulance.dto";

@Injectable()
export class ambulanceService{
    constructor(
        @InjectRepository(Ambulance)
        private readonly ambulanceRepository: Repository<Ambulance>,
     ){}

     async createAmbulanceCheckup(data: Partial<Ambulance>): Promise<Ambulance> {
      const currentDate = new Date();
      
      // Format the time as HH:mm:ss (e.g., 14:30:00)
      const currentTime = currentDate.toTimeString().slice(0, 8);
    
      const ambulanceCheckup = this.ambulanceRepository.create({
        ...data,
        date: currentDate, // Set the date to the current date
        time: currentTime, // Set the time to the current time as a string
      });
      
      return await this.ambulanceRepository.save(ambulanceCheckup);
    }
    
  
    async findAll(): Promise<AmbulanceDto[]> {
      const ambulances = await this.ambulanceRepository.find();
      return ambulances.map(this.entityToDto);
    }
  
    async findOne(id: number): Promise<AmbulanceDto> {
      const ambulance = await this.ambulanceRepository.findOne({ where: { id:id } });
      return this.entityToDto(ambulance);
    }

    async update(id: number, createAmbulanceDto: CreateAmbulanceDto): Promise<AmbulanceDto> {
      await this.ambulanceRepository.update(id, createAmbulanceDto);
      const updatedAmbulance = await this.ambulanceRepository.findOne({ where: { id:id } });
      return this.entityToDto(updatedAmbulance);
    }
  
    async remove(id: number): Promise<void> {
      await this.ambulanceRepository.delete(id);
    }
  
    private entityToDto(ambulance: Ambulance | undefined): AmbulanceDto | undefined {
      if (!ambulance) {
        return undefined;
      }
    
      
      return {
        id: ambulance.id,
        member: ambulance.member, 
        date: ambulance.date,
        time: ambulance.time,
        carNb: ambulance.carNb,
        shiftDay: ambulance.shiftDay,
        missingMaterials: ambulance.missingMaterials,
        oxygenMainPercent: ambulance.oxygenMainPercent,
        oxygenTankPercent: ambulance.oxygenTankPercent,
      };
    }
    
}