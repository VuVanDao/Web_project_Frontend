import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { KeyCodeUtils, LanguageUtils } from "../../utils";
import { FormattedMessage } from "react-intl";
import { toast } from "react-toastify";
import { LANGUAGES } from "../../utils";
import "./HomePageFooter.scss";
class HomePageFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    return (
      <div>
        <div className="HomePageFooter-container ">
          <div className="HomePageFooter-content">
            VanDao'Project. More info:
          </div>
          <div className="HomePageFooter-connect">
            <a href="https://www.facebook.com/vu.van.ao.208585">
              <i className="fab fa-facebook-square"></i>
              FaceBook
            </a>
            <a href="https://github.com/VuVanDao">
              <i className="fab fa-github"></i>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/%C4%91%E1%BA%A1o-v%C5%A9-v%C4%83n-617a782a7/">
              <i class="fab fa-linkedin"></i>
              Linkedin
            </a>
          </div>
        </div>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageFooter);
