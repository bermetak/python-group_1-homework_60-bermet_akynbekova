import React, {Component} from 'react';
import './BorderContries.css';



class BorderContries extends Component {

    render() {
        return (
            <li>
                {this.props.name}
            </li>
        )
    }
}

export default BorderContries;