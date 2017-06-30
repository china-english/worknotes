/**
 * Created by zhaoyu on Jun 29, 2017.
 */

import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
// import Login from './components/Login'
import Login from './containers/auth/LoginPage'

export default () => (
  <Switch>
    <Route path='/' exact component={Home} />
    <Route path='/login' component={Login} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>
)
