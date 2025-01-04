import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
//menuApp
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // console.log("props", this.props.userInfo);
    let { userInfo } = this.props;
    return <div className="text-center title">{userInfo.firstName}</div>;
  }
}

const mapStateToProps = (state) => {
  // return { UserRedux };
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
