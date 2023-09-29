import readDatabase from '../utils';

class StudentsController {
  // constructor() { }

  static getAllStudents(req, res) {
    const output = [];
    res.status(200);
    output.push('This is the list of our students');
    readDatabase(process.argv[2]).then((data) => {
      const keys = Object.keys(data).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
      keys.forEach((key) => {
        output.push(`Number of students in ${key}: ${data[key].length}. List: ${data[key].join(', ')}`);
      });
      res.end(output.join('\n'));
    }).catch(() => {
      res.status(500).end('Cannot load the database');
    });
  }

  static getAllStudentsByMajor(req, res) {
    res.status(200);
    const { major } = req.params;
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).end('Major parameter must be CS or SWE');
    }
    readDatabase(process.argv[2]).then((data) => {
      res.write(`List: ${data[major].join(', ')}`);
      res.end();
    }).catch(() => {
      res.status(500).end('Cannot load the database');
    });
  }
}

export default StudentsController;
