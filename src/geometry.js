import THREE from 'three';

export class DiceBase extends THREE.BufferGeometry {
    constructor(vertices, indices, size) {
        super();

        const scaled = vertices.map((v) => v * size);
        const positions = indices.map((index) =>
                scaled.slice(index * 3, index * 3 + 3)
            )
            .reduce((result, position) => result.concat(position), []);

        this.addAttribute(
            'position',
            new THREE.BufferAttribute(new Float32Array(positions), 3)
        );

        this.computeVertexNormals();
    }
}

export class Dice4 extends DiceBase {
    constructor(size) {
        super([
            1,1,1,
            1,-1,-1,
            -1,1,-1,
            -1,-1,1,
        ], [
            0, 1, 2,
            0, 3, 1,
            1, 3, 2,
            2, 3, 0,
        ], size / 2);
    }
}

export class Dice6 extends THREE.BoxGeometry {
    constructor(size) {
        super(size, size, size);
    }
}

export class Dice8 extends DiceBase {
    constructor(size) {
        super([
             1,  0,  0, // 0:Right
            -1,  0,  0, // 1:Left
             0,  1,  0, // 2:Top
             0, -1,  0, // 3:Bottom
             0,  0,  1, // 4:Front
             0,  0, -1, // 5:Back
        ], [
            0, 2, 4,
            0, 4, 3,
            0, 5, 2,
            0, 3, 5,
            1, 4, 2,
            1, 3, 4,
            1, 2, 5,
            1, 5, 3,
        ], size / 1.5);
    }
}

export class Dice10 extends DiceBase {
    constructor(size) {
        const sp = 0.1;
        const upper = [];
        const lower = [];
        for (let i = 0; i < 5; i++) {
            const ru = i * Math.PI * 2 / 5;
            upper.push(Math.sin(ru), sp, Math.cos(ru));

            const rl = (i + 0.5) * Math.PI * 2 / 5;
            lower.push(Math.sin(rl), -sp, Math.cos(rl));
        }

        const faces = [];
        for (let i = 0; i < 5; i++) {
            faces.push(10, i, (i + 1) % 5);
            faces.push(i, i + 5, (i + 1) % 5);
            faces.push(i + 5, 11, (i + 1) % 5 + 5);
            faces.push(i + 5, (i + 1) % 5 + 5, (i + 1) % 5);
        }

        super([
            ...upper, // 0...4
            ...lower, // 5...9
            0,  1,  0, // 10:t
            0, -1,  0, // 11:b
        ], faces, size / 1.8);
    }
}
