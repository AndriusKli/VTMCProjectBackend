import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Homepage extends Component {

    render() {
        return (
            <div className="container1">

                <div className="box">
                    <h1>Project Task Management Program</h1>
                    <h3>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.<br />
                        Maecenas porttitor congue massa. </h3>
                    <Link to="/projects"><button className="btn2">Let’s start</button></Link>
                    <div><img className="responsive" id="homeImage" src={require("../images/titulinis.png")} alt="Homepage" /></div>
                </div>

            </div>
        )
    }
}
