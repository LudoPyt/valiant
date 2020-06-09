import React from 'react';
import { Link } from 'react-router-dom';

import '../scss/story/story.scss';

const Story = () => (
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
);

export default Story;
