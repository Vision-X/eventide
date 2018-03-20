/**
 * @fileoverview
 * This is our main A-Frame application.
 * It defines the main A-Frame Scene which gets mounted root div.
 */

import { h, Component } from 'preact';
import { Entity, Scene } from 'aframe-react';
import { Shape } from './components/Shape';

const COLORS = ['#D92B6A', '#9564F2', '#FFCF59']

class Main extends Component {
  constructor() {
    super()
    this.state = {
      colorIndex: 0,
      spherePosition: { x: 0.0, y: 4, z: -10.0 }

    }
    this._handleClick = this._handleClick.bind(this);
  }

  render() {
    return (
      <Scene
        effects="bloom, film, fxaa"
        fxaa
        bloom={{
          radius: 0.99
        }}
        film={{
          sIntensity: 0.15,
          nIntensity: 0.25
        }}
        environment={{
          preset: 'starry',
          seed: 1,
          lightPosition: { x: 200.0, y: 30.0, z: -50.0 },
          fog: 0.8,
          ground: 'canyon',
          groundYScale: 5.0,
          groundTexture: 'walkernoise',
          groundColor: '#755b5c',
          grid: 'none'
        }}
      >
        <Entity
          primitive="a-light"
          type="directional"
          color="#FFF"
          intensity={1}
          position={{ x: 2.5, y: 0.0, z: 0.0 }}
          animation__oscillate={{
            property: 'position',
            dur: 2000,
            dir: 'alternate',
            easing: 'linear',
            loop: true,
            from: { x: 2.5, y: 0.0, z: 0.0 },
            to: { x: 3.0, y: 0.25, z: 0.0 }
          }}
        />
        <Shape onClick={this._handleClick}/>
        { /*
        <Entity
          class="clickable"
          lowpoly={{
            color: COLORS[this.state.colorIndex],
            nodes: true,
            opacity: 0.15,
            wireframe: false
          }}
          primitive="a-cylinder"
          detail={2}
          events={{
            click: this._handleClick.bind(this)
          }}
          radius={1}
          position={this.state.spherePosition}
          color="#FAFAF1"
          animation__rotate={{
            property: 'rotation',
            dur: 6000,
            easing: 'linear',
            loop: true,
            to: { x: 0, y: 360, z: 0 }
          }}
          animation__oscillate={{
            property: 'position',
            dur: 2000,
            dir: 'alternate',
            easing: 'linear',
            loop: true,
            from: this.state.spherePosition,
            to: {
              x: this.state.spherePosition.x -.25,
              y: this.state.spherePosition.y + 1.25,
              z: this.state.spherePosition.z + .25
            }
          }}
        /> */}

      {/*  <a-entity class="clickable" onClick={this._handleClick.bind(this)}
          geometry="primitive: box"
          position="-2 0.5 -3"
          rotation="0 45 0"
          material="color: #4CC3D9" /> */}

      {/*  <a-entity
          geometry="primitive: sphere; radius: 1.25;"
          position=".5 0 -3"
          material="color: #EF2D5E" /> */}

        <a-entity class="clickable" onClick={this._handleClick.bind(this)}
          geometry="primitive: cylinder; radius: 0.5, height: 1.5"
          position="0.5 0.75 -2"
          material="color: #FFC65D" />

      { /*  <a-entity
          geometry="primitive: plane; width: 4; height: 4"
          position="0 0 -4"
          rotation="-90 0 0"
          material="color: #7BC8A4" />  */}

        <Entity primitive="a-camera" look-controls>
          <Entity
            primitive="a-cursor"
            cursor={{ fuse: false }}
            material={{ color: 'white', shader: 'flat', opacity: 0.75 }}
            geometry={{ radiusInner: 0.005, radiusOuter: 0.007 }}
            event-set__1={{
              _event: 'mouseenter',
              scale: { x: 1.4, y: 1.4, z: 1.4 }
            }}
            event-set__2={{
              _event: 'mouseleave',
              scale: { x: 1, y: 1, z: 1 }
            }}
            raycaster={{
              objects: '.clickable'
            }}
          />
        </Entity>
      </Scene>
    )
  }

  _handleClick() {
    console.log("clicked");
    console.log(event.target);
    this.setState({
      colorIndex: (this.state.colorIndex + 1) % COLORS.length
    })
  }
}

export default Main
