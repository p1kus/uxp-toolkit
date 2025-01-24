const app = require("photoshop");

let actionName = "Placeholder"

async function actions() {
    let commands = [];
    // Put Action commands inside [] 

    return await app.action.batchPlay(commands, {});
  }
  
  async function runActions() {
    await app.core.executeAsModal(actions, {"commandName": actionName})
    console.log("flip")
  }



document.getElementById("btn").addEventListener("click", runActions);
// link to a button in the plugin