import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { LANGUAGES } from "../../utils";
import "./HomePageHeader.scss";
import Banner from "./Banner";
import { changeLanguageApp } from "../../store/actions";
import VietNam from "../../assets/images/VietNam2.png";
import UK from "../../assets/images/UK.png";
class HomePageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageApp(language);
  };
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
            {this.props.language === "vi" ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  className="change-language"
                  onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                >
                  VN
                </span>
                <img
                  src={VietNam}
                  className="img-changeLanguage"
                  onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                />
              </div>
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span
                  className="change-language"
                  onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                >
                  EN
                </span>
                <img
                  src={UK}
                  className="img-changeLanguage"
                  onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                />
              </div>
            )}
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
    changeLanguageApp: (language) => dispatch(changeLanguageApp(language)), //->appAction->appReducer
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
