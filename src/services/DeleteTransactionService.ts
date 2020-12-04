// import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import {getRepository} from 'typeorm'

interface Request{
   id:string
}

class DeleteTransactionService {
  public async execute({id}:Request): Promise<void> {
    const transactionRepository = getRepository(Transaction);
    transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
