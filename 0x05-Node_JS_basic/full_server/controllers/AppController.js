class AppController {
  // constructor() {}
  static getHomepage(req, res) {
    res.status(200).end('Hello Holberton School!');
  }
}

export default AppController;
