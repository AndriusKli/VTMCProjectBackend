import React from 'react'
import { useHistory } from 'react-router';
import Axios from 'axios';
import FileSaver from 'file-saver';



function MaintenancePage() {

  let history = useHistory();

  const handleReturn = (event) => {
    event.preventDefault();
    history.goBack();
  }

  const handleProjectRetrieval = (event) => {
    event.preventDefault();
    Axios.get('http://localhost:8080/api/files/downloadProjectfile').then(response => {
      if (response.status === 200) {
        let file = new File([response.data], "projects.csv", { type: "text/csv;charset=utf-8" });
        FileSaver.saveAs(file);
      } else {
        alert("Something went wrong, try again.")
      }
    })
  }

  const handleTaskRetrieval = (event) => {
    event.preventDefault();
    Axios.get('http://localhost:8080/api/files/downloadTaskfile').then(response => {
      if (response.status === 200) {
        let file = new File([response.data], "tasks.csv", { type: "text/csv;charset=utf-8" });
        FileSaver.saveAs(file);
      } else {
        alert("Something went wrong, try again.")
      }
    })
  }

  // const handleReset = (event) => {
  //     // TODO
  // }


  return (

    <div>

      <div className="container">

        <div className="row justify-content-md-center">
          <div className="col col-md-3">
            <div className="card border">
              <div className="card-header clr-dwntaskcsv text-center">Task CSV</div>
              <span onClick={handleTaskRetrieval} className="card-body">
                <div className="text-center ">
                  <h5 className="mb-2 h5 text-nowrap ">Download</h5>
                </div>
              </span>
            </div>


          </div>
          <div className="col-md-3">
            <div className="card border">
              <div className="card-header clr-dwnprojectcsv text-center">Project CSV</div>

              <span onClick={handleProjectRetrieval} className="card-body card-body-cascade">
                <div className="text-center ">
                  <h5 className="mb-2 h5text-nowrap">Download</h5>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button onClick={handleReturn} className="btn fixed-top-rigth">Back</button>
      </div>

    </div>

  )
}

export default MaintenancePage;