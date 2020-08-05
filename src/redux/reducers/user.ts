import { UserState, UserActionTypes, SET_USERNAME } from "../types";

const initialState: UserState = {
  username: ""
};

export function userReducer(
  state = initialState,
  action: UserActionTypes
): UserState {
  switch (action.type) {
    case SET_USERNAME:
      return {
        username: action.payload.username
      };
    default:
      return state;
  }
}
