import React, { useEffect, Dispatch } from "react";
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IProduct } from "./interfaces/IProduct";
import { IInitialState, productsError, allProducts } from "./actions/ProductActions";
import DisplayErrors from "./components/DisplayErrors/DisplayErrors";

//create an interface to get the data out that we need from the Store
interface CurrentProp {
  data: any,
  hasError: boolean,
  errorMessage: string,
  isLoading: boolean
}

function App() {
  //get data out of the store and map it to the currentprop using the useSelector hook
  const content = useSelector<IInitialState, CurrentProp>((state: IInitialState) => {
    return {
      data: state.data,
      errorMessage: state.errorMessage,
      hasError: state.hasError,
      isLoading: state.isLoading
    }
  });

  //initialize dispatch hook and is use to trigger actions 
  const dispatch = useDispatch()

  function getData() {
    //using redux-thunk pattern to dispatch typescript action that will make the api call
    return (dispatch: Dispatch<any>) => {
      axios.get("https://localhost:5001/api/products")
        .then(res => {
          //call allProducts action and send new data into the store 
          dispatch(allProducts(res.data))
        }).catch(err => {
          //call productsError action when there is an error 
          dispatch(productsError(err.message));
        });
    };
  };

  //call getData action first thing when the app loads up
  useEffect(() => {
    dispatch(getData());
  }, []); //just do it once

  //setup table structure 
  const setupTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    )
  }

  //setup table rows based on the products array
  const renderRows = () => {
    let contentData = content.data as Array<IProduct>;
    return contentData.map((value, idx) => {
      return (
        <tr key={idx}>
          <td>{value.id.toString().trim()}</td>
          <td>{value.name}</td>
          <td>{value.brand}</td>
        </tr>
      )
    });
  }

  const renderData = () => {
    //get content from the store and render it onto the UI 
    if (content.data != null) {
        return (
          setupTable()
        );
    }
    else {
      //when we don't have any content... 
      return ('No data');
    }
  }


  return (
    <div className="App">
      <header className="App-header">
      {renderData()}
      <DisplayErrors />
      </header>
    </div>
  );
}

export default App;
