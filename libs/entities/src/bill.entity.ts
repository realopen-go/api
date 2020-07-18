import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('bills')
export class Bill {
  @PrimaryColumn({
    length: 32,
    unique: true,
  })
  bill_id: string;

  @Column({
    length: 100,
    nullable: true,
  })
  bill_title: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  content: string;

  @Column({
    nullable: false,
  })
  multi_id: string;

  @Column({
    length: 100,
    nullable: true,
  })
  open_type: string;

  @Column({
    length: 10,
    nullable: true,
  })
  open_status: string;

  @Column({
    nullable: true,
  })
  public_date: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_code: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_department_name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_drafter_name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_drafter_position: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_rstr_number: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_reviewer_name: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_reviewer_position: string;

  @Column({
    length: 100,
    nullable: true,
  })
  processor_sts_cd: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  request_content: string;

  @Column({
    nullable: true,
  })
  request_date: string;

  @Column({
    length: 128,
    nullable: true,
  })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
