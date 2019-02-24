import React, {Component, Fragment} from 'react';
import './CountryApp.css';
import axios from 'axios';
import CountryList from '../../components/CountryList/CountryList';
import Country from '../../components/Country/Country';

class CountryApp extends Component {
    state = {
        countries: [],
        selectedCountryCode: null
    };

    componentDidMount() {
        axios.get('all?fields=name;alpha3Code').then(response => {
            const requests = response.data;
            return Promise.all(requests);
        }).then(countries =>
            this.setState({countries})
        ).catch(error => {
            console.log(error);
        });
    }

    countryClicked = (countryCode) => {
        this.setState({
            ...this.state,
            selectedCountryCode: countryCode
        });
    };


    render() {

        return (
            <Fragment>
                <div className='container'>
                    <div className='CountryApp row mt-4 p-3 border border-dark '>
                        <div className="CountryList col-4 border border-dark p-4">
                            {this.state.countries.map(country => (
                                <CountryList
                                    name={country.name}
                                    N={country.alpha3Code}
                                    clicked={() => this.countryClicked(country.alpha3Code)}
                                />
                            ))}
                        </div>


                        <div className='col-8 border border-dark p-4'>
                            <Country countryCode={this.state.selectedCountryCode}/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}


export default CountryApp;