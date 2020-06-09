import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Bill } from '@app/entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
  ) {}

  async findAllPublic(
    page = 1,
    pageSize = 10,
    query: {
      memberName?: string;
    } = {},
  ): Promise<[Bill[], number]> {
    const queryBuilder = this.billRepository
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.user', 'user');

    if (query.memberName) {
      queryBuilder.where('user.username = :memberName', {
        memberName: query.memberName,
      });
    }

    const [bills, count] = await queryBuilder
      .select([
        'bill.bill_id',
        'bill.bill_title',
        'bill.open_type',
        'bill.open_status',
        'bill.processor_code',
        'bill.processor_department_name',
        'bill.processor_drafter_name',
        'bill.processor_drafter_position',
        'bill.processor_name',
        'bill.processor_rstr_number',
        'bill.processor_reviewer_name',
        'bill.processor_reviewer_position',
        'bill.processor_sts_cd',
        'bill.request_content',
        'bill.request_date',
        'user.id',
        'user.username',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('bill.request_date', 'DESC')
      .getManyAndCount();
    return [bills, Math.floor(count / pageSize) + (count % pageSize ? 1 : 0)];
  }
}
