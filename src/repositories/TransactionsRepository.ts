import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
      const incomeTransactions =  await this.find({
        where:{
          type:"income"
        }
      });
      const incomeAmount = incomeTransactions.reduce((previous,current) => {
        return previous + +current.value;
      },0)

      const outcomeTransactions =  await this.find({
        where:{
          type:"outcome"
        }
      });
      const outcomeAmount = outcomeTransactions.reduce((previous,current) => {
        return previous + +current.value;
      },0)
      return {
          income:incomeAmount,
          outcome:outcomeAmount,
          total:incomeAmount - outcomeAmount
      };
  }
}

export default TransactionsRepository;
