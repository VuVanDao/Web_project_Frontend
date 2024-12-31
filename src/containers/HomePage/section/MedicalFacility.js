import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Medical-facility-container">
        <div className="Medical-facility-title mb-3">
          <span>Cơ sở y tế</span>
          <button>Xem thêm</button>
        </div>
        <div>
          <Slider {...this.props.settings}>
            <div className="div">
              <img src="https://i.pinimg.com/originals/c6/c0/09/c6c009dc350e388818ff4f61a0f06c74.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/56/a6/14/56a614261d423da1825452363174c685.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/cf/1e/b5/cf1eb5ae90533c39b6b5bba02b247506.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/0d/c4/b3/0dc4b38ee54a0169f5730bcbe4f94d3a.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/28/2f/e1/282fe1d7e40e216c723740b0af255952.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/6a/d0/7b/6ad07bc7872b7f4cafc7f14ad7638306.gif" />
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
