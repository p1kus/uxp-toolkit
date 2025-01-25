const { entrypoints } = require("uxp");
const app = require("photoshop");

showAlert = () => {
  alert("This is an alert message");
}

entrypoints.setup({
  commands: {
    showAlert,
  },
  panels: {
    vanilla: {
      show(node) {
      }
    }
  }
});





async function adjustLevels() {
  let commands = [{"_obj":"set","_target":[{"_property":"selection","_ref":"channel"}],"to":{"_obj":"rectangle","bottom":{"_unit":"pixelsUnit","_value":750.0},"left":{"_unit":"pixelsUnit","_value":0.0},"right":{"_unit":"pixelsUnit","_value":640.0},"top":{"_unit":"pixelsUnit","_value":588.0}}},
  {"_obj":"make","_target":[{"_ref":"adjustmentLayer"}],"using":{"_obj":"adjustmentLayer","type":{"_obj":"levels","presetKind":{"_enum":"presetKindType","_value":"presetKindDefault"}}}},
  {"_obj":"set","_target":[{"_enum":"ordinal","_ref":"adjustmentLayer"}],"to":{"_obj":"levels","adjustment":[{"_obj":"levelsAdjustment","channel":{"_enum":"channel","_ref":"channel","_value":"composite"},"input":[64,255]}],"presetKind":{"_enum":"presetKindType","_value":"presetKindCustom"}}},
  {"_obj":"select","_target":[{"_enum":"channel","_ref":"channel","_value":"RGB"}],"makeVisible":false},
  {"_obj":"mergeLayersNew"}];

  return await app.action.batchPlay(commands, {});
}

async function runAdjust() {
  await app.core.executeAsModal(adjustLevels, { "commandName": "adjust-levels" })
}



async function contentAwareFill() {

  let tolerance = document.getElementById("tolerance");
  let expand = document.getElementById("expand");

  let commands = [{"_obj":"addTo","_target":[{"_property":"selection","_ref":"channel"}],"contiguous":false,"to":{"_obj":"paint","horizontal":{"_unit":"pixelsUnit","_value":78.0},"vertical":{"_unit":"pixelsUnit","_value":612.0}},"tolerance": +tolerance.value},
  {"_obj":"addTo","_target":[{"_property":"selection","_ref":"channel"}],"contiguous":false,"to":{"_obj":"paint","horizontal":{"_unit":"pixelsUnit","_value":146.0},"vertical":{"_unit":"pixelsUnit","_value":684.0}},"tolerance": +tolerance.value},
  {"_obj":"addTo","_target":[{"_property":"selection","_ref":"channel"}],"contiguous":false,"to":{"_obj":"paint","horizontal":{"_unit":"pixelsUnit","_value":186.0},"vertical":{"_unit":"pixelsUnit","_value":662.0}},"tolerance": +tolerance.value},
  {"_obj":"expand","by":{"_unit":"pixelsUnit","_value": +expand.value},"selectionModifyEffectAtCanvasBounds":false},
  {"_obj":"fill","contentAwareColorAdaptationFill":true,"contentAwareMirrorFill":false,"contentAwareRotateFill":false,"contentAwareScaleFill":false,"mode":{"_enum":"blendMode","_value":"normal"},"opacity":{"_unit":"percentUnit","_value":100.0},"using":{"_enum":"fillContents","_value":"contentAware"}},
  {"_obj":"set","_target":[{"_property":"selection","_ref":"channel"}],"to":{"_enum":"ordinal","_value":"none"}}];

  return await app.action.batchPlay(commands, {});
}

async function runFill() {
  await app.core.executeAsModal(contentAwareFill, { "commandName": 'content-aware-fill' })
}


async function cleanup() {
  let commands = [{"_obj":"set","_target":[{"_property":"selection","_ref":"channel"}],"to":{"_obj":"rectangle","bottom":{"_unit":"pixelsUnit","_value":750.0},"left":{"_unit":"pixelsUnit","_value":0.0},"right":{"_unit":"pixelsUnit","_value":645.0},"top":{"_unit":"pixelsUnit","_value":582.0}}},
  {"_obj":"fill","contentAwareColorAdaptationFill":true,"contentAwareMirrorFill":false,"contentAwareRotateFill":false,"contentAwareScaleFill":false,"mode":{"_enum":"blendMode","_value":"normal"},"opacity":{"_unit":"percentUnit","_value":100.0},"using":{"_enum":"fillContents","_value":"contentAware"}},
  {"_obj":"set","_target":[{"_property":"selection","_ref":"channel"}],"to":{"_enum":"ordinal","_value":"none"}}];
  
  return await app.action.batchPlay(commands, {})
}

async function runCleanup() {
  return await app.core.executeAsModal(cleanup, { "commandName": "cleanup" })
}


document.getElementById("adjustBtn").addEventListener("click", runAdjust);

document.getElementById("contentFillBtn").addEventListener("click", runFill);

document.getElementById("cleanupBtn").addEventListener("click", runCleanup);
