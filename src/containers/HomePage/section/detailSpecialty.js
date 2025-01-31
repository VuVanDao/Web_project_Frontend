import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import LoadingData from "../../System/Admin/LoadingData";
import HomePageHeader from "../../HomePage/HomePageHeader";
// import "./DetailSpecialty.scss";
import userService from "../../../services/userService";

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  async componentDidMount() {}
  componentDidUpdate() {}
  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
   */
  render() {
    let { language } = this.props;

    return (
      <>
        {this.state.isLoading ? (
          <LoadingData />
        ) : (
          <div>
            <HomePageHeader />
            <p style={{ marginTop: "100px" }}>dasdasdasdsa</p>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
