import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import { userService } from "../../services";
import HomePageHeader from "../HomePage/HomePageHeader";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let url = new URLSearchParams(this.props.location.search);
      let token = url.get("token");
      let doctorId = url.get("doctorId");
      let res = await userService.verifyToken(token, doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          status: true,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <>
        <HomePageHeader></HomePageHeader>
        {this.state.status ? (
          <div style={{ marginTop: "100px" }}>"Booking complete" </div>
        ) : (
          <div style={{ marginTop: "100px" }}>"Not complete" </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
