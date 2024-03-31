import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sector } from "./sector.entity";
import {  ambulanceController } from "./sector.controller";
import { sectorService } from "./sector.service";




@Module({
    imports:[TypeOrmModule.forFeature([Sector])],
    controllers: [ambulanceController],
    providers: [sectorService],
    exports: [sectorService],
})

export class sectorModule{}
