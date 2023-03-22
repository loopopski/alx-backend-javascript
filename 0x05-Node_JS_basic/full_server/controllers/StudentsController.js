// Student controller
import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
    readDatabase(DB_FILE)
      .then((report) => {
        const data = [];
        data.push('This is the list of our students');
        for (const [field, list] of Object.entries(report)) {
          if (field) {
            const listOfFirstName = list.join(', ');
            data.push(
              `Number of students in ${field}: ${list.length}. List: ${listOfFirstName}`,
            );
          }
        }
        response.status = 200;
        response.send(data.join('\n'));
      })
      .catch((err) => {
        response.status = 500;
        response.send(err.message);
      });
  }

  static getAllStudentsByMajor(request, response) {
    const { major } = request.params;
    if (major !== 'CS' && major !== 'SWE') {
      response.status = 500;
      response.send('Major parameter must be CS or SWE');
    } else {
      const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';
      readDatabase(DB_FILE)
        .then((studentReport) => {
          const listOfFirstName = `List: ${studentReport[major].join(', ')}`;
          response.send(listOfFirstName);
        })
        .catch((err) => {
          response.status = 500;
          response.send(err.message);
        });
    }
  }
}

export default StudentsController;
