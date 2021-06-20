import React from 'react'
import './index.css'
import PWAFooter from './pwafooter'

export default class Pwa extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }
    
    render() {
        return (
            <div>
                <h1>Welkom op de mobiele app</h1>
                <PWAFooter />
            </div>
        )
    }
}