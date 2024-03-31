import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { soinService } from "./soin.service";
import { Soin } from "./soin.entity";
import { CreateSoinDto, UpdateSoinDto } from "./SoinDto";


@Controller('soin')
export class soinController{
    constructor(private readonly soinService: soinService)
    {}

    
  @Post()
  async create(@Body() createSoinDto: CreateSoinDto): Promise<Soin> {
    return this.soinService.create(createSoinDto);
  }

  @Get()
  async findAll(): Promise<Soin[]> {
    return this.soinService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Soin> {
    return this.soinService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSoinDto: UpdateSoinDto): Promise<Soin> {
    return this.soinService.update(+id, updateSoinDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.soinService.remove(+id);
  }
}