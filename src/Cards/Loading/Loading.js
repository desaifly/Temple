import * as React from 'react';
import icoLoading from '../../Resources/Images/loading.svg'

class Loading extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <div className="loading">
            // <div className="loading-bar"></div>
            // <div className="loading-bar"></div>
            // <div className="loading-bar"></div>
            // <div className="loading-bar"></div>
            // </div>
            <img src={icoLoading} className="img-fluid" />
        )

    }

}
export default Loading