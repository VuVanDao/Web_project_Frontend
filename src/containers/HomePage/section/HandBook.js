import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import "./specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { userService } from "../../../services";
import { withRouter } from "react-router-dom";

class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = { arrHandBook: [] };
  }
  async componentDidMount() {
    let res = await userService.GetAllHandBook();
    if (res && res.errCode === 0) {
      this.setState({
        arrHandBook: res.data,
      });
    }
  }
  HandleDetailHandBook = (specialty) => {
    console.log(">>>", this.props);

    this.props.history.push(`/detail-handBook/${specialty.id}`);
  };
  render() {
    let { arrHandBook } = this.state;
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
            {arrHandBook &&
              arrHandBook.length > 0 &&
              arrHandBook.map((item, index) => {
                let url = "";
                if (item.image) {
                  url = new Buffer(item.image, "base64").toString("binary");
                }
                return (
                  <div
                    className="div"
                    key={`handBook-${index}`}
                    onClick={() => this.HandleDetailHandBook(item)}
                  >
                    <div>
                      <img src={item.image} />
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
