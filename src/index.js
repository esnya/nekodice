import THREE from 'three';
import * as Dice from './geometry';

class Nekodice {
    constructor() {
        const scene = this.scene = new THREE.Scene();

        const camera = this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            1,
            10000
        );
        camera.position.z = 1000;

        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add(light);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(0, 1, 1);
        scene.add(directionalLight);
        //const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        const material = new THREE.MeshLambertMaterial({color: 0x2194ce});

        const meshes = this.meshes = [4, 6, 8, 10].map((faces, i) => {
            const geometry = new Dice[`Dice${faces}`](300);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.x = (i - 1.5) * 400;

            return mesh;
        });
        meshes.forEach((mesh) => scene.add(mesh));

        const renderer = this.renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(renderer.domElement);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.meshes.forEach((mesh) => {
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.02;
        });

        this.renderer.render(this.scene, this.camera);
    }
}
module.exports = Nekodice;
