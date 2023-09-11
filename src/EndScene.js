class EndScene extends Phaser.Scene {
    constructor() {
        super({ key: "EndScene" });
    }

    preload() {
        this.load.video("trinity", "./assets/clips/trinity.mp4");
    }

    create() {
        const endClip = this.add.video(900, 450, "trinity");

        this.cameras.main.setBounds(0, 0, 0, 0);
        this.scale.resize(window.innerWidth, window.innerHeight);

        endClip.play();
    }
}

export default EndScene;