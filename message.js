class Message {
    constructor(name, commands) {
    this.name = name;
    if (!name) {
      throw Error('Message name required.');
    }
    this.commands = commands;
  }
}
//an object containing a name and an array of command objects
module.exports = Message;