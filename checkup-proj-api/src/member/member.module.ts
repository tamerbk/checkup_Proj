import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Member } from "./member.entity";
import { memberController } from "./member.controller";
import { memberService } from "./member.service";



@Module({
    imports:[TypeOrmModule.forFeature([Member])],
    controllers: [memberController],
    providers: [memberService],
    exports: [memberService],
})

export class memberModule{}
