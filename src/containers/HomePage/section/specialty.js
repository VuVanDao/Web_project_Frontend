import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: false,
  speed: 1000,
  autoplaySpeed: 5000,
};
class Specialties extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="specialty-container mb-5">
        <div className="specialty-title">das</div>
        <Slider {...settings}>
          <div className="div">
            <img src="https://i.pinimg.com/originals/52/35/22/523522dcfa4cc4b23b8b3bcc0e404602.gif" />
            {/* <h3>1</h3> */}
          </div>
          <div className="div">
            <img src="https://i.pinimg.com/originals/52/35/22/523522dcfa4cc4b23b8b3bcc0e404602.gif" />
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
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
