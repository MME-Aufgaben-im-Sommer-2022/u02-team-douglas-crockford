

var canvasContext, canvas;

//Setting up the canvas
canvas = document.querySelector("#canvas");
canvasContext = canvas.getContext("2d");

class AnnotationCanvas {
    //Performs the actions it gets from the AnnotationManager and applies them to the Canvas

    constructor() {
        this.canvas = canvas;
        this.context = canvasContext;
    }

    drawLine(fromX, fromY, toX, toY, color) {
        //Draws a line with following parameters
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
        //Erases a line with the following parameters
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