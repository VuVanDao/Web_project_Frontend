import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import { LANGUAGES } from "../../../utils";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from "react-router-dom";
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  HandleDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };
  render() {
    let { listDoctor, language } = this.props;

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
            {listDoctor &&
              listDoctor.length > 0 &&
              listDoctor.map((item, index) => {
                let url = "";
                if (item.image) {
                  url = new Buffer(item.image, "base64").toString("binary");
                }
                return (
                  <div
                    className="div"
                    key={`doctor-${index}`}
                    onClick={() => this.HandleDetailDoctor(item)}
                  >
                    <div>
                      <img src={item.image} />
                    </div>
                    <div>
                      <p>
                        {language === LANGUAGES.VI
                          ? item.positionData.valueVi +
                            " " +
                            item.lastName +
                            " " +
                            item.firstName
                          : item.positionData.valueEn +
                            " " +
                            item.firstName +
                            " " +
                            item.lastName}
                      </p>
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
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
