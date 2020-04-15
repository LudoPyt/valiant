import React from 'react';
import ThreeScene from './ThreeScene'


class Alaska3 extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
  }

  componentDidMount() {
    this.handleLoad();
  }

  componentDidUpdate() {
    this.handleLoad();
  }

  componentWillUnmount() {
    this.threeScene.destroyRaf()
  }

  handleLoad() {
    const canvas = this.refs.canvas
    const video = this.refs.video
    this.threeScene = new ThreeScene(canvas, video)
  }

  render() {
    return (
      <>
        <video id="video" ref="video"></video>
        <canvas id='canvas' ref="canvas"></canvas>
        <h2>Use arrows</h2>
      </>
  )
  }
}

export default Alaska3;
