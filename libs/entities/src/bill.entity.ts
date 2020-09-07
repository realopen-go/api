import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('bills')
export class Bill {
  @PrimaryColumn({
    length: 16,
    unique: true,
  })
  id: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  result_description: string;

  @Column({
    nullable: false,
  })
  group_id: string;

  @Column({
    length: 10,
  })
  status: string;

  @Column({
    nullable: true,
  })
  public_date: string;

  @Column({
    length: 32,
  })
  request_proc_registration_number: string;

  @Column({
    length: 32,
  })
  registration_number: string;

  @Column({
    length: 32,
  })
  proc_org_code: string;

  @Column({
    length: 32,
  })
  proc_org_name: string;

  @Column({
    length: 32,
  })
  proc_registration_number: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  request_description: string;

  @Column({
    nullable: true,
  })
  request_date: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  request_subject: string;

  @Column({
    length: 32,
    nullable: true,
  })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
  })
  user: User;
}
