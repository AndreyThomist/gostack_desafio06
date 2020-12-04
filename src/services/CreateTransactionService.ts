import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import { getRepository } from 'typeorm'
import Category from '../models/Category'

interface Request {
  title: string
  value: number
  type: string,
  category: string
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const categoryRepository = getRepository(Category);

    const foundCategory = await categoryRepository.findOne({
      where: {
        title: category
      }
    })
    let transaction;
    if (foundCategory) {
      transaction = transactionRepository.create({
        title,
        category_id: foundCategory.id,
        type,
        value
      })
    } else {
      console.log(category)
      const newCategory = categoryRepository.create({
        title: category
      })
      await categoryRepository.save(newCategory);
      transaction = transactionRepository.create({
        title,
        category_id: newCategory.id,
        type,
        value
      })
    }
    const incomeTransactions = await transactionRepository.find({
      where: {
        type: "income"
      }
    });

    const incomeTotal = incomeTransactions.reduce((previous, current) => {
      return previous + +current.value;
    }, 0);

    if (type === "outcome" && value > incomeTotal) {
      throw new AppError('Não foi possivel criar transação', 400)
    }

    await transactionRepository.save(transaction);
    return transaction;
  }
}

export default CreateTransactionService;
