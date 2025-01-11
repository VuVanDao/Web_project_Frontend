import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import LoadingData from "../../System/Admin/LoadingData";
import HomePageHeader from "../../HomePage/HomePageHeader";
import "./DetailDoctor.scss";
import userService from "../../../services/userService";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      let result = await userService.getDetailDoctor(
        this.props.match.params.id
      );
      if (result && result.errCode === 0) {
        this.setState({
          detailDoctor: result.data,
          isLoading: false,
        });
      }
      console.log(">>>>>>>", this.state);
    }
  }
  componentDidUpdate() {}
  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
   */
  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    return (
      <>
        {this.state.isLoading ? (
          <LoadingData />
        ) : (
          <div>
            <HomePageHeader />
            <div className="container">
              <div className=" detail-doctor-container">
                <div className="left">
                  <div className="img">
                    <img src={detailDoctor.image} />
                  </div>
                </div>
                <div className="right">
                  <span className="title-doctor">
                    {language === "vi"
                      ? detailDoctor.positionData.valueVi +
                        ": " +
                        detailDoctor.lastName +
                        " " +
                        detailDoctor.firstName
                      : detailDoctor.positionData.valueEn +
                        ": " +
                        detailDoctor.firstName +
                        " " +
                        detailDoctor.lastName}
                  </span>
                  <span className="description-doctor">
                    {detailDoctor.Markdown.description}
                  </span>
                </div>
              </div>
              <div
                className="detail-html-doctor mt-3"
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
              <div className="detail-doctor-schedule"></div>
            </div>
          </div>
        )}
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
