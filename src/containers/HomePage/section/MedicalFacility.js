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

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinic: [],
    };
  }
  async componentDidMount() {
    let res = await userService.GetAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        arrClinic: res.data,
      });
    }
  }
  HandleDetailClinic = (clinic) => {
    console.log(">>", this.props);
    this.props.history.push(`/detail-clinic/${clinic.id}`);
  };
  render() {
    let { arrClinic } = this.state;

    return (
      <div className="Medical-facility-container">
        <div className="Medical-facility-title mb-3">
          <span>
            <FormattedMessage id="section.MedicalFacility" />
          </span>
          <button>
            <FormattedMessage id="section.more" />
          </button>
        </div>
        <div>
          <Slider {...this.props.settings}>
            {arrClinic &&
              arrClinic.length > 0 &&
              arrClinic.map((item, index) => {
                let url = "";
                if (item.image) {
                  url = new Buffer(item.image, "base64").toString("binary");
                }
                return (
                  <div
                    className="div"
                    key={`clinic-${index}`}
                    onClick={() => this.HandleDetailClinic(item)}
                  >
                    <div>
                      <img src={url} />
                    </div>
                    <div className="name">
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
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
