const http = require('http');
const fs = require('fs');

const { argv } = process;
const hostname = '127.0.0.1';
const port = 1245;

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  }
});

app.on('request', (req, res) => {
  if (req.url === '/students') {
    res.setHeader('Content-Type', 'text/plain');
    res.write('This is the list of our students\n');

    const countStudents = async (path) => {
      try {
        const data = await fs.promises.readFile(path, 'utf8');
        const dataArray = data.toString().split('\n').map((e) => e.trim())
          .map((e) => e.split(',').map((e) => e.trim()));
        const dataKeys = dataArray.shift();
        const result = [];
        const dataSet = new Set();

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
        res.write(`Number of students: ${validResult.length}\n`);
        const resultArr = Array.from(dataSet);
        resultArr.forEach((value, idx, resultArr) => {
          const arr = validResult.filter((item) => item.field === value);
          const firstNames = arr.map((item) => item.firstname);
          res.write(`Number of students in ${value}: ${arr.length}. List: ${firstNames.join(', ')}`);
          if (idx !== resultArr.length - 1) {
            res.write('\n');
          }
        });
        return data;
      } catch (err) {
        throw new Error('Cannot load the database');
      }
    };
    countStudents(argv[2]).then(() => {
      res.end();
    }).catch(() => {
      res.statusCode = 404;
      res.end('Cannot load the database');
    });
  }
});

app.listen(port, hostname);

module.exports = app;
