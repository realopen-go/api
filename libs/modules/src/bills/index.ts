import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '@app/entities';
import { BillsService } from './bills.service';

export { BillsService };

@Module({
  imports: [TypeOrmModule.forFeature([Bill])],
  providers: [BillsService],
  exports: [BillsService],
})
export class BillsModule {}
