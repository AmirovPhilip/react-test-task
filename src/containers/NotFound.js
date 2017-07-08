import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NotFound extends Component{
    render(){

        return (
            <div className="container not-found-page">
                Sorry, this page is not found.
            </div>
        );
    }
}