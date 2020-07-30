import { Repository, Db, getConnection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Bill, User } from '@app/entities';
import { format } from '@app/utils/date';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private readonly billRepository: Repository<Bill>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAllPrivate(
    page = 1,
    pageSize = 10,
    query: {
      userId?: string;
    } = {},
  ): Promise<[Bill[], number]> {
    const queryBuilder = this.billRepository
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.user', 'user');

    if (query.userId) {
      queryBuilder.where('user.id = :userId', {
        userId: query.userId,
      });
    }

    if (query.userId) {
      queryBuilder.where('user.id = :userId', {
        userId: query.userId,
      });
    }

    const [bills, count] = await queryBuilder
      .select([
        'bill.bill_id',
        'bill.bill_title',
        'bill.content',
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

  async findAllPublic(
    page = 1,
    pageSize = 10,
    query: {
      memberName?: string;
      text?: string;
    } = {},
  ): Promise<[{ [key: string]: Bill[] }, number]> {
    const publicDate = format(new Date());
    const multiIdsFilteringQueryBuilder = await this.billRepository
      .createQueryBuilder('bill')
      .groupBy('bill.multi_id')
      .where(
        'bill.public_date < :publicDate AND bill.public_date IS NOT NULL',
        {
          publicDate,
        },
      )
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('bill.request_date', 'DESC');

    if (query.memberName) {
      multiIdsFilteringQueryBuilder.andWhere('user.username = :memberName', {
        memberName: query.memberName,
      });
    }

    if (query.text) {
      multiIdsFilteringQueryBuilder.andWhere('bill.bill_title LIKE :text', {
        text: `%${query.text}%`,
      });
    }

    const [billsForMultiId, [{ count }]] = await Promise.all([
      multiIdsFilteringQueryBuilder.getMany(),
      getConnection().query(
        'SELECT COUNT(bill.multi_id) as count From (SELECT multi_id, count(multi_id) from bills group by multi_id) as bill',
      ),
    ]);

    const bills = await this.billRepository
      .createQueryBuilder('bill')
      .leftJoinAndSelect('bill.user', 'user')
      .select([
        'bill.bill_id',
        'bill.bill_title',
        'bill.multi_id',
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
      .where('bill.multi_id IN (:multiIds)', {
        multiIds: billsForMultiId.map(bill => bill.multi_id),
      })
      .getMany();

    const billsMap = {};
    let index = 1;
    bills.forEach(bill => {
      if (billsMap[bill.multi_id]) {
        billsMap[bill.multi_id].bills.push(bill);
      } else {
        billsMap[bill.multi_id] = { bills: [bill], index };
        index++;
      }
    });

    return [
      billsMap,
      Math.floor(count / pageSize) + (count % pageSize ? 1 : 0),
    ];
  }
}
