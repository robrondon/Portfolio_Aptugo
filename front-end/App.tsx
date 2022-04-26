import React from 'react'
import { Route, Switch } from 'react-router-dom'

const SkillSets = React.lazy(() => import('./Pages/SkillSets'))
const Skills = React.lazy(() => import('./Pages/Skills'))
const Projects = React.lazy(() => import('./Pages/Projects'))
const Dashboard = React.lazy(() => import('./Pages/dashboard'))

const App: React.FunctionComponent = (props: any) => {
  const routes = [
    {
      path: '/SkillSets',
      name: 'SkillSets',
      component: SkillSets,
    },
    {
      path: '/Skills',
      name: 'Skills',
      component: Skills,
    },
    {
      path: '/Projects',
      name: 'Projects',
      component: Projects,
    },
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
