import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManageClinic.scss";
import { FormattedMessage } from "react-intl";
import Lightbox from "react-image-lightbox";
import CommonUtils from "../../../utils/CommonUtils";
import { userService } from "../../../services";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt();
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImageURL: "",
      image: "",
      isOpen: false,
      descriptionHTML: "",
      descriptionMarkdown: "",
      Name: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {}
  handleSaveMarkdown = async () => {
    let res = await userService.createClinic({
      name: this.state.Name,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      image: this.state.image,
    });
    if (res && res.errCode === 0) {
      toast.success(res.errMessage);
      this.setState({
        previewImageURL: "",
        image: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        Name: "",
      });
    } else {
      toast.error(res.errMessage);
    }
  };
  handleOnChangeImage = async (event) => {
    let file = event.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImageURL: objectUrl,
        image: base64,
      });
    }
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  HandleOnChangeInput = (value, id) => {
    this.setState({
      [id]: value,
    });
  };
  render() {
    let { language } = this.props;

    return (
      <>
        <div className="container">
          <p className="title">
            <FormattedMessage id={"Clinic.title"} />
          </p>
          <div className="row mb-5">
            <div className="col-md-6">
              <label htmlFor="Name" className="form-label">
                <FormattedMessage id="Clinic.Name" />:
              </label>
              <input
                type="text"
                className="form-control"
                id="Name"
                value={this.state.Name}
                onChange={(event) =>
                  this.HandleOnChangeInput(event.target.value, "Name")
                }
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="image" className="form-label">
                <FormattedMessage id="Clinic.Image" />
              </label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewImageURL})`,
                  width: "150px",
                  height: "150px",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  position: "absolute",
                  top: "50px",
                  right: "250px",
                }}
                onClick={() => this.setState({ isOpen: true })}
              ></div>
            </div>
          </div>

          <MdEditor
            style={{ height: "400px", margin: "100px auto 0", width: "1400px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.descriptionMarkdown}
          />
          <div className="col-12 text-center my-5">
            <button
              type="submit"
              className="btn btn-warning"
              onClick={() => this.handleSaveMarkdown()}
            >
              <FormattedMessage id="common.confirm" />
            </button>
          </div>
          {this.state.isOpen && (
            <Lightbox
              mainSrc={this.state.previewImageURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
