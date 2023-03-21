const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    } else {
      const printOut = [];
      const dataLines = data.split('\n'); // split each in to separate lines
      let students = dataLines.filter((item) => item);
      students = students.map((item) => item.split(','));
      const printItem = `Number of students: ${students.length - 1}`;
      console.log(printItem);
      printOut.push(printItem);

      const fields = {};
      for (const student in students) {
        if (student !== 0) {
          if (!fields[students[student][3]]) {
            fields[students[student][3]] = [];
          }
          fields[students[student][3]].push(students[student][0]);
        }
      }
      delete fields.field;
      for (const key of Object.keys(fields)) {
        const fieldLen = fields[key].length;
        const stuName = fields[key].join(', ');
        const printItem = `Number of students in ${key}: ${fieldLen}. List: ${stuName}`;
        console.log(printItem);
        printOut.push(printItem);
      }
      resolve(printOut);
    }
  });
});

module.exports = countStudents;
