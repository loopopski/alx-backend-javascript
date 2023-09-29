import { readFile } from 'fs';

function readDatabase(path) {
  return new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const dataArray = data.toString().split('\n').map((e) => e.trim())
          .map((e) => e.split(',').map((e) => e.trim()));
        const dataKeys = dataArray.shift();
        const result = [];
        const dataSet = new Set();
        const res = {};

        for (let i = 0; i < dataArray.length; i += 1) {
          const dataJson = {};
          for (let j = 0; j < dataArray[i].length; j += 1) {
            if (dataArray[i][j] !== '') {
              dataJson[dataKeys[j]] = dataArray[i][j];
              if (dataKeys[j] === 'field') {
                dataSet.add(dataArray[i][j]);
              }
            }
          }
          result.push(dataJson);
        }

        const validResult = result.filter((item) => Object.keys(item).length !== 0);
        dataSet.forEach((value) => {
          const arr = validResult.filter((item) => item.field === value);
          const firstNames = arr.map((item) => item.firstname);
          res[value] = firstNames;
        });
        resolve(res);
      }
    });
  });
}

export default readDatabase;
