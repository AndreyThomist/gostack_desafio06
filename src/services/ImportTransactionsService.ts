import Transaction from '../models/Transaction';
import LoadCsv from '../helpers/LoadCsv'
import Category from '../models/Category';
import csvParse from 'csv-parse';
import { getRepository } from 'typeorm'

import uploadConfig from '../config/upload'
import fs from 'fs';
import path from 'path';

interface Request {
   filename: string
}

class ImportTransactionsService {
   async execute({ filename }: Request): Promise<Transaction[]> {
      const categoryRepository = getRepository(Category);
      const transactionRepository = getRepository(Transaction);
      const lines = await LoadCsv(filename);
      const transactions: Transaction[] = [];
      for(const elementos of lines){
         const foundCategory = await categoryRepository.findOne({
            where: {
               title: elementos[3]
            }
         })
         let transaction;
         if(foundCategory){
            transaction = await transactionRepository.create({
                category_id:foundCategory.id,
                title:elementos[0],
                type:elementos[1],
                value:elementos[2]
            })
         }else{
            const createdCategory = categoryRepository.create({
               title:elementos[3]
            });
            await categoryRepository.save(createdCategory);
            transaction = await transactionRepository.create({
               category_id:createdCategory.id,
               title:elementos[0],
               type:elementos[1],
               value:elementos[2]
           })
         }
         await transactionRepository.save(transaction);
         transactions.push(transaction);
      }
      return transactions;
   }
}

export default ImportTransactionsService;
