class Role extends Laya.Sprite {

    private body: Laya.Animation;

    private static cached: boolean = false;

    constructor() {
        super();
    }

    public init() {
        // if (!Role.cached) {
        //     Role.cached = true;
        //     Laya.Animation.createFrames(["star/PurpleMonster.png"], 'PurpleMonster');
        // }

        // if (!this.body) {
        //     this.body = new Laya.Animation();
        //     this.addChild(this.body);
        // }

        // this.body.play(0, true, 'PurpleMonster');
        // let bound: Laya.Rectangle = this.body.getBounds();
        // this.body.pos(-bound.width / 2, -bound.height / 2);

        
    }
}