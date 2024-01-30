import { Get, Controller, Res } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  redirect(@Res() res) {
    return res.status(302).redirect('plan');
  }
}
