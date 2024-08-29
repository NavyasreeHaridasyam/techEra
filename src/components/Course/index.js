import {Link} from 'react-router-dom'
import './index.css'

const Course = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`}>
      <li className="course-container">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default Course
