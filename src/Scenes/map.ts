import { createNoise2D } from "simplex-noise";

export class PerlinMap {
    static #instance: PerlinMap;
    public seaBed: number[][] = [];
    public ground: number[][] = [];
    private constructor() {
        const perlin = createNoise2D(() => Phaser.Math.RND.normal());
        const length = 200;
        let height = 80;

        for (let i = 0; i < length; i++) {
            this.seaBed[i] = [];
            for (let j = 0; j < length; j++) {
                const result = perlin(i / height, j / height);
                // Map the value to 0-100
                this.seaBed[i][j] = Math.floor((result + 1) * 50);
            }
        }

        height = 100;
        for (let i = 0; i < length; i++) {
            this.ground[i] = [];
            for (let j = 0; j < length; j++) {
                const ground = perlin(i /10 , j/10 );
                this.ground[i][j] = ground;
            }
        }

    }

    public static get instance(): PerlinMap {
        if (!PerlinMap.#instance) {
            PerlinMap.#instance = new PerlinMap();
        }
        return PerlinMap.#instance;
    }
}