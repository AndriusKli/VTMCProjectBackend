import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Homepage extends Component {

    render() {
        return (
            <div className="container1">

                <div className="box">
                    <h1>Project and task management app</h1>
                    <h3> A student project by Andrius Kliunka, Renaldas Siautilas and Tomas Putramentas<br />
                        Check the code out <a href="https://github.com/AndriusKli/VTMCProjectBackend/tree/TestBranch">HERE </a> </h3>
                    <Link to="/projects"><button className="btn2">Let’s start</button></Link>
                    <div><img className="responsive" id="homeImage" src={require("../images/titulinis.png")} alt="Homepage" /></div>
                </div>

            </div>
        )
    }
}
