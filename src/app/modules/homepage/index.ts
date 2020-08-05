import { connect } from "react-redux";

import { UserState } from "./../../../redux/types/user";
import { setUsername } from "../../../redux/actions";

import HomepageView from "./homepage.view";

const mapStateToProps = (state: any) => {
  return {
    username: state.userReducer.username
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUsername: (username: UserState) => dispatch(setUsername(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageView);
