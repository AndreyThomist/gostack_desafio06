import { Router } from 'express';
import  {getCustomRepository} from 'typeorm'
import multer from 'multer'
 import TransactionsRepository from '../repositories/TransactionsRepository';
 import CreateTransactionService from '../services/CreateTransactionService';
 import DeleteTransactionService from '../services/DeleteTransactionService';
 import uploadConfig from '../config/upload'
 import ImportTransactionsService from '../services/ImportTransactionsService';

const upload = multer(uploadConfig);

const transactionsRouter = Router();

transactionsRouter.get('/', async (request, response) => {
    const transactionsRepository = getCustomRepository(TransactionsRepository)
    const balance = await transactionsRepository.getBalance();
    const transactions = await transactionsRepository.find()
    return response.json({
        transactions:transactions,
        balance:balance
    })
});

transactionsRouter.post('/', async (request, response) => {
  const {title,value,type,category} = request.body;
  const createTransaction = new CreateTransactionService();
  const transaction = await  createTransaction.execute({
    title,
    value,
    type,
    category
  })
  return response.json(transaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const {id} = request.params;
  const deleteTransaction = new DeleteTransactionService();
  deleteTransaction.execute({
    id
  })
  return response.json({
     message:"deleted with success"
  })
});

transactionsRouter.post('/import' ,upload.single('file'),async (request, response) => {
  const importService = new ImportTransactionsService();
  const transactions = await importService.execute({filename:request.file.filename});
  return response.json(transactions);
});

export default transactionsRouter;
