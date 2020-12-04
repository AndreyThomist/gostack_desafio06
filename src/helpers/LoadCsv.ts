
import csvParse from 'csv-parse';
import path from 'path';
import uploadConfig from '../config/upload'
import fs from 'fs';
 async function loadCsv(filename:string):Promise<[]>{
    const csvFilePath = path.resolve(uploadConfig.directory,filename);
    const readCSVStream = fs.createReadStream(csvFilePath)
    const parseStream = csvParse({ 
      from_line: 2,
      ltrim: true,
      rtrim: true,
    });
    const parseCSV = readCSVStream.pipe(parseStream)
    const lines:any = [];
    parseCSV.on('data',async (data) => {
        lines.push(data);
    })
    await new Promise(resolve => {
        parseCSV.on('end', resolve);
        fs.promises.unlink(path.resolve(uploadConfig.directory,filename))
    });

    return lines;
}

export default loadCsv;