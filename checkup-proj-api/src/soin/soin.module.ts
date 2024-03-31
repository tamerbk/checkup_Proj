import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Soin } from "./soin.entity";
import {  soinController } from "./soin.controller";
import { soinService } from "./soin.service";



@Module({
    imports:[TypeOrmModule.forFeature([Soin])],
    controllers: [soinController],
    providers: [soinService],
    exports: [soinService],
})

export class soinModule{}
