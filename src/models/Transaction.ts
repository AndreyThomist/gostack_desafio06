import {Entity,Column,PrimaryGeneratedColumn,JoinColumn,ManyToOne,CreateDateColumn,UpdateDateColumn} from 'typeorm'
import Category from './Category'

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn()
  id: string;
  @Column('varchar')
  title: string;
  @Column('varchar')
  type: string
  @Column('decimal')
  value: number;
  @Column()
  category_id:string
  @ManyToOne(() => Category)
  @JoinColumn({name:'category_id'})
  category: Category;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
