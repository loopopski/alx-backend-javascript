const express = require('express');
const fs = require('fs');

const app = express();
const port = 1245;
const hostname = '127.0.0.1';

const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

function countStudents(path) {
  const res = [];
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n');
        const students = lines.slice(1, -1);
        const numberOfStudents = students.length;
        const obj = {};

        students.forEach((student) => {
          const data = student.split(',');
          const field = data[data.length - 1];

          if (!obj[field]) {
            obj[field] = {};
            obj[field].firstname = [];
            obj[field].count = 1;
          } else {
            obj[field].count += 1;
          }
          obj[field].firstname.push(data[0]);
        });

        res.push(`Number of students: ${numberOfStudents}`);

        for (const [field, value] of Object.entries(obj)) {
          const firstnames = value.firstname.join(', ');
          res.push(
            `Number of students in ${field}: ${value.count}. List: ${firstnames}`,
          );
        }
        resolve(res.join('\n'));
      }
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const studentReport = [];
  studentReport.push('This is the list of our students');
  countStudents(DB_FILE)
    .then((data) => {
      studentReport.push(data);
      res.send(studentReport.join('\n'));
    })
    .catch((err) => {
      studentReport.push(err instanceof Error ? err.message : err.toString());
      res.send(studentReport.join('\n'));
    });
});

module.exports = app.listen(port, hostname, () => {
  console.log(`Example app running at http://${hostname}:${port}/`);
});
