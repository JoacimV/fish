import { GameObjects } from "phaser";
const Image = GameObjects.Image;
export class IslandGenerator {
    private scene;
    private grass;


    public constructor(scene: Phaser.Scene) {
        this.scene = scene;
        const x = this.scene.cameras.main.centerX;
        const y = this.scene.cameras.main.centerY;
        // Create a grass tile to get the width and height
        this.grass = new Image(this.scene, x, y, 'terrain', 100);
    }


    public generateIsland(x: number, y: number, width: number, height: number): Phaser.Physics.Arcade.Image[] {
        // Combine the edges to form a island with the given width and height
        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                this.scene.physics.add.image(x + i * this.grass.width, y + j * this.grass.height, 'terrain', 100);
            }
        }
        const edges = [];
        // Add Edges      
        edges.push(this.scene.physics.add.image(x - this.grass.width, y - this.grass.height, 'terrain', 79));
        edges.push(this.scene.physics.add.image(x + this.grass.width * width, y - this.grass.height, 'terrain', 84));
        edges.push(this.scene.physics.add.image(x - this.grass.width, y + this.grass.height * height, 'terrain', 117));
        edges.push(this.scene.physics.add.image(x + this.grass.width * width, y + this.grass.height * height, 'terrain', 122));
        // Now fill in upper and lower edges
        for (let i = 0; i < width; i++) {
            edges.push(this.scene.physics.add.image(x + i * this.grass.width, y - this.grass.height, 'terrain', 80));
            edges.push(this.scene.physics.add.image(x + i * this.grass.width, y + this.grass.height * height, 'terrain', 118));
        }
        // Now fill in left and right edges
        for (let i = 0; i < height; i++) {
            edges.push(this.scene.physics.add.image(x - this.grass.width, y + i * this.grass.height, 'terrain', 98));
            edges.push(this.scene.physics.add.image(x + this.grass.width * width, y + i * this.grass.height, 'terrain', 103));
        }

        edges.forEach((edge) => {
            // Make island static
            edge.setImmovable(true);
        });

        return edges;
    }

}