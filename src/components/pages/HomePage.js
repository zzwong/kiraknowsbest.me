import React from 'react'

class HomePage extends React.Component {
  render () {
    return (
      <div className="homepage">
        <h2>About me</h2>
        <div className='homepage-blurb'>
          <div className='blurb-content'>
            <p className='mb-30'>
              I am a software engineer currently working
              in Silicon Valley. I enjoy using my creativity
              to make things fun and interesting. I am highly
              interested in front-end technologies that solve
              problems, like Redux for state management and
              Babel for compiling. My favorite front-end library
              is React.
            </p>
            <p>
              I like playing games (mostly LoL and Pokémon),
              listening to music, spending time with family,
              and learning new things. I enjoy watching streams
              on Twitch and my favorite shows on Netflix.
            </p>
          </div>
        </div>
        <div className='homepage-skills'>
          <p className='header'>Technical Skills</p>
          <p className='list-item'>JavaScript, React, HTML</p>
          <p className='list-item'>CSS, Meteor, Express, Redux, Node, jQuery</p>
          <p className='list-item'>Underscore, Jest, Mocha/Chai, Mongo</p>
          <p className='list-item'>MySQL, Postgres</p>
          <p className='header'>Other Skills</p>
          <p className='list-item'><div className='bullet'></div>Memorizing lots of puns</p>
          <p className='list-item'><div className='bullet'></div>Dance Dance Revolution</p>
          <p className='list-item'><div className='bullet'></div>Eating really fast</p>
        </div>
      </div>
    )
  }
}

export default HomePage
