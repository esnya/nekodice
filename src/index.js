import THREE from 'three';

export class Nekodice {
    constructor() {
        const scene = this.scene = new THREE.Scene();

        const camera = this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;

        const geometry = new THREE.BoxGeometry( 200, 200, 200 );
        const material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

        const mesh = this.mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const renderer = this.renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.mesh.rotation.x += 0.01;
        this.mesh.rotation.y += 0.02;

        this.renderer.render(this.scene, this.camera);
    }
}
