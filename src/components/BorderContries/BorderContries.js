import React, {Component} from 'react';
import './BorderContries.css';



class BorderContries extends Component {

    render() {

        return (
            <h5>
                {this.props.name}
            </h5>
        )
            ;
    }
}

export default BorderContries;