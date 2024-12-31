import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import * as actions from "../../store/actions";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="HandBook-container">
        <div className="HandBook-title mb-3">
          <span>Cẩm nang</span>
          <button>Xem thêm</button>
        </div>
        <div>
          <Slider {...this.props.settings}>
            <div className="div">
              <img src="https://i.pinimg.com/originals/c7/2f/df/c72fdf076d94fffbaa09b5b9db530acd.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/3a/ff/62/3aff6214859a8f7d403ac7a2eda74829.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/18/a2/75/18a27584f11a5ef10b4ab7dd148052ce.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/b7/33/7f/b7337f803eb8ec93fefe2247331783a6.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/f5/3f/6c/f53f6c8aad6b3df514c608249378b550.gif" />
              <p>1sdasdasdasdasdasdas</p>
            </div>
            <div className="div">
              <img src="https://i.pinimg.com/originals/78/01/e8/7801e8c3976a91489510a5f7850bc1a0.gif" />
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
