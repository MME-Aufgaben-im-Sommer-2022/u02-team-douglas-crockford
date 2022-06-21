import { Event, Observable } from "./utils/Observable.js";

let oldX, oldY, newX, newY,
 drawCollection = [],
 index = -1;

const COLOR_WHITE = "rgb(255,255,255)";


function initEvents(manager) {
    //Initializes the EventListeners for the mouse events
    manager.annotationCanvas.canvas.addEventListener("mousemove", (event) => manager.onMouseMove(event));
    manager.annotationCanvas.canvas.addEventListener("mousedown", manager.onMouseDown.bind(manager));
    manager.annotationCanvas.canvas.addEventListener("mouseup", manager.onMouseUp.bind(manager));
    manager.annotationCanvas.canvas.addEventListener("mouseout", manager.onMouseOut.bind(manager));
}

class AnnotationManager extends Observable{
    //Handles all the Mouse inputs and performs actions on the AnnotationCanvas accordingly

    constructor(canvas, context) {
        super();
        this.annotationCanvas = canvas;
        this.selectedTool = "draw";
        this.active = false;
        this.canvasVisibility = true;
        initEvents(this);
        this.oldX = 0;
        this.oldY = 0;
        this.newX = 0;
        this.newY = 0;
    }

    

    onMouseMove(event) {
        //Computes old and new Coordinates from the mouse when moved 
        // and calls performAction when mouse is pressed down
        let player = document.querySelector("#player");
        let bound = this.annotationCanvas.canvas.getBoundingClientRect();

        this.oldX = this.newX;
        this.oldY = this.newY;

        this.newX = event.clientX - player.offsetLeft;
        this.newY = event.clientY - player.offsetTop;
        this.newX /= bound.width; 
        this.newY /= bound.height; 
        this.newX *= this.annotationCanvas.canvas.width; 
        this.newY *= this.annotationCanvas.canvas.height; 
        
        if(this.active) {
            this.performAction(this.oldX, this.oldY, this.newX, this.newY);
        }
    }

    onMouseDown() {
        //Sets active to true when the mouse is pressed down
        if(!this.active) {
            this.active = true;
        }
    }

    onMouseUp() {
        //Sets active to false and pushes a Canvas in drawCollection for the undo functionality
        if(this.active) {
            this.active = false;

            drawCollection.push(this.annotationCanvas.context
                .getImageData(0, 0, this.annotationCanvas.canvas.width, this.annotationCanvas.canvas.height));
            index += 1;
        }
    }

    onMouseOut() {
        this.onMouseUp();
    }

    performAction(oldX,oldY,newX,newY) {
        //Performs the selected Action and calls the corresponding method on the AnnotationCanvas
        if(this.selectedTool == "draw") {
            this.annotationCanvas.drawLine(oldX,oldY,newX,newY, COLOR_WHITE);
        }
        if(this.selectedTool == "erase") {
            this.annotationCanvas.eraseLine(oldX,oldY,newX,newY);
        }
    }

    setActionType(type) {
        this.selectedTool = type;
    }

    toggleCanvasVisibility() {
        this.canvasVisibility = !this.canvasVisibility;
        if(this.canvasVisibility) {
            this.annotationCanvas.canvas.style.visibility = "visible";
        } else {
            this.annotationCanvas.canvas.style.visibility = "hidden";
        }

    }

    clearCanvas() {
        this.annotationCanvas.context.clearRect(0, 0, this.annotationCanvas.canvas.width, this.annotationCanvas.canvas.height);
        drawCollection = [];
        index = -1;
    }

    undoAction() {
        //Undoes one complete action until not possible
        if (index <= 0) {
            this.clearCanvas();
        } else {
            index -= 1;
            drawCollection.pop();
            this.annotationCanvas.context.putImageData(drawCollection[index], 0, 0);
        }
    }
}

export default AnnotationManager;