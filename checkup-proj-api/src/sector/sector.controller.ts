import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { sectorService } from "./sector.service";
import { Sector } from "./sector.entity";
import { CreateSectorDto, UpdateSectorDto } from "./SectorDto";


@Controller('sector')
export class ambulanceController{
    constructor(private readonly sectorService: sectorService)
    {}

    @Post()
    async create(@Body() createSectorDto: CreateSectorDto): Promise<Sector> {
      return this.sectorService.create(createSectorDto);
    }
  
    @Get()
    async findAll(): Promise<Sector[]> {
      return this.sectorService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Sector> {
      return this.sectorService.findOne(+id);
    }
  
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateSectorDto: UpdateSectorDto): Promise<Sector> {
      return this.sectorService.update(+id, updateSectorDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return this.sectorService.remove(+id);
    }
}