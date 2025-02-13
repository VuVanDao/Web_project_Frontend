import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomePageHeader from "../../HomePage/HomePageHeader";
import HomePageFooter from "../HomePageFooter";
import "./DetailHandBook.scss";
import userService from "../../../services/userService";

import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { result, times } from "lodash";
class DetailHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
    };
  }
  async componentDidMount() {
    if (this.props.match.params.id) {
      let result = await userService.getDetailHandBook(
        this.props.match.params.id
      );
      if (result && result.errCode === 0) {
        this.setState({
          title: result.data.name,
          description: result.data.descriptionHTML,
          image: result.data.image,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.language !== this.props.language) {
    }
  }

  /* life cycle
    Run component
    1. Run constructor - init state (khoi tao state)
    2.did mount : gan gia tri cho state
    3. render
   */
  render() {
    let { language } = this.props;
    let { title, description, image } = this.state;

    // console.log(">>>", this.state.arrDoctor);

    return (
      <>
        <HomePageHeader />
        <div className="container">
          <div className="handbook-title">
            <ul>
              <li>{title}</li>
            </ul>
          </div>
          <div className="image">
            <img src={image} />
          </div>
          <div
            className="detail-html-doctor-content"
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
        <HomePageFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    provinceArr: state.admin.provinceArr,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProvinceStart: () => dispatch(actions.fetchProvinceStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandBook);
