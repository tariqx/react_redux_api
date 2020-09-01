import { Action } from 'redux';

/* create an interface for the store object, this will be based object that all actions 
shared throughout the life of application */
export interface IInitialState {
    data: any,
    hasError: boolean,
    errorMessage: string,
    isLoading: boolean
};

//initialize default values and flags 
export const initialState = {
    data: null,
    hasError: false,
    errorMessage: '',
    isLoading: true, //set true as default
};

//initialize a new action 
export interface IProductAction extends Action {
    payload: IInitialState;
}

//action type constants
export const CALL_SUCCESS: string = 'CALL_SUCCESS';
export const CALL_ERROR: string = 'CALL_ERROR';


//action creator functions:
//handles API call response's data
export const allProducts = (data: any) => {
    return {
        type: CALL_SUCCESS,
        payload: {data}
    };
}

//handles all error messages 
export const productsError = (errorMessage: string) => {
    return {
        type: CALL_ERROR,
        payload: {errorMessage}
    }
}
