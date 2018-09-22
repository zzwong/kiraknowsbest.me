import React from 'react'

const ExternalLink = props => {
  return (
    <a className='externalLink' href={props.href} target='_blank'>{props.text}</a>
  )
}

class InfoPage extends React.Component {
  render () {
    return (
      <div className='info-page'>
        <h2>Contact Info</h2>
        <div className='info-page-content'>
          <div className='spacer-small'></div>
          <ExternalLink href='https://www.linkedin.com/in/kiraknowsbest' text='LinkedIn'/>
          <div className='spacer-small'></div>
          <ExternalLink href='https://www.github.com/kiraknowsbest' text='Github'/>
          <div className='spacer-small'></div>
          <ExternalLink href='https://dmetzgerblog.wordpress.com' text='Tech Blog'/>
          <div className='spacer-small'></div>
        </div>
      </div>
    )
  }
}

export default InfoPage
