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

class Specialties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await userService.getAllSpecialty();
    console.log(">>>", res);
    if (res && res.errCode === 0) {
      this.setState({
        arrSpecialty: res.data,
      });
    }
  }
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
                  <div className="div" key={`specialty-${index}`}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialties);
