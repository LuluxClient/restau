import { Controller, Get, Param, Render } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private service: InvoicesService) {}

  @Get() 
  @Render('invoices/invoices.hbs') 
  async root() {
    return { orders: await this.service.getOrders() };
  }

  @Get('/:id')
  @Render('invoices/invoice.hbs')
  async getInvoice(@Param() params: any) {
    return {
      order: await this.service.getOrder(params.id),
    };
  }
}
