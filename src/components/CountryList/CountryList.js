import React, { Component } from 'react';
import './CountryList.css';



class CountryList extends Component {

    render() {
        return (
            <div className="CountryListItem" onClick={this.props.clicked}>
                <p>{this.props.name} {this.props.N}</p>

            </div>
        );
    }
}

export default CountryList;