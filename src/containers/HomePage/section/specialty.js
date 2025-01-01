import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialties extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
            <div className="div">
              <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/3e/9b/25/3e9b25811c481fb8a3d6c87f8ac7a857.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/34/1c/af/341caf7e590b927f95b08084db05b8ef.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/b1/03/6e/b1036e5b4dee3ed79d1023983c0f111f.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/f3/db/91/f3db9196a224ce07667f3a9fa4f52af6.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/f5/29/f4/f529f4991a8ed95972b12bdb349f71a0.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
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
