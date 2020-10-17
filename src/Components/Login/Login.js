import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginCreate from './LoginCreate'
import LoginForm from './LoginForm'
import LoginPasswordReset from './LoginPasswordReset'
import LoginPasswordLost from './LoginPasswordLost'

const Login = () => {
  return (
    <div>
      <Switch>
        <Route path="/login/criar">
          <LoginCreate />
        </Route>
        <Route path="/login/perdeu">
          <LoginPasswordLost />
        </Route>
        <Route path="/login/resetar">
          <LoginPasswordReset />
        </Route>
        <Route path="/">
          <LoginForm />
        </Route>
      </Switch>
    </div>
  )
}

export default Login
