import { createStore } from "redux";

const INITIAL_STATE = {
  id: "",
};

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "EDIT_ITEM":
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

export default store;
