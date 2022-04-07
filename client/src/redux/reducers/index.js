import { combineReducers } from "redux";
import { userReducer } from "../../../../redux/reducers/userReducer";

const reducers = combineReducers({
  userReducer : userReducer
})

export default reducers