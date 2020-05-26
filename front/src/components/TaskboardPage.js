import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectTasks from '../selectors/tasks';
import BoardCard from './BoardCard';

function TaskboardPage() {

    let history = useHistory();
    let params = useParams();

    const project = useSelector(state => state.projects.find(({ projectId }) => projectId === parseInt(params.id)));

    const notStartedTasks = selectTasks(project.tasks, { "searchBy": '', "filterStatusBy": "NOT_STARTED" });
    const inProgressTasks = selectTasks(project.tasks, { "searchBy": '', "filterStatusBy": "IN_PROGRESS" });
    const completeCanceledTasks = selectTasks(project.tasks, { "searchBy": '', "filterStatusBy": "COMPLETE" }).concat(selectTasks(project.tasks, { "searchBy": '', "filterStatusBy": "CANCELED" }));

    const handleClose = (event) => {
        history.push(`/projects/${params.id}`)
    }

    function topFunction() {
        window.scrollTo(0, 0);
    }

    function scrollFunction() {
        let mybutton = document.getElementById("upBtn");
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
          mybutton.style.display = "block";
        } else {
          mybutton.style.display = "none";
        }
      }
    
    useEffect(() => {
        window.addEventListener('scroll', scrollFunction);

        return function cleanup() {
            window.removeEventListener('scroll', scrollFunction);
        }
    },[])

    return (
        <div className="container" id="pageHeader">

            <header className="text-center text-light my-4">
                <nav className="navbar navbar-expand navbar-light">
                    <div className="collapse navbar-collapse" id="left">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to={'/'}><div className="btn"><i className="fa fa-home"></i></div></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to={'/maintenance'}><button className="btn"><i className="fa fa-bars"></i></button></Link>
                            </li>
                        </ul>
                    </div>

                    <div className="collapse navbar-collapse" id="right">
                        <ul className="nav navbar-nav ml-auto">
                            <li className="nav-item">
                                <span className="nav-link" onClick={handleClose}>CLOSE</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>

            <div className="row" >
                {/* <!-- start of NOT STARTED--> */}
                <div className="col-md mb-3 mb-md-0">

                    <div className="card border-bottom-0">
                        <div className="card-header clr-notstarted text-center shadow-lg">NOT STARTED</div>
                    </div>
                    <br />

                    <div className="list-group">
                        {notStartedTasks.map(task =>
                            <BoardCard
                                key={task.taskId}
                                name={task.taskName}
                                description={task.taskDescription}
                                deadline={new Date(task.taskDeadline).toLocaleString('lt-LT')} />
                        )}
                    </div>

                </div>

                {/* <!-- start  of IN PROGRESS --> */}
                <div className="col-md mb-3 mb-md-0">

                    {/* <!-- colored header part --> */}
                    <div className="card border-bottom-0">
                        <div className="card-header clr-progress text-center shadow-lg">IN PROGRESS</div>
                    </div>
                    <br />

                    <div className="list-group">

                        <div className="list-group">
                            {inProgressTasks.map(task =>
                                <BoardCard
                                    key={task.taskId}
                                    name={task.taskName}
                                    description={task.taskDescription}
                                    deadline={new Date(task.taskDeadline).toLocaleString('lt-LT')} />
                            )}                          
                        </div>

                    </div>
                </div>

                {/* Complete/canceled tasks */}
                <div className="col-md mb-3 mb-md-0">

                    <div className="card border-top">
                        <div className="card-header clr-complete text-center shadow-lg">COMPLETE / CANCELED</div>
                    </div>
                    <br />


                    <div className="list-group">

                        <div className="list-group">
                            {completeCanceledTasks.map(task =>
                                <BoardCard
                                    key={task.taskId}
                                    name={task.taskName}
                                    description={task.taskDescription}
                                    deadline={new Date(task.taskDeadline).toLocaleString('lt-LT')} />
                            )}
                        </div>

                    </div>
                </div>
            </div>


            {/* <!-- the button --> */}
            <button onClick={topFunction} id="upBtn" title="Go to top">

                <a href="#!" className="btn-floating btn-large ">
                    <i className="fa fa-arrow-up fa-lg"></i></a>

            </button>


            {/* <!-- button script  --> */}
            {/* <script>
    
          let mybutton = document.getElementById("upBtn");
    
          window.onscroll = function () { scrollFunction() };
    
          function scrollFunction() {
            if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
              mybutton.style.display = "block";
            } else {
              mybutton.style.display = "none";
            }
          }
    
          function topFunction() {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
          }
        </script> */}

            <br />
        </div>
    )
}

export default TaskboardPage;