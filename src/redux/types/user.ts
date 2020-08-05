// State
export type UserState = {
  username: string;
};

// Actions
export const SET_USERNAME = "SET_USERNAME";

// Action interface(s)
interface SetUsernameAction {
  type: typeof SET_USERNAME;
  payload: UserState;
}

export type UserActionTypes = SetUsernameAction;
