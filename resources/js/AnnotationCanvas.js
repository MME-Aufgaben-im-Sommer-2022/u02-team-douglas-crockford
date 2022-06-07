

var canvasContext, canvas, videoPlayer;

canvas = document.querySelector("#canvas");
canvasContext = canvas.getContext("2d");

//videoPlayer = document.querySelector(".video-layer");

//canvas.width = videoPlayer.offsetWidth;
//canvas.height = videoPlayer.offsetHeight;


class AnnotationCanvas {

    constructor() {
        this.canvas = canvas;
    }

    drawLine(fromX, fromY, toX, toY, color) {
        canvasContext.strokeStyle = color;
        canvasContext.beginPath();
        canvasContext.moveTo(fromX, fromY);
        canvasContext.lineTo(toX, toY);
        canvasContext.lineWidth = 2;
        canvasContext.stroke();
        canvasContext.closePath();
        console.log("Line drawn!");
        

      }
}

export default AnnotationCanvas;