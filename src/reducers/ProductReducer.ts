
//import all related actions 
import { IProductAction, IInitialState, initialState, CALL_SUCCESS, CALL_ERROR } from '../actions/ProductActions';

//reducer function 
function ProductReducer(state: IInitialState = initialState, action: IProductAction) {
  switch (action.type) {//using switch statement to conditionally handling different types of actions
    case CALL_SUCCESS://when REST API call is successful, save new payload data into store  
      return {
        ...state, //reference current state object
        data: action.payload.data, //update state w/ new data coming in via dispatch
        isLoading: false
      };
      case CALL_ERROR: //error action 
        return {
        ...state, //reference current state object 
        hasError: true,
        errorMessage: action.payload.errorMessage, //update state w/ new data coming in via dispatch
        isLoading: false
        };        
    default:
      return state; //return original state
  }
}

export default ProductReducer;

