import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import HomePageHeader from "./HomePageHeader";
import Banner from "./Banner";
import Specialty from "./section/specialty";
import MedicalFacility from "./section/MedicalFacility";
import OutstandingDoctor from "./section/OutstandingDoctor";
import HandBook from "./section/HandBook";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 5000,
  };
  render() {
    return (
      <>
        <div>
          <HomePageHeader />
          <Banner />
          <Specialty settings={this.settings} />
          <MedicalFacility settings={this.settings} />
          <OutstandingDoctor settings={this.settings} />
          <HandBook settings={this.settings} />
        </div>
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
  return {
    navigate: (path) => dispatch(push(path)),

    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
