import React from 'react'
import { Route, Switch } from 'react-router-dom'

const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
  ]

  const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        return <Route exact path={prop.path} component={prop.component} key={key} />
      })}
    </Switch>
  )

  return (
    <React.Fragment>
      <React.Suspense fallback={<span>Loading</span>}>
        <React.Fragment>{switchRoutes}</React.Fragment>
      </React.Suspense>
    </React.Fragment>
  )
}

export default App
