import { Event, Observable } from "./Observable.js";

function initPlayer(player) {
    player.playerEl = player.el.querySelector("video");
    initControls(player);
    initEvents(player);
}

function initControls(player) {
    //Initializes the control ui html elements of the player
    player.controls = {
        uploadEl: player.el.querySelector(".upload"),
        seekbarEl: player.el.querySelector(".seekbar"),
        playButton: player.el.querySelector(".icon.play.paused"),
        uploadButton: player.el.querySelector(".icon.file"),
        timeLabel: player.el.querySelector("#time"),
    };
}

function initEvents(player) {
    //Adds EventListener to the elements
    player.controls.uploadEl.addEventListener("change", player.onVideoFileSelected
        .bind(player));
    player.controls.seekbarEl.addEventListener("change", player.onSeekbarChanged.bind(
        player));
    player.controls.playButton.addEventListener("click", player.onPlayButtonClicked
        .bind(player));
    player.controls.uploadButton.addEventListener("click", player.onFileButtonClicked
        .bind(player));
    player.playerEl.addEventListener("timeupdate", player.onVideoTimeChanged.bind(
        player));
    player.playerEl.addEventListener("ended", player.onVideoEnded.bind(player));
}

function syncVideoTime(player) {
    //Synchronizes the video time of the player to the element displaying it
    let seekbarPositon = player.controls.seekbarEl.value / parseInt(player.controls
            .seekbarEl
            .max),
        selectedPosition = player.playerEl.duration * seekbarPositon;
    if (selectedPosition) {
        player.playerEl.currentTime = selectedPosition;
    }
}

function syncSeekbar(player) {
    //Synchronizes the seekbar to the player
    let seekbarMax = parseInt(player.controls.seekbarEl.max),
        value = (seekbarMax / player.playerEl.duration) * player.playerEl.currentTime;
    player.controls.seekbarEl.value = value;
}

function syncTimeLabel(player) {
    let currentTime = player.playerEl.currentTime,
        minutes = parseInt(currentTime / 60),
        seconds = parseInt(currentTime % 60);
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    player.controls.timeLabel.innerHTML = minutes + ":" + seconds;
}

class VideoPlayer extends Observable {
    //Handles the VideoPlayer with all its UI elements
    //Closely modeled after the class for the AmbiPlayer Projekt: https://github.com/Multimedia-Engineering-Regensburg-Demos/MME-AmbiPlayer

    constructor(el, ui) {
        super();
        this.el = el;
        this.ui = ui;
        initPlayer(this);
    }

    play() {
        this.playerEl.play();
        this.controls.playButton.classList.remove("paused");
        this.ui.setUIActivity(false);
    }

    pause() {
        this.playerEl.pause();
        this.controls.playButton.classList.add("paused");
        this.ui.setUIActivity(true);
    }

    stop() {
        this.pause();
        this.playerEl.currentTime = 0;
        this.ui.setUIActivity(true);
    }

    setFile(file) {
        let fileURL = URL.createObjectURL(file);
        this.playerEl.src = fileURL;
    }

    onVideoFileSelected() {
        //Sets the file that should be displayed; accepted formats: ogg and mp4
        let file = this.controls.uploadEl.files[0];
        if (file && (file.type === "video/mp4" || file.type === "video/ogg" )) {
            this.setFile(file);
            this.stop();
        }
    }

    onSeekbarChanged() {
        syncVideoTime(this);
        syncTimeLabel(this);
    }

    onVideoTimeChanged() {
        let event = new Event("videoFrameChanged", this.playerEl);
        this.notifyAll(event);
        syncSeekbar(this);
        syncTimeLabel(this);
    }

    onVideoEnded() {
        this.stop();
    }

    onPlayButtonClicked() {
        if (this.playerEl.paused === true) {
            this.play();
        } else {
            this.pause();
        }
    }

    onFileButtonClicked() {
        this.controls.uploadEl.click();
    }

}

export default VideoPlayer;