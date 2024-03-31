import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ambulance } from "./ambulance.entity";
import {  ambulanceController } from "./ambulance.controller";
import { ambulanceService } from "./ambulance.service";



@Module({
    imports:[TypeOrmModule.forFeature([Ambulance])],
    controllers: [ambulanceController],
    providers: [ambulanceService],
    exports: [ambulanceService],
})

export class ambulanceModule{}
