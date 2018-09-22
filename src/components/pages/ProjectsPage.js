import React from 'react'
import Main from '../projects/VideoLooper/Main'

class ProjectsPage extends React.Component {
  state = {
    project: null
  }

  selectProject = e => {
    this.setState({
      project: e.target.dataset.name
    })
  }

  renderProject = () => {
    if (this.state.project === 'video-looper') return (
      <div className='projects-page-content'>
        <Main/>
      </div>
    )
  }

  render () {
    return (
      <div className='projects-page'>
        <h2>Projects</h2>
        {this.state.project
          ? this.renderProject()
          : (
            <div className='projects-page-content'>

            {/*
              https://kiraknowsbest.github.io/Reddit-Reader/
              https://kiraknowsbest.github.io/day-calendar/
            */}
              <div className='spacer-small'></div>
              <div onClick={this.selectProject} data-name='video-looper' className='project-option'>Video Looper</div>
              <div className='spacer-small'></div>
            </div>
          )
        }
      </div>
    )
  }
}

export default ProjectsPage
