import React from 'react';
import CockpitScene from './CockpitScene'


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
    this.threeScene = new CockpitScene(canvas, video)
  }

  render() {
    return (
      <>
        <video  className="video" ref="video"></video>
        <canvas ref="canvas"></canvas>
        <h2>Use arrows</h2>
      </>
  )
  }
}

export default Alaska3;
