class Main {

    private gameInfo: Background;

    private hero: Laya.Sprite;

    private roleBox: Laya.Sprite;

    constructor() {
        Laya.MiniAdpter.init();
        Laya.init(1280, 720, Laya.WebGL);
        Laya.stage.scaleMode = 'showall';
        Laya.stage.alignH = 'center';
        Laya.stage.screenMode = 'horizontal';
        Laya.loader.load('res/atlas/star.atlas', Laya.Handler.create(this, this.onLoaded), null, Laya.loader.ATLAS);

    }
    onLoaded(): void {
        this.gameInfo = new Background();
        Laya.stage.addChild(this.gameInfo);

        // this.roleBox = new Laya.Sprite();

        this.hero = new Laya.Sprite();
        // this.roleBox.addChild(this.hero);

        // let bound: Laya.Rectangle = this.gameInfo.getBounds();
        // this.body.pos(-bound.width / 2, -bound.height / 2);

        this.hero.loadImage("star/PurpleMonster.png");
        Laya.stage.addChild(this.hero);

        Laya.timer.frameLoop(10, this, this.onLoop);
    }
    onLoop(): void {
        if (this.hero.y < 50) {
            this.hero.y += 10;
        } else {
            this.hero.y -= 5;
        }
        console.log('y:', this.hero.y);
    }
    restart(): void {

    }
}


new Main();