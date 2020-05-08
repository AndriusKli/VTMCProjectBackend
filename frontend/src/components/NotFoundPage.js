import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div className="container" id="page404">
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">404</span>
                            <div className="mb-4 lead">The page you are looking for was not found</div>
                            <Link to="/"> <span className="btn btn-link" style={{"text-decoration": "none"}}>Back to Home</span> </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage;