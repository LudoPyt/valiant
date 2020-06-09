import React, { useEffect } from 'react';
import StoryElement from '../components/StoryElement';
import '../scss/story/story.scss';

const Story = () => {

  useEffect(() => {
      document.querySelector('.navbar').classList.remove('isActive');
      document.querySelector('.menu__button').classList.remove('isOpen');
      document.querySelector('.menu__button').style.display = "block";
  }, [])

  return (
    <main>
      <section className="story">
        <StoryElement
          title="Alaska"
          subtitle="Incarnez une pilote d'hydravion en direction de Tenakee Spring"
          duration="10"
          imgSrc="green"
          link="/context"
        />
        <StoryElement
          title="Kerguelen"
          subtitle="Marchez dans les pas des scientifiques des îles Kerguelen"
          duration="10"
          imgSrc="blue"
          link="/not-available"
        />
        <StoryElement
          title="Syrie"
          subtitle="Sillonnez le désert jusqu'au camp d'Al Roukbar"
          duration="10"
          imgSrc="orange"
          link="/not-available"
        />
        <StoryElement
          title="Norvège"
          subtitle="Naviguez aux confins des Îles Lofoten"
          duration="10"
          imgSrc="red"
          link="/not-available"
        />
      </section>
    </main>
  )
}
export default Story;
