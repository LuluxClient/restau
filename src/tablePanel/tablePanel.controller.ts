import { Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import { TablePanelService } from './tablePanel.service';
import Handlebars from 'handlebars';

@Controller('tables')
export class TablePanelController {
  constructor(private service: TablePanelService) {}

  @Get()
  @Render('table-panel/table-panel.hbs')
  index(@Res() res) {
    // if a table has already been loaded, redirect to the concerned table page
    if (this.service.table) {
      return res.status(302).redirect(`tables/${this.service.table.id}`);
    }
    return {};
  }

  @Get('/:id')
  @Render('table-panel/table-panel.hbs')
  async getTable(@Param() params: any) {
    const table = await this.service.getTable(params.id);
    return {
      table: table,
    };
  }

  @Post('/addProductOrder/:id')
  async addProductOrder(@Param() params: any, @Req() req) {
    await this.service.addProductOrder(params.id, req?.body?.params?.quantity);
    return 'ok';
  }

  @Get('/getProducts/:id')
  async getProducts(@Param() params: any) {
    return Handlebars.partials.panelProducts({
      products: await this.service.getProducts(params.id),
    });
  }

  @Get('/getOrder')
  getOrder() {
    return Handlebars.partials.panelOrder({
      order: this.service.table?.order,
      displayActions: true,
    });
  }

  @Post('/close')
  async close(@Res() res) {
    await this.service.closeOrder();
    return res.status(302).redirect(`${this.service.table.id}`);
  }

  @Post('/clear')
  async clear(@Res() res) {
    await this.service.clearOrder();
    return res.status(302).redirect(`${this.service.table.id}`);
  }
}
