import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { isMobile } from 'react-device-detect';

import AssetsLoader from '../components/AssetsLoader';
import Emitter from '../components/Emitter';

import Header from '../components/Header';
import Timeline from '../components/Timeline';

import Home from './Home';
import About from './About';
import Credits from './Credits';
import EndStory from './EndStory';
import NotAvailable from './NotAvailable';

import Story from './Story';

import Chp1Context from '../scenes/Chp1Context';
import Chp1LakeHood from '../scenes/Chp1LakeHood';
import Chp1Simon from '../scenes/Chp1Simon';

import Chp2TakeOff from '../scenes/Chp2TakeOff';
import Chp2FlightFeelings from '../scenes/Chp2FlightFeelings';
import Chp2Cockpit from '../scenes/Chp2Cockpit';

import Chp3Landing from '../scenes/Chp3Landing';
import Chp3Tenakee from '../scenes/Chp3Tenakee';
import Chp3Bear from '../scenes/Chp3Bear';
import Chp3People from '../scenes/Chp3People';

// import NoMatch from './404';
// import Nuages from '../components/Nuages';

import '../scss/basic.scss';

const App = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)
  const loader = useRef();

  useEffect(() => {
    !isMobile && AssetsLoader._loadAssets()
    Emitter.on('loadingComplete', () => {
      setIsLoaded(true)
      setTimeout(() => {
        loader.current.style.transform = 'translateX(-100%)';
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }, 2000)
    })
  }, [])

  return (
    <>
      <Router>
        {isMobile ? (
          <div className="mobile">
            <p className="mobile__text">
              Votre écran n'est pas adapté pour les expériences interactives de Valiant.
              <br/>
              <br/>
              Nous vous conseillons de visiter Valiant sur un ordinateur.
            </p>
          </div>
        ) : (
          <>
          <Header />

          {isLoading && <div ref={loader} className="loader"><div className="loader__logo"></div></div>}
          {isLoaded &&
            <>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/credits" component={Credits} />
                <Route exact path="/end" component={EndStory} />
                <Route exact path="/not-available" component={NotAvailable} />

                <Route exact path="/story" component={Story} />
                <Route exact path="/context" component={Chp1Context} />
                <Route exact path="/lakehood" component={Chp1LakeHood} />
                <Route exact path="/simon" component={Chp1Simon} />
                <Route exact path="/takeoff" component={Chp2TakeOff} />
                <Route exact path="/flight-feelings" component={Chp2FlightFeelings} />
                <Route exact path="/cockpit" component={Chp2Cockpit} />
                <Route exact path="/landing" component={Chp3Landing} />
                <Route exact path="/tenakee" component={Chp3Tenakee} />
                <Route exact path="/bear" component={Chp3Bear} />
                <Route exact path="/people" component={Chp3People} />

                {/* <Route path="/*" component={NoMatch} /> */}
                {/* <Route path="/nuages" component={Nuages} /> */}
              </Switch>

              <Timeline />
            </>
          }
          </>
        )}
      </Router>
    </>
  )
};

export default App;
