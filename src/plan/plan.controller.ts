import { Controller, Get, Render } from '@nestjs/common';
import { PlanService } from './plan.service';
import Handlebars from 'handlebars';

@Controller('plan')
export class PlanController {
  constructor(private service: PlanService) {
    Handlebars.registerHelper('getTableAtPosition', (x, y) => {
      return this.service.findTableByPosition(x, y);
    });
  }

  @Get()
  @Render('plan/plan.hbs')
  async root() {
    const tables = await this.service.getTables();
    return {
      tables: tables,
      rows: [1, 2, 3, 4],
      cols: [1, 2, 3, 4],
    };
  }
}
