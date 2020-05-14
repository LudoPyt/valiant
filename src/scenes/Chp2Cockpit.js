import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import CockpitScene from '../components/CockpitScene';

const Chp2Cockpit = () => {

  const history = useHistory();
  const canvas = useRef(null);
  const video = useRef(null);

  useEffect(() => {
      const threeScene = new CockpitScene(canvas.current, video.current);
      document.getElementById('btn').addEventListener('click', () => {history.push('/landing');});

      return () => {
          threeScene.destroyRaf();
      }
  }, [history])

  return (
      <>
          <video className="video" ref={video}></video>
          <canvas ref={canvas}></canvas>
          <h2>Use arrows</h2>
          <button id="btn" className="skip">Skip ></button>
      </>
  )
}

export default Chp2Cockpit;