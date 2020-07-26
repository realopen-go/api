import { Controller, Get, Query, SetMetadata, Request } from '@nestjs/common';
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
    @Query('text') text = '',
  ): Promise<{ bills: { [key: string]: Bill[] }; pageCount: number }> {
    const [bills, pageCount] = await this.billsService.findAllPublic(
      page,
      pageSize,
      { memberName, text },
    );

    return { bills, pageCount };
  }

  @Get('my')
  async FindAllPrivate(
    @Request() req,
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<{ bills: Bill[]; pageCount: number }> {
    const userId = req.user.id;
    const [bills, pageCount] = await this.billsService.findAllPrivate(
      page,
      pageSize,
      { userId },
    );

    return { bills, pageCount };
  }
}
