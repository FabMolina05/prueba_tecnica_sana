import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../styles/spinner.css"

export default function LoadingSpinner() {

    return (
        <div className='spinner-container'>
            <FontAwesomeIcon
                icon={'circle-notch'}
                size={'4x'}
                className="spinning"
            />
        </div>

    )

}