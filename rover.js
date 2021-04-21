class Rover {
constructor(position) {
    this.position = position;
    this.mode = `NORMAL`
    this.generatorWatts = 110
  }
  receiveMessage(message){
    let resultArr = []
    let resultObj = {}
    for(let i=0;i < message.commands.length;i++){
      if (message.commands[i].commandType===`STATUS_CHECK`){
        let roverStatusObj = {mode:this.mode, generatorWatts:this.generatorWatts, position:this.position}
        resultObj = {completed: true,roverStatus: roverStatusObj}
        resultArr.push(resultObj)
      }else if (message.commands[i].commandType===`MOVE`){
       if(this.mode===`NORMAL`){
        resultObj = {completed: true}
        this.position = message.commands[i].value
       }else{
        resultObj = {completed: false}
       }
        resultArr.push(resultObj)
      }else if (message.commands[i].commandType===`MODE_CHANGE`){
       this.mode = message.commands[i].value
       resultObj = {completed: true}
       resultArr.push(resultObj)
      }else{
       resultObj = {completed: false, reason: `INVALID INPUT`}
       resultArr.push(resultObj)

      }
    }
    let messageOutput = {
      message: message.name,
      results: resultArr
    }
    return messageOutput
  }}
// an object that contains some values and a function that takes a message object as input and uses the commands in it to change its values and return an array of the tasks it has completed and couldn't complete
module.exports = Rover;