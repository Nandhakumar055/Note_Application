
import { Link } from 'react-router-dom'
import './featureItem.css'

const FeatureItem = (props) => {
    const {featureItem, updateActiveFeture, isActiveFeature, onClickCloseSidebar} = props
    const {id, featureName, icon, navigationPath} = featureItem

    const onClickFeatureItem = () => {
        updateActiveFeture(featureName)
    }

    const isActiveStyle = isActiveFeature ? "active-feature" : "feature-item"

    return(
        <Link className='link' to={navigationPath} onClick={onClickCloseSidebar}>
            <li className={isActiveStyle} 
                name={featureName} 
                key={id}
                onClick={onClickFeatureItem}
            >
                {icon}
                <h5>{featureName}</h5>
            </li>
        </Link>
    )
}

export default FeatureItem