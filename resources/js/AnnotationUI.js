
let drawButton, eraseButton, undoButton, visibilityButton, clearButton;

function initButtonEvents(ui) {
    //Gets the references to the html ui elements and adds the corresponding Eventlistener to them
    drawButton = document.querySelector(".icon.draw");
    drawButton.addEventListener("click", ui.onClickDrawButton.bind(ui));
    eraseButton = document.querySelector(".icon.erase");
    eraseButton.addEventListener("click", ui.onClickEraseButton.bind(ui));
    undoButton = document.querySelector(".icon.undo");
    undoButton.addEventListener("click", ui.onClickUndoButton.bind(ui));
    visibilityButton = document.querySelector(".icon.visibility");
    visibilityButton.addEventListener("click", ui.onClickVisibilityButton.bind(ui));
    clearButton = document.querySelector(".icon.clear");
    clearButton.addEventListener("click", ui.onClickClearButton.bind(ui));
}


class AnnotationUI {
    //Manages the UI inputs and applies the changes to the UI elements

    constructor(annotationManager) {
        this.manager = annotationManager;
        this.activity = false;
        initButtonEvents(this);
    }

    setUIActivity(active) {
        //Makes the UI elements active/inactive
        let menu = document.querySelector("#menu");
        this.activity = active;
        if (active) {
            menu.className = "active";
        } else {
            menu.className = "deactivated";
        }
    }

    removeActiveButton() {
        //Clears the visual selection from all buttons
        if(drawButton.classList.contains("active")) {
            drawButton.classList.remove("active");
        }
        if(eraseButton.classList.contains("active")) {
            eraseButton.classList.remove("active");
        }
    }

    //The following methods hand the corresponding action over to the Annotation manager 
    // and make visual changes (e.g. Selection Indicator) to the buttons if needed

    onClickDrawButton() {
        if(this.activity) {
            this.manager.setActionType("draw");
            this.removeActiveButton();
            drawButton.className += " active";
        }
    }

    onClickEraseButton() {
        if(this.activity) {
            this.manager.setActionType("erase");
            this.removeActiveButton();
            eraseButton.className += " active";
        }
    }

    onClickVisibilityButton() {
        if(this.activity) {
            this.manager.toggleCanvasVisibility();
        }
    }

    onClickClearButton() {
        this.manager.clearCanvas();
    }

    onClickUndoButton() {
        this.manager.undoAction();
    }
}

export default AnnotationUI;