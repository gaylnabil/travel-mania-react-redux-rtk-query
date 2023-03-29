import React, { FC } from "react";
import { Provider } from "react-redux";
import "./App.css";
import AddDestination from "./components/AddDestination";
import DestinationList from "./components/DestinationList";
import Header from "./layout/Header";
import { store } from "./redux/store";
const App: FC = () => {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <div className="container mt-5">
          <div className="text-white-50">
            <h1 className="text-center">Travel Mania</h1>
            <AddDestination />
            <div>
              <DestinationList />
            </div>
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default App;
