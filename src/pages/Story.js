import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../scss/story/story.scss';

const Story = () => {

  useEffect(() => {
      document.querySelector('.navbar').classList.remove('isActive');
      document.querySelector('.menu__button').classList.remove('isOpen');
      document.querySelector('.menu__button').style.display = "block";
  }, [])

  return (
    <main>
      <div>
        <h1>STORY PAGE</h1>
        <div className="choice">
            <Link to='/context'><button to='/context'>Alaska</button></Link>
            <br />
            <Link to=''><button>Ile de la Réunion</button></Link>
            <br />
            <Link to=''><button>Ile Kerguelen</button></Link>
        </div>
      </div>
    </main>
  )
}
export default Story;
