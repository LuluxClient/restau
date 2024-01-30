import { Injectable } from '@nestjs/common';
import { DataService } from '../data.service';
import { Table } from 'src/entities/table.entity';

@Injectable()
export class PlanService {
  private tables = [];
  constructor(private service: DataService) {
    this.getTables().then((data) => {
      this.tables = data;
    });
  }

  async getTables(): Promise<Table[]> {
    this.tables = await this.service.findAllTables();
    return this.tables;
  }

  findTableByPosition(x: number, y: number): Promise<Table | null> {
    return this.tables.find((e) => e.posX == x && e.posY == y);
  }
}
