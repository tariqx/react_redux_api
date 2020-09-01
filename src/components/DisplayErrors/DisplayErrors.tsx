import React from 'react';
import styles from './DisplayErrors.module.css';
import { useSelector } from "react-redux";
import { IInitialState } from "../../actions/ProductActions";


//create an interface to map the data that we want to extract from the Store
interface CurrentProp {
  errorMessage: string
}

const DisplayErrors: React.FC = () => {
  //access any error messages we may have in the store 
  const error = useSelector<IInitialState, CurrentProp>((state: IInitialState) => state);

  return (
    <div className={styles.DisplayErrors}>
      {error.errorMessage}
    </div>
  );
};

export default DisplayErrors;
