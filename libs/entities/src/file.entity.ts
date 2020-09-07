import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('files')
export class File {
  /**
   * Required
   */
  @PrimaryColumn()
  id: number;

  @Column({
    length: 255,
  })
  filename: string;

  @Column({
    length: 100,
  })
  bill_id: number;
}
