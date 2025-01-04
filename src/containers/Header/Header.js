import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import { LANGUAGES } from "../../utils";
import VietNam from "../../assets/images/VietNam2.png";
import UK from "../../assets/images/UK.png";
import "./Header.scss";
import { changeLanguageApp } from "../../store/actions";
class Header extends Component {
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    const { processLogout, userInfo } = this.props;

    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>
        <div className="header-feature">
          <div>
            {this.props.language === "vi" ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                Xin chào:
                {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
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
                Welcome:
                {userInfo && userInfo.firstName ? userInfo.firstName : ""}!
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
          {/* nút logout */}
          <div className="btn btn-logout" onClick={processLogout}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)), //->appAction->appReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
