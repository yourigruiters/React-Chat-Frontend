import { UserState, UserActionTypes, SET_USERNAME } from "../types/";

// Action created using specified types from user.ts
export function setUsername(newUsername: UserState): UserActionTypes {
  return {
    type: SET_USERNAME,
    payload: newUsername
  };
}
