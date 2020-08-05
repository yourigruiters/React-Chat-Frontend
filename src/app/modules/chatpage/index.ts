import { connect } from "react-redux";

import ChatpageView from "./chatpage.view";

const mapStateToProps = (state: any) => {
  return {
    username: state.userReducer.username
  };
};

export default connect(mapStateToProps)(ChatpageView);
