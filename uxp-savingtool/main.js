const { entrypoints } = require("uxp");
const photoshop = require('photoshop');
const fsProvider = require('uxp').storage.localFileSystem;


  showAlert = () => {
    alert("This is an alert message");
  }

  entrypoints.setup({
    commands: {
      showAlert,
    },
    panels: {
      vanilla: {
        show(node ) {
        }
      }
    }
  });

function showLayerNames() {
    const app = require("photoshop").app;
    const allLayers = app.activeDocument.layers;
    const allLayerNames = allLayers.map(layer => layer.name);
    const sortedNames = allLayerNames.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    document.getElementById("layers").innerHTML = `
      <ul>${
        sortedNames.map(name => `<li>${name}</li>`).join("")
      }</ul>`;
}


async function flipImage() {
  let commands = [{
    "_obj": "flip",
    "_target": [{
      "_enum": "ordinal",
      "_ref": "document",
      "_value": "first"
    },
  ],
  "axis": {
    "_enum": "orientation",
    "_value": "horizontal"
  }
  }];
  return await require("photoshop").action.batchPlay(commands, {});
}

async function runFlip() {
  await require("photoshop").core.executeAsModal(flipImage, {"commandName": "Flip"})
  console.log("flip")
}



async function savePDF() {

const ps = require('photoshop');
const uxp = require('uxp');
const fs = uxp.storage.localFileSystem;
const core = ps.core;
const app = ps.app;
const img = app.activeDocument;

try {
    const file_pdf = await fs.getFileForSaving('pic.pdf', { types: [ 'pdf' ] });
    await img.saveAs.psd(file_pdf, {}, true);
} catch (e) {
    core.showAlert(e.message);
    console.log(e);
}
}

async function saveJPG() {

  const ps = require('photoshop');
  const uxp = require('uxp');
  const fs = uxp.storage.localFileSystem;
  const core = ps.core;
  const app = ps.app;
  const img = app.activeDocument;
  
  try {
      const file_jpg = await fs.getFileForSaving('pic.jpg', { types: [ 'jpg' ] });
      await img.saveAs.jpg(file_jpg, {}, true);
  } catch (e) {
      core.showAlert(e.message);
      console.log(e);
  }
  
  }

  async function runSavePDF() {
    await require("photoshop").core.executeAsModal(savePDF, {"commandName": "Save"})
    console.log("test")
  }

  async function runSaveJPG() {
    await require("photoshop").core.executeAsModal(saveJPG, {"commandName": "Save"})
    console.log("test")
  }


  document.getElementById("btnSavePDF").addEventListener("click", runSavePDF);
  document.getElementById("btnSaveJPG").addEventListener("click", runSaveJPG);
document.getElementById("btnPopulate").addEventListener("click", showLayerNames);
document.getElementById("btnFlip").addEventListener("click", runFlip);


