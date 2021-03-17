import './App.css';

//packages
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './Redux';


//components
import Navbar from './components/navbar/Navbar';
import Header from './components/general/header/Header';
import Footer from './components/general/footer/Footer';
import Archive from './components/items/Archive';
import Delivery from './components/items/Delivery';
import Store from './components/stores/Store';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Header />
          <Switch>
            <Route path="/by-item/archive" exact component={Archive} />
            <Route path="/by-item/delivery" exact component={Delivery} />
            <Route path="/by-store" exact component={Store} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
