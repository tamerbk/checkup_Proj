import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ambulanceService } from "./ambulance.service";
import { CreateAmbulanceDto } from "./create-ambulance.dto";
import { AmbulanceDto } from "./ambulance.dto";


@Controller('ambulance')
export class ambulanceController{
    constructor(private readonly ambulanceService: ambulanceService)
    {}

    @Post()
  async create(@Body() createAmbulanceDto: CreateAmbulanceDto): Promise<AmbulanceDto> {
    return this.ambulanceService.createAmbulanceCheckup(createAmbulanceDto);
  }

  @Get()
  async findAll(): Promise<AmbulanceDto[]> {
    return this.ambulanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AmbulanceDto> {
    return this.ambulanceService.findOne(parseInt(id, 10));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() createAmbulanceDto: CreateAmbulanceDto): Promise<AmbulanceDto> {
    return this.ambulanceService.update(parseInt(id, 10), createAmbulanceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.ambulanceService.remove(parseInt(id, 10));
  }
}