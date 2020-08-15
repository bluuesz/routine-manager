import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Routes';

import SignIn from '../pages/SignIn';
import Main from '../pages/Main';
import TasksComplete from '../pages/TaskComplete';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    {/* <Route path="/register" exact component={SignUp} /> */}
    <Route path="/main" exact component={Main} isPrivate />
    <Route path="/completedTasks" exact component={TasksComplete} isPrivate />
  </Switch>
);

export default Routes;
