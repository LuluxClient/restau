import { Module } from '@nestjs/common';
import { TablePanelController } from './tablePanel.controller';
import { TablePanelService } from './tablePanel.service';
import { DataModule } from '../data.module';

@Module({
  controllers: [TablePanelController],
  providers: [TablePanelService],
  imports: [DataModule],
})
export class TablePanelModule {}
