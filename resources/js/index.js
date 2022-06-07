import VideoPlayer from "./utils/VideoPlayer.js";
import AnnotationCanvas from "./AnnotationCanvas.js";
import AnnotationManager from "./AnnotationManager.js";

let player, canvas, canvasManager;

function init() {
  let videoEl = document.querySelector("#player");
  player = new VideoPlayer(videoEl);
  canvas = new AnnotationCanvas();
  canvasManager = new AnnotationManager(canvas);
  // eslint-disable-next-line no-console
  console.log("#### Starting Video Assistant app ####");
  // TODO: Start your implementation here
}

init();
