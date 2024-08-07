
import { Scene } from "phaser";
import { PerlinMap } from "./map";
import { WoodenBoat } from "./boats/wooden-boat";

export class UIScene extends Scene {
    private readonly windowWidth = window.innerWidth;
    private readonly windowHeight = window.innerHeight;
    private SCALE: number = 10;
    private seaBed: number[][] = [];
    private scaledSeaBed: number[][] = [];
    private graphics: Phaser.GameObjects.Graphics = {} as Phaser.GameObjects.Graphics;
    private boat;
    private positionText: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private depthText: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private speedText: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private leftButton: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private rightButton: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private goStraightButton: Phaser.GameObjects.Text = {} as Phaser.GameObjects.Text;
    private boatSprite: Phaser.GameObjects.Image = {} as Phaser.GameObjects.Image;
    public constructor() {
        super({ visible: true, key: 'UIScene', active: true });
        this.boat = WoodenBoat.instance;

    }
    preload() {
        this.load.image('boat', '/fish/boat.png');

    }
    drawMap(arr: number[][]) {
        const scale = 4;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] < 18) {
                    this.graphics.fillStyle(0x3da74b, (1 - arr[i][j]) / 100);
                } else if (arr[i][j] < 22) {
                    // Sand
                    this.graphics.fillStyle(0xf4a460, (1 - arr[i][j]) / 100);
                } else {
                    this.graphics.fillStyle(0x99d6ff, (1 - arr[i][j]) / 100);
                }
                this.graphics.fillPoint(i * scale, j * scale, scale);
            }

        }
    }

    drawGroundMap(arr: number[][]) {
        const scale = 10;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                this.graphics.fillStyle(0x685531, arr[i][j]);
                this.graphics.fillPoint(i * scale, j * scale, scale);
            }
        }
    }
    create() {
        this.graphics = this.add.graphics();

        this.boatSprite = this.add.image(22, 33, 'boat')
        this.boatSprite.setScale(0.3);
        this.add.existing(this.boatSprite);
        this.seaBed = PerlinMap.instance.seaBed;
        // Take every 10th value to reduce the size of the map
        this.scaledSeaBed = this.seaBed.map((row, i) => {
            return row.filter((_, j) => j % 5 === 0);
        }).filter((_, i) => i % 5 === 0);
        this.drawMap(this.scaledSeaBed);

        // Create buttons for the controls
        this.throttleButton('Stop', this.windowWidth * 0.01, this.windowHeight * .95, 0);
        this.throttleButton('50% speed', this.windowWidth * 0.01, this.windowHeight * .92, .5);
        this.throttleButton('Full speed', this.windowWidth * 0.01, this.windowHeight * .89, 1);
        this.positionText = this.add.text(this.windowWidth * 0.01, this.windowHeight * .3, `Position: ${0}, ${0}`);
        this.depthText = this.add.text(this.windowWidth * 0.01, this.windowHeight * .35, `Depth: ${0}`);
        this.speedText = this.add.text(this.windowWidth * 0.01, this.windowHeight * .4, `Speed: ${0}`);

        const buttonSize = 40;
        this.leftButton = this.add.text(this.windowWidth * 0.35, this.windowHeight * .93, '👈').setInteractive();
        this.leftButton.setFontSize(buttonSize);
        this.leftButton.on('pointerdown', () => { this.boat.setTurnLeft(true); this.boat.setTurnRight(false) });
        this.rightButton = this.add.text(this.windowWidth * 0.65, this.windowHeight * .93, '👉').setInteractive();
        this.rightButton.setFontSize(buttonSize);
        this.rightButton.on('pointerdown', () => { this.boat.setTurnRight(true); this.boat.setTurnLeft(false) });
        this.goStraightButton = this.add.text(this.windowWidth * 0.5, this.windowHeight * .90, '👆').setInteractive();
        this.goStraightButton.setFontSize(buttonSize);
        this.goStraightButton.on('pointerdown', () => { this.boat.setTurnRight(false); this.boat.setTurnLeft(false) });
    }

    throttleButton(text: string, x: number, y: number, throttle: number) {
        const button = this.add.text(x, y, text).setInteractive();
        button.on('pointerdown', () => this.boat.setThrottle(throttle));
        button.on('pointerover', () => button.setColor('black'));
        button.on('pointerout', () => button.setColor('white'))
    }

    update(time: number, delta: number) {
        const pos = this.boat.getPosition();
        this.positionText.setText(`Position: ${Math.floor(pos.x / this.SCALE)}, ${Math.floor(pos.y / this.SCALE)}`);
        // const position = this.boat.getPosition();
        if (pos.x && pos.y) {
            const depth = this.seaBed[Math.floor(pos.x / this.SCALE)][Math.floor(pos.y / this.SCALE)];
            this.depthText.setText(`Depth: ${depth}`);
        }
        this.speedText.setText(`Speed: ${this.boat.getSpeed()}`);
        // Update boatSprite position
        this.boatSprite.setPosition((Math.floor(pos.x / this.SCALE) * 0.8), (Math.floor(pos.y / this.SCALE) * 0.8));
        this.boatSprite.setRotation(this.boat.sprite.rotation);
    }
}

