import React, { useEffect } from 'react';
import StoryElement from '../components/StoryElement';
import { data } from "../data/data";
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
        {
          data.map(elem => (
            <StoryElement key={elem.title} data={elem} />
          ))
        }
      </section>
    </main>
  )
}
export default Story;
