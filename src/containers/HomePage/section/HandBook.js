import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
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
          <span>
            <FormattedMessage id="section.Handbook" />
          </span>
          <button>
            <FormattedMessage id="section.more" />
          </button>
        </div>
        <div>
          <Slider {...this.props.settings}>
            <div className="div">
              <div>
                <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              </div>
              <div>
                <p>1sdasdasdasdasdasdas</p>
              </div>
            </div>
            <div className="div">
              <div>
                <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              </div>
              <div>
                <p>1sdasdasdasdasdasdas</p>
              </div>
            </div>
            <div className="div">
              <div>
                <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              </div>
              <div>
                <p>1sdasdasdasdasdasdas</p>
              </div>
            </div>
            <div className="div">
              <div>
                <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              </div>
              <div>
                <p>1sdasdasdasdasdasdas</p>
              </div>
            </div>
            <div className="div">
              <div>
                <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              </div>
              <div>
                <p>1sdasdasdasdasdasdas</p>
              </div>
            </div>
            <div className="div">
              <div>
                <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              </div>
              <div>
                <p>1sdasdasdasdasdasdas</p>
              </div>
            </div>
            <div className="div">
              <div>
                <img src="https://i.pinimg.com/originals/64/97/50/649750b6a1d69822a2a3f1e92429e69e.gif" />
              </div>
              <div>
                <p>1sdasdasdasdasdasdas</p>
              </div>
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
