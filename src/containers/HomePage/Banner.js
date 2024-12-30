import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import "./Banner.scss";
class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <div className="banner-container">
          <div className="banner-content">
            <div className="banner-content-title">
              <FormattedMessage id="Banner.HealthcareEcosystem" />
            </div>
            <div className="banner-content-title">
              <FormattedMessage id="Banner.ComprehensiveHealthcare" />
            </div>
            <div className="banner-content-search ">
              <label htmlFor="search">
                <i className="fas fa-search"></i>
              </label>
              <input id="search" />
            </div>
            <div className="banner-content-feature">
              <div className="feature-item">
                <i className="fas fa-hospital"></i>
                <a href="#!">
                  <FormattedMessage id="Banner.SpecializedExamination" />
                </a>
              </div>
              <div className="feature-item">
                <i className="fas fa-mobile-alt"></i>
                <a href="#!">
                  <FormattedMessage id="Banner.TelehealthAssessment" />
                </a>
              </div>
              <div className="feature-item">
                <i className="fas fa-procedures"></i>
                <a href="#!">
                  <FormattedMessage id="Banner.GeneralExamination" />
                </a>
              </div>
              <div className="feature-item">
                <i className="fas fa-stethoscope"></i>
                <a href="#!">
                  <FormattedMessage id="Banner.MedicalTests" />
                </a>
              </div>
              <div className="feature-item">
                <i className="fas fa-user-md"></i>
                <a href="#!">
                  <FormattedMessage id="Banner.MentalHealth" />
                </a>
              </div>
              <div className="feature-item">
                <i className="fas fa-smile"></i>
                <a href="#!">
                  <FormattedMessage id="Banner.DentalExamination" />
                </a>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
