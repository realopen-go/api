import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({
    length: 128,
    unique: true,
  })
  id: string;

  /**
   * Required
   */
  @Column({
    length: 128,
    unique: true,
  })
  username: string;

  @Column()
  password: string;
}
