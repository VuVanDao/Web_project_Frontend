import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import HomePageHeader from "../../HomePage/HomePageHeader";
// import "./DetailHandBook.scss";
import "./detailClinic.scss";
import userService from "../../../services/userService";
import DoctorSchedule from "../../Patient/Doctor/Schedule";
import DoctorExtraInfo from "../../Patient/Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor/ProfileDoctor";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
class DetailHandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}
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

    // console.log(">>>", this.state.arrDoctor);

    return (
      <>
        <HomePageHeader />
        <div style={{ marginTop: "100px" }}>hahaha</div>
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
