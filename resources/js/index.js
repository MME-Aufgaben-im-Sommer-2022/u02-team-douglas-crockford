import VideoPlayer from "./utils/VideoPlayer.js";
import AnnotationCanvas from "./AnnotationCanvas.js";
import AnnotationManager from "./AnnotationManager.js";
import AnnotationUI from "./AnnotationUI.js";

let player, canvas, canvasManager, ui;

function init() {
  //Initializing all elements and classes
  let videoEl = document.querySelector("#player");
  
  canvas = new AnnotationCanvas();
  canvasManager = new AnnotationManager(canvas);
  ui = new AnnotationUI(canvasManager);
  player = new VideoPlayer(videoEl, ui);
}

init();
