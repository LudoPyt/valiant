import React from 'react';
import { Link } from 'react-router-dom';

const Story = () => (
  <main>
    <div>
      <h1>STORY PAGE</h1>
      <Link to="/simon">
        <button>Commencer l'histoire</button>
      </Link>
    </div>
  </main>
);

export default Story;
