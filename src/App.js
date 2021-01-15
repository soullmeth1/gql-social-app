import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProviderApollo from './ApolloProvider';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { Container } from 'semantic-ui-react';
import MenuBar from './components/MenuBar';
import Post from './pages/Post';
import Register from './pages/Register';
import { WrapAuthContext } from './context/authContext';
import AuthRoute from './utils/AuthRoute';

function App() {
  return (
    <ProviderApollo>
      <WrapAuthContext>
        <Router>
          <Container>
            <MenuBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/login" component={Login} />
              <AuthRoute path="/register" component={Register} />
              <Route path="/posts/:id" component={Post} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </Router>
      </WrapAuthContext>
    </ProviderApollo>
  );
}

export default App;
