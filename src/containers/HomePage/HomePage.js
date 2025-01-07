import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { userService } from "../../services";
import HomePageHeader from "./HomePageHeader";
import Banner from "./Banner";
import Specialty from "./section/specialty";
import MedicalFacility from "./section/MedicalFacility";
import OutstandingDoctor from "./section/OutstandingDoctor";
import HandBook from "./section/HandBook";
import AboutUs from "./section/AboutUs";
import HomePageFooter from "./HomePageFooter";
import Loaders from "./Loaders";
import * as actions from "../../store/actions";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      isLoadingListDoctor: false,
    };
  }
  async componentDidMount() {
    this.props.getListDoctor();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listDoctor !== this.props.listDoctor) {
      this.setState({
        listDoctor: this.props.listDoctor,
        isLoadingListDoctor: true,
      });
    }
  }
  settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
  };
  render() {
    let { isLoadingListDoctor } = this.state;
    let { listDoctor } = this.props;
    // console.log(">>>", listDoctor);

    return (
      <>
        {isLoadingListDoctor ? (
          <div>
            <HomePageHeader />
            <Banner />
            <Specialty settings={this.settings} />
            <MedicalFacility settings={this.settings} />
            <OutstandingDoctor
              settings={this.settings}
              listDoctor={listDoctor}
            />
            <HandBook settings={this.settings} />
            <AboutUs />
            <HomePageFooter />
          </div>
        ) : (
          <Loaders />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listDoctor: state.admin.listDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // navigate: (path) => dispatch(push(path)),

    getListDoctor: () => dispatch(actions.getListDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
