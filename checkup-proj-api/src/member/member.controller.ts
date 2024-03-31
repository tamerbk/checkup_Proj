import { Controller, Get } from "@nestjs/common";
import { memberService } from "./member.service";
import { Member } from "./member.entity";


@Controller('members')
export class memberController{
    constructor(private readonly memberService: memberService)
    {}

    @Get('/getAllUsers')
    async findAll(): Promise<Member[]>{
        return this.memberService.findAll();
    }
}