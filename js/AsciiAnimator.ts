import * as THREE from 'three';

import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
export default class AsciiAnimator {

  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly raycaster: THREE.Raycaster;
  private readonly effect: THREE.Effect;
  private controls: THREE.TrackballControls;

  private sphere: THREE.Mesh;
  private plane: THREE.Mesh;

  private start: number = Date.now();

  constructor() {

    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    this.camera.position.y = 150;
    this.camera.position.z = 500;


    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0, 0, 0 );


    this.raycaster = new THREE.Raycaster();

    this.effect = new AsciiEffect( this.renderer, ' .:-+*=%@#', { invert: true } );
    this.effect .setSize( window.innerWidth, window.innerHeight );
    this.effect .domElement.style.color = 'white';
    this.effect .domElement.style.backgroundColor = 'black';

    this.onWindowResize();
    this.init();

  }


  private init() {


    const pointLight1 = new THREE.PointLight( 0xffffff );
    pointLight1.position.set( 500, 500, 500 );
    this.scene.add( pointLight1 );

    const pointLight2 = new THREE.PointLight( 0xffffff, 0.25 );
    pointLight2.position.set( - 500, - 500, - 500 );
    this.scene.add( pointLight2 );



    this.sphere = new THREE.Mesh( new THREE.SphereGeometry( 200, 20, 10 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
    this.scene.add( this.sphere );


    this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 400, 400 ), new THREE.MeshBasicMaterial( { color: 0xe0e0e0 } ) );
    this.plane.position.y = - 200;
    this.plane.rotation.x = - Math.PI / 2;
    this.scene.add( this.plane );


    document.body.appendChild( this.effect.domElement );

    this.controls = new TrackballControls( this.camera, this.effect.domElement );

    window.addEventListener( 'resize', this.onWindowResize.bind(this) );

    this.animate();

  }


  private animate(): void {
    requestAnimationFrame( this.animate.bind(this) );
    this.render();
  }


  private onWindowResize() {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.effect.setSize( window.innerWidth, window.innerHeight );

  }


  private render() {

    const timer = Date.now() - this.start;

    this.sphere.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
    this.sphere.rotation.x = timer * 0.0003;
    this.sphere.rotation.z = timer * 0.0002;

    this.controls.update();

    this.effect.render( this.scene, this.camera );

  }


}

