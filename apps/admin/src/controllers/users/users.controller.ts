import { Controller, Get, Query, Req } from '@nestjs/common';
import { Bill, User } from '@app/entities';
import { BillsService } from '@app/modules';

@Controller('users')
export class UsersController {
  constructor(private readonly billsService: BillsService) {}

  @Get(':id/bills')
  async FindBills(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
    @Req() req,
  ): Promise<{ bills: Bill[]; pageCount: number }> {
    const user: User = req.user;
    const [bills, pageCount] = await this.billsService.findAllPrivate(
      page,
      pageSize,
      { userId: user.id },
    );

    return { bills, pageCount };
  }
}
