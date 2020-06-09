import React from 'react';
import './App.css';
import FrontPage from './components/FrontPage';
import { Switch, Route } from "react-router-dom";
import Homepage from './components/Homepage';
import { addProjects } from './actions/projects';
import Axios from 'axios';
import PageTemplate from './components/PageTemplate';
import ProjectInfoPage from './components/ProjectInfoPage';
import ProjectEditAndCreateForm from './components/ProjectEditAndCreateForm';
import TaskEditAndCreateForm from './components/TaskEditAndCreateForm';
import NotFoundPage from './components/NotFoundPage';
import MaintenancePage from './components/MaintenancePage';
import TaskboardPage from './components/TaskboardPage';

export default class App extends React.Component {

  state = {
    doneRetrieving: false
  }

  componentDidMount() {
    Axios.get(`/api/projects/full`).then(res => {
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
              <PageTemplate content={<ProjectEditAndCreateForm />} />
            </Route>

            <Route path="/projects/:id([0-9]+)/tasks/board" exact={true}>
              <TaskboardPage />
            </Route>

            <Route path="/projects/:id([0-9]+)" exact={true} >
              <ProjectInfoPage />
            </Route>

            <Route path="/projects/:id([0-9]+)/edit" exact={true} render={(props => <PageTemplate {...props} content={<ProjectEditAndCreateForm />} />)} />

            <Route path="/projects/:id([0-9]+)/tasks/create" exact={true} render={(props => <PageTemplate {...props} content={<TaskEditAndCreateForm />} />)} />

            <Route path="/projects/:id([0-9]+)/tasks/:taskid([0-9]+)/edit" exact={true} render={(props => <PageTemplate {...props} content={<TaskEditAndCreateForm />} />)} />


            <Route>
              <NotFoundPage />
            </Route>

          </Switch>
          : null}
      </div >
    )
  }
}


