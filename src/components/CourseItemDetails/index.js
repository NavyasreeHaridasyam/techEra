import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'IN_PROGRESS',
}

class CourseItemDetails extends Component {
  state = {courseData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getEachCourseDetails()
  }

  getEachCourseDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)

    if (response.ok === true) {
      const data = await response.json()

      const fetchData = {
        id: data.course_details.id,
        name: data.course_details.name,
        imageUrl: data.course_details.image_url,
        description: data.course_details.description,
      }
      this.setState({
        courseData: fetchData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
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
        onClick={this.getEachCourseDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCourseDataView = () => {
    const {courseData} = this.state
    const {imageUrl, name, description} = courseData

    return (
      <div>
        <div className="container">
          <img src={imageUrl} alt={name} className="course-image" />
          <div className="data-container">
            <h1 className="title">{name}</h1>
            <p className="description">{description}</p>
          </div>
        </div>
      </div>
    )
  }

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseDataView()
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
      <div className="course-data-container">
        <Header />
        {this.renderResult()}
      </div>
    )
  }
}

export default CourseItemDetails
