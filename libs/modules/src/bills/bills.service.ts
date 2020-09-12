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
      queryBuilder.where('user.username = :userId', {
        userId: query.userId,
      });
    }

    if (query.userId) {
      queryBuilder.where('user.username = :userId', {
        userId: query.userId,
      });
    }

    const [bills, count] = await queryBuilder
      .select([
        'bill.id',
        'bill.result_description',
        'bill.group_id',
        'bill.status',
        'bill.request_proc_registration_number',
        'bill.registration_number',
        'bill.proc_org_code',
        'bill.proc_org_name',
        'bill.proc_registration_number',
        'bill.request_description',
        'bill.request_date',
        'bill.request_subject',
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
      .groupBy('bill.group_id')
      .where(
        'bill.public_date < :publicDate AND bill.public_date IS NOT NULL',
        {
          empty: '',
          publicDate,
        },
      )
      .andWhere('bill.public_date <> :empty', {
        empty: ' ',
      })
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('bill.request_date', 'DESC');

    if (query.memberName) {
      multiIdsFilteringQueryBuilder.andWhere('user.username = :memberName', {
        memberName: query.memberName,
      });
    }

    if (query.text) {
      multiIdsFilteringQueryBuilder.andWhere(
        'bill.request_subject LIKE :text',
        {
          text: `%${query.text}%`,
        },
      );
    }

    const [billsForMultiId, [{ count }]] = await Promise.all([
      multiIdsFilteringQueryBuilder.getMany(),
      getConnection().query(
        `SELECT COUNT(bill.group_id) as count From (SELECT group_id, count(group_id) from bills  WHERE public_date <> '' AND public_date < '${publicDate}' AND public_date IS NOT NULL group by group_id) as bill`,
      ),
    ]);

    if (billsForMultiId.length) {
      const bills = await this.billRepository
        .createQueryBuilder('bill')
        .leftJoinAndSelect('bill.user', 'user')
        .select([
          'bill.id',
          'bill.result_description',
          'bill.group_id',
          'bill.status',
          'bill.request_proc_registration_number',
          'bill.registration_number',
          'bill.proc_org_code',
          'bill.proc_org_name',
          'bill.proc_registration_number',
          'bill.request_description',
          'bill.request_date',
          'bill.request_subject',
          'user.username',
        ])
        .where('bill.group_id IN (:multiIds)', {
          multiIds: billsForMultiId.map(bill => bill.group_id),
        })
        .getMany();

      const billsMap = {};
      let index = 1;
      bills.forEach(bill => {
        if (billsMap[bill.group_id]) {
          billsMap[bill.group_id].bills.push(bill);
        } else {
          billsMap[bill.group_id] = { bills: [bill], index };
          index++;
        }
      });

      return [
        billsMap,
        Math.floor(count / pageSize) + (count % pageSize ? 1 : 0),
      ];
    }
    return [{}, 0];
  }
}
