import VideoPlayer from "./utils/VideoPlayer.js";
import AnnotationCanvas from "./AnnotationCanvas.js";
import AnnotationManager from "./AnnotationManager.js";
import AnnotationUI from "./AnnotationUI.js";

let player, canvas, canvasManager, ui;

function init() {
  let videoEl = document.querySelector("#player");
  
  canvas = new AnnotationCanvas();
  canvasManager = new AnnotationManager(canvas);
  ui = new AnnotationUI(canvasManager);
  player = new VideoPlayer(videoEl, ui);
  // eslint-disable-next-line no-console
  console.log("#### Starting Video Assistant app ####");
  // TODO: Start your implementation here
}

init();
