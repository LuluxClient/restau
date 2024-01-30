import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { DataModule } from '../data.module';

@Module({
  imports: [DataModule],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
