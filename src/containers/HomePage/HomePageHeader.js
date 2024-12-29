import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import "./HomePageHeader.scss";
import Banner from "./Banner";
class HomePageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className="HomePageHeader-container">
          <div className="left">
            <i className="fas fa-bars"></i>
            <img src="https://cf-sparkai-live.s3.amazonaws.com/users/2qqwVX7WxKwrLfu1L0wf530U2U8/spark_ai/o_bg-remover-gen_2qqwzHpFhVHt1gKwJW7phiQHUFO.png" />
          </div>
          <div className="center">
            <div>
              <span>
                <FormattedMessage id="HomePage.Specialties" />
              </span>
              <p>
                <FormattedMessage id="HomePage.FindDoctor" />
              </p>
            </div>
            <div>
              <span>
                <FormattedMessage id="HomePage.MedicalFacility" />
              </span>
              <p>
                <FormattedMessage id="HomePage.ChooseHospitalRoom" />
              </p>
            </div>
            <div>
              <span>
                <FormattedMessage id="HomePage.ChooseDoctor" />
              </span>
              <p>
                <FormattedMessage id="HomePage.ChooseGoodDoctor" />
              </p>
            </div>
            <div>
              <span>
                <FormattedMessage id="HomePage.ExaminationPackage" />
              </span>
              <p>
                <FormattedMessage id="HomePage.GeneralHealthCheck" />
              </p>
            </div>
          </div>
          <div className="right">
            <i className="fas fa-question-circle"></i>
            <span>
              <FormattedMessage id="HomePage.help" />
            </span>
            <span className="change-language">VN</span>
          </div>
        </div>
        <Banner />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
