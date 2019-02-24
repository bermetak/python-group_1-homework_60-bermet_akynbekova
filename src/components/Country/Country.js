import React, {Component} from 'react';
import './Country.css';
import axios from 'axios';


class Country extends Component {

    state = {
        loadedCountry: null,
        borderCountries: []
    };

    componentDidUpdate() {
        const loadedCountry = this.state.loadedCountry;
        const countryCode = this.props.countryCode;


        if (countryCode) {
            if (!loadedCountry || countryCode !== loadedCountry.alpha3Code) {

                axios.get('alpha/' + countryCode).then(response => {
                    this.setState({loadedCountry: response.data})
                    let borderCountry = []
                    this.state.loadedCountry.borders.map(code => {
                        axios.get('alpha/' + code).then(response => {
                            borderCountry.push(response.data.name)})
                        })
                    console.log(borderCountry)
                    this.setState({...this.state, borderCountries: borderCountry})
                    })



                .catch(error => {
                    console.log(error);
                });
            }

        }


    }


    render() {
        return (
            this.state.loadedCountry ? <div className="Country">
                <h1>{this.state.loadedCountry.name}</h1>
                <br/>
                <p>Capital: {this.state.loadedCountry.capital}</p>
                <p>Population: {this.state.loadedCountry.population}</p>
                <h4>Borders with: </h4>
                {this.state.borderCountries.map(country =>
                <p>{country}</p>
                    )}
                {console.log(this.state)}
            </div> : "Выберите страну"
        );
    }
}


export default Country;