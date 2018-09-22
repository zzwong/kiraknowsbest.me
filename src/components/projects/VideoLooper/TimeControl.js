import React from 'react'

class TimeControl extends React.Component {
  state = {
    currentlyDragging: false
  }

  handleMouseDown = () => {
    this.setState({
      currentlyDragging: true
    })
  }

  handleMouseMove = (e, selection) => {
    let val = e.pageX - 15;
    if (this.state.currentlyDragging) {
      if (val < 85) val = 85;
      if (val > 642) val = 642;
      this.props.changeHandler(selection, val);
    }
  }

  handleMouseUp = () => {
    this.setState({
      currentlyDragging: false
    })
  }

  render () {
    return (
      <div className='looper-controls'>
        <div
          className="looper-selector-wrapper"
        >
          <div
            onMouseMove={e => this.handleMouseMove(e, 'start')}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            className="looper-thumb"
            style={{left: `${this.props.start}px`}}
          />
          <div
            onMouseMove={e => this.handleMouseMove(e, 'end')}
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
            className="looper-thumb"
            style={{left: `${this.props.end}px`}}
          />
          <div
            className="looper-selection"
            style={{left: `${this.props.start + 15}px`, width: `${(this.props.end - this.props.start)}px`}}
          />
        </div>
      </div>
    )
  }
}

export default TimeControl
