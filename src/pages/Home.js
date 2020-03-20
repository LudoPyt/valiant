import React from 'react';
import { Link } from "react-router-dom";

const Home = () => (
    <main>
        <div>
            <h1>HOMEPAGE</h1>
            <div className="choice">
                <Link to='/story'><button to='/story'>Alaska</button></Link>
                <br />
                <Link to=''><button>Ile de la Réunion</button></Link>
                <br />
                <Link to=''><button>Ile Kergueken</button></Link>
            </div>
        </div>
    </main>
)

export default Home;
