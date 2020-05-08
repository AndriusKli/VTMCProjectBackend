import React from 'react'
import { useHistory } from 'react-router';
import Axios from 'axios';

function MaintenancePage() {

    let history = useHistory();

    const handleReturn = (event) => {
        history.goBack();
    }

    const handleProjectRetrieval = (even) => {
        // TODO
    }

    const handleTaskRetrieval = (even) => {
        // TODO
    }
    
    const handleReset = (even) => {
        // TODO
    }


    return (
        <div>Replace this with proper HTML</div>
    )
}

export default MaintenancePage;