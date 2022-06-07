class AnnotationManager {

    constructor(canvas) {
        this.annotationCanvas = canvas;
        this.selectedTool = "brush";
    }

    brushALine() {
        this.annotationCanvas.drawLine(0, 300, 200, 500);
    }
}

export default AnnotationManager;