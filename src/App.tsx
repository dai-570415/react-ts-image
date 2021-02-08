import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/FirebaseAuth/PrivateRoute';
import { AuthProvider } from './components/FirebaseAuth/AuthProvider';
import Index from './pages/Index';
import SignIn from './components/FirebaseAuth/SignIn';
import SignUp from './components/FirebaseAuth/SignUp';

const title: string = 'This is title';
const description: string = 'This is description';

document.title = title;
const headData = document.head.children;
for (let i = 0; i < headData.length; i++) {
  const nameVal = headData[i].getAttribute('name');
  if (nameVal !== null) {
      if (nameVal.indexOf('description') !== -1) {
          headData[i].setAttribute('content', description);
      }
      // OGP(twitter)の設定
      if (nameVal.indexOf('twitter:title') !== -1) {
          headData[i].setAttribute('content', title);
      }
      if (nameVal.indexOf('twitter:description') !== -1) {
          headData[i].setAttribute('content', description);
      }
  }
}

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route exact path="/signin" component={ SignIn } />
          <Route exact path="/signup" component={ SignUp } />
          <PrivateRoute exact path="/" component={ Index } />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
