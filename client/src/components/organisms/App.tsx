import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Home from './Home'
import Success from './Success'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/success">
            <Success />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App
