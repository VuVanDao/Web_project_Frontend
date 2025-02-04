import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from "../../../services";
import { withRouter } from "react-router-dom";

class Specialties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await userService.getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        arrSpecialty: res.data,
      });
    }
  }
  HandleDetailSpecialty = (specialty) => {
    console.log(">>>", this.props);

    this.props.history.push(`/detail-specialty/${specialty.id}`);
  };
  render() {
    let { arrSpecialty } = this.state;
    return (
      <div className="specialty-container ">
        <div className="specialty-title mb-3">
          <span>
            <FormattedMessage id="section.Specialty" />
          </span>
          <button>
            <FormattedMessage id="section.more" />
          </button>
        </div>
        <div>
          <Slider {...this.props.settings}>
            {arrSpecialty &&
              arrSpecialty.length &&
              arrSpecialty.map((item, index) => {
                let url = "";
                if (item.image) {
                  url = new Buffer(item.image, "base64").toString("binary");
                }
                return (
                  <div
                    className="div"
                    key={`specialty-${index}`}
                    onClick={() => this.HandleDetailSpecialty(item)}
                  >
                    <div>
                      <img src={url} />
                    </div>
                    <div>
                      <p>{item.name}</p>
                    </div>
                  </div>
                );
              })}
          </Slider>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialties)
);
