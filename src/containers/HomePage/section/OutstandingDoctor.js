import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Outstanding-doctor-container">
        <div className="Outstanding-doctor-title mb-3">
          <span>
            <FormattedMessage id="section.OutstandingDoctor" />
          </span>
          <button>
            <FormattedMessage id="section.more" />
          </button>
        </div>
        <div>
          <Slider {...this.props.settings}>
            <div className="div">
              <img src="https://i.pinimg.com/originals/fb/0e/a2/fb0ea2d516788e45e4b3f31436cf3a1d.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/9c/25/15/9c25153327abed01aa1b67595d081b49.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/bb/6a/a5/bb6aa5121851f1b57a2cb50f73005c66.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/68/c9/97/68c9974bb7453834819fe8c7622f82f9.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/02/68/87/0268871f55ef32809b9f02c83ab1dc23.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/5f/f3/e1/5ff3e15a8cac489fa779a3dabd2ceacc.gif" />
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
