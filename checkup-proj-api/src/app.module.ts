import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { memberModule } from './member/member.module';
import { ambulanceModule } from './ambulance/ambulance.module';
import { sectorModule } from './sector/sector.module';
import { soinModule } from './soin/soin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: "postgres",
      password: "patrona",
      database: "checkup", 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    memberModule,
    ambulanceModule,
    sectorModule,
    soinModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
