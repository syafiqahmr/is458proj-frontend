import { HashRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home";
import Create from "./Components/Create";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Create" component={Create} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
