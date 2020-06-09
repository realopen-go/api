import { Controller, Get, Query, SetMetadata } from '@nestjs/common';
import { Bill } from '@app/entities';
import { BillsService } from '@app/modules';

@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @SetMetadata('isPublic', true)
  @Get()
  async FindAllPublic(
    @Query('memberName') memberName = '',
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<{ bills: Bill[]; pageCount: number }> {
    const [bills, pageCount] = await this.billsService.findAllPublic(
      page,
      pageSize,
      { memberName },
    );

    return { bills, pageCount };
  }
}
