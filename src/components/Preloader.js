import React, { Component } from 'react';
import Loader from '../three-dots.svg';

class Preloader extends Component {
    render() {
        return (
            <div className="loader">
                <img src={Loader} alt=""/>
            </div>
        );
    }
}

export default Preloader;