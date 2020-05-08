import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PageTemplate extends Component {
    render() {
        return (
            <div className="container" id="pageHeader">

                <header className="text-center text-light my-4">
                    <nav className="navbar navbar-expand navbar-light">
                        <div className="collapse navbar-collapse" id="left">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link to="/"><div className="btn"><i className="fa fa-home"></i></div></Link>
                                </li>
                                <li className="nav-item active">
                                    <Link to="/maintenance"><button className="btn"><i className="fa fa-bars"></i></button></Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>

                {this.props.content}

                <br />
            </div>
        )
    }
}
