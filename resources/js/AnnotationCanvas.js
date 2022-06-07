

var canvasContext, canvas, player;

canvas = document.querySelector(".canvas-layer");
canvasContext = canvas.getContext("2d");


class AnnotationCanvas {

    constructor() {
    }

    drawLine(fromX, fromY, toX, toY) {
        canvasContext.beginPath();
        canvasContext.moveTo(fromX, fromY);
        canvasContext.lineTo(toX, toY);
        canvasContext.stroke();
        canvasContext.closePath();
        console.log("Line drawn!");
      }
}

export default AnnotationCanvas;