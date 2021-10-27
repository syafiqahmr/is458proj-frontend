import { HashRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Components/Home";
import Status from "./Components/Status";
import Location from "./Components/Location";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/status" component={Status} />
          <Route exact path="/location" component={Location} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
