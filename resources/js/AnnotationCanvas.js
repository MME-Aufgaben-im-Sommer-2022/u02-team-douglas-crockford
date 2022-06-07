

var canvasContext, canvas, videoPlayer;

canvas = document.querySelector("#canvas");
canvasContext = canvas.getContext("2d");

class AnnotationCanvas {

    constructor() {
        this.canvas = canvas;
        this.context = canvasContext;
    }

    drawLine(fromX, fromY, toX, toY, color) {
        canvasContext.globalCompositeOperation = "source-over";
        canvasContext.strokeStyle = color;
        canvasContext.beginPath();
        canvasContext.moveTo(fromX, fromY);
        canvasContext.lineTo(toX, toY);
        canvasContext.lineWidth = 2;
        canvasContext.stroke();
        canvasContext.closePath();
        

      }

    eraseLine(fromX, fromY, toX, toY) {
        canvasContext.globalCompositeOperation = "destination-out";
        canvasContext.beginPath();
        canvasContext.moveTo(fromX, fromY);
        canvasContext.lineTo(toX, toY);
        canvasContext.lineWidth = 4;
        canvasContext.stroke();
        canvasContext.closePath();
    }
}

export default AnnotationCanvas;