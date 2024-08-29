import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getCoursesList()
  }

  getCoursesList = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const fetchedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))
      this.setState({
        coursesList: fetchedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCoursesListView = () => {
    const {coursesList} = this.state

    return (
      <ul className="list-items">
        {coursesList.map(each => (
          <Course key={each.id} courseDetails={each} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getCoursesList}
      >
        Retry
      </button>
    </div>
  )

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCoursesListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Header />
        <h1 className="main-heading">Courses</h1>
        {this.renderResult()}
      </div>
    )
  }
}

export default Home
