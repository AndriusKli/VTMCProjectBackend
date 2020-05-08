import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import storeConfig from './store/storeConfig';
import { Provider } from 'react-redux';
// import stateStore from './stateStore/reducerAndStore'
// import { addProjects } from './actions/projects';
// import { filterBySearch } from './actions/filters';
// import { filterStatusBy } from './actions/filters'
// import { addTasks } from './actions/projects';

const store = storeConfig();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App dispatch={store.dispatch}/>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
