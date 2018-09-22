import React from 'react'
import MusicInterface from '../stepSequencer/MusicInterface'

class MusicPage extends React.Component {
  render () {
    return <MusicInterface open={this.props.open}/>
  }
}

export default MusicPage
