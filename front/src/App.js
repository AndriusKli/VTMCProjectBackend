import React from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import { Switch, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import { addProjects } from './actions/projects';
import Axios from 'axios';
import PageTemplate from './components/PageTemplate';
import CreateProjectForm from './components/CreateProjectForm';
import ProjectInfoPage from './components/ProjectInfoPage';
import CreateTaskForm from './components/CreateTaskForm';
import EditProjectForm from './components/EditProjectForm';
import EditTaskForm from './components/EditTaskForm';
import NotFoundPage from './components/NotFoundPage';
import MaintenancePage from './components/MaintenancePage';
import TaskboardPage from './components/TaskboardPage';

export default class App extends React.Component {

  state = {
    doneRetrieving: false
  }

  componentDidMount() {
    Axios.get(`http://localhost:8080/api/projects/full`).then(res => {
      const data = res.data;
      this.props.dispatch(addProjects(data));
      this.setState({ doneRetrieving: true })
    })

  }


  render() {
    return (
      <div>
        {this.state.doneRetrieving ?
          <Switch>

            <Route path="/" exact={true}>
              <Homepage />
            </Route>

            <Route path="/maintenance" exact={true}>
              <PageTemplate content={<MaintenancePage />} />
            </Route>

            <Route path="/projects" exact={true}>
              <FrontPage />
            </Route>

            <Route path="/projects/new" exact={true}>
              <PageTemplate content={<CreateProjectForm />} />
            </Route>

            <Route path="/projects/:id/tasks/board" exact={true}>
              <TaskboardPage />
            </Route>

            <Route path="/projects/:id" exact={true} component={ProjectInfoPage} />

            <Route path="/projects/:id/edit" exact={true} render={(props => <PageTemplate {...props} content={<EditProjectForm />} />)} />

            <Route path="/projects/:id/tasks/create" exact={true} render={(props => <PageTemplate {...props} content={<CreateTaskForm />} />)} />

            <Route path="/projects/:id/tasks/:taskid/edit" exact={true} render={(props => <PageTemplate {...props} content={<EditTaskForm />} />)} />


            <Route>
              <NotFoundPage />
            </Route>

          </Switch>
          : null}
      </div >
    )
  }
}


