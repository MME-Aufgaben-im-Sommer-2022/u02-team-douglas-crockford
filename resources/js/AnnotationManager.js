import { Event, Observable } from "./utils/Observable.js";

let oldX, oldY, newX, newY;

const COLOR_WHITE = "rgb(255,255,255)";


function initEvents(manager) {
    //manager.annotationCanvas.canvas.addEventListener("mousemove", manager.onMouseMove().bind(manager));
    manager.annotationCanvas.canvas.addEventListener("mousemove", (event) => manager.onMouseMove(event));
    manager.annotationCanvas.canvas.addEventListener("mousedown", manager.onMouseDown.bind(manager));
    manager.annotationCanvas.canvas.addEventListener("mouseup", manager.onMouseUp.bind(manager));
    manager.annotationCanvas.canvas.addEventListener("mouseout", manager.onMouseOut.bind(manager));
}

class AnnotationManager extends Observable{

    constructor(canvas) {
        super();
        this.annotationCanvas = canvas;
        this.selectedTool = "brush";
        this.active = false;
        initEvents(this);
        this.oldX = 0;
        this.oldY = 0;
        this.newX = 0;
        this.newY = 0;
    }

    

    onMouseMove(event) {
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
        if(!this.active) {
            this.active = true;
        }
        console.log("down");
    }

    onMouseUp() {
        if(this.active) {
            this.active = false;
        }
        console.log("up");
    }

    onMouseOut() {

    }

    performAction(oldX,oldY,newX,newY) {
        this.annotationCanvas.drawLine(oldX,oldY,newX,newY, COLOR_WHITE);
    }
}

export default AnnotationManager;