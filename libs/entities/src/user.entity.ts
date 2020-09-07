import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  /**
   * Required
   */
  @PrimaryColumn({
    length: 100,
  })
  username: string;

  @Column({
    length: 100,
    nullable: true,
  })
  password: string;

  /**
   * Optional
   */
  @Column({
    nullable: true,
  })
  embago_month: number;
}
