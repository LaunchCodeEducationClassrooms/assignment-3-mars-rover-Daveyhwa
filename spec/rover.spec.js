const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.



describe("Rover class", function() {

//7
  it(`constructor sets position and default values for mode and generatorWatts`, function() {
    let rover = new Rover(0);
    expect(rover.position).toBe(0)
    expect(rover.mode).toBe(`NORMAL`)
    expect(rover.generatorWatts).toBe(110)
    });
//8
 it(`response returned by receiveMessage contains name of message`, function() {
   let rover = new Rover(0);
   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
   let message = new Message('Test message name', commands);
   expect(rover.receiveMessage(message).message).toBe('Test message name')
  })
//9
 it(`response returned by receiveMessage includes two results if two commands are sent in the message`, function() {
   let rover = new Rover(0);
   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
   let message = new Message('Test message with two commands', commands);
   expect(rover.receiveMessage(message).results.length).toBe(2)
    });
//10
 it(`responds correctly to status check command`, function() {
   let rover = new Rover(0);
   let messageStatusCheck = new Message(`Only Status Check Command`, [new Command (`STATUS_CHECK`)])
   rover.receiveMessage(messageStatusCheck).results
   expect(rover.receiveMessage(messageStatusCheck).results[0].completed).toBe(true)
   expect(rover.receiveMessage(messageStatusCheck).results[0].roverStatus.mode).toBe(`NORMAL`)
   expect(rover.receiveMessage(messageStatusCheck).results[0].roverStatus.generatorWatts).toBe(110)
   expect(rover.receiveMessage(messageStatusCheck).results[0].roverStatus.position).toBe(0)
    }); 
//11
 it(`responds correctly to mode change command`, function() {
   let rover = new Rover(0);
   let message = new Message('Changes Modes', [new Command('MODE_CHANGE', 'LOW_POWER')]);
   rover.receiveMessage(message)
   expect(rover.mode).toBe(`LOW_POWER`)
    });
//12
 it(`responds with false completed value when attempting to move in LOW_POWER`, function() {
   let rover = new Rover(0);
   let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command(`Move`,2)];
   let message = new Message('Change then move', commands);
   rover.receiveMessage(message)
   expect(rover.receiveMessage(message).results[1].completed).toBe(false)
    });
//13
 it(`responds with position for move command`, function() {
   let rover = new Rover(0);
   let messageMove = new Message(`Move`,[new Command (`MOVE`,2)])
   rover.receiveMessage(messageMove)
   expect(rover.position).toBe(2)
    });
});
