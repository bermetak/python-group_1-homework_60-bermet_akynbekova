import React, {Component} from 'react';
import './Country.css';
import axios from 'axios';
import BorderContries from '../../components/BorderContries/BorderContries'
import Numeral from 'numeral';


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
                    let borderCountries = this.getBorderCountries(response.data)
                    this.setState({
                        loadedCountry: response.data,
                        borderCountries: borderCountries
                    })
                }).catch(error => {
                    console.log(error);
                });
            }
        }
    }

    getBorderCountries = (data) => {
        let borderCountry = [];
        data.borders.map(code => {
            axios.get('alpha/' + code).then(response => {
                borderCountry.push(response.data.name)
            })
        });
        return borderCountry
    };

    numToString = () => {
        let num = Numeral(this.state.loadedCountry.population).format('0.00a')
        return num
    };


    render() {
        return (
            this.state.loadedCountry ?
                <div className="Country row">
                    <div className='col'>
                        <h1>{this.state.loadedCountry.name}</h1>
                        <br/>
                        <p>Capital: {this.state.loadedCountry.capital}</p>
                        <p>Population: {this.numToString()}</p>
                        <h4>Borders with: </h4>
                        {this.state.borderCountries.map(country => (
                            <ul>
                                <BorderContries
                                    name={country}
                                />
                            </ul>
                        ))}
                    </div>
                    <div className='Flag col'>
                        <img src={this.state.loadedCountry.flag} alt=""/>
                    </div>
                    {console.log(this.state.loadedCountry)}
                    {console.log(this.state.borderCountries)}
                </div>
                : <p>Выберите страну</p>
        );
    }
}


export default Country;