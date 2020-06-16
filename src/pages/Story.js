import React, { useEffect } from 'react';
import StoryElement from '../components/storiesComponents/StoryElement';
import { data } from "../datas/datasStories";
import '../scss/pages/story.scss';

import { Context } from '../components/Provider';

const Story = () => {

  const context = React.useContext(Context);

  const ambiantSound = 0;
  useEffect(() => {
    if (context.state.ambiantSound !== ambiantSound) {
        context.dispatch({type: 'setAmbiantSound', ambiantSound});
    }
}, [context]);

  useEffect(() => {
      document.querySelector('.navbar').classList.remove('isActive');
      document.querySelector('.menu__button').classList.remove('isOpen');
      document.querySelector('.menu__button').style.display = "block";
      document.querySelector('.header__logo').style.display = "block";
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
