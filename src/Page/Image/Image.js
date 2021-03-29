import React, { useState } from "react";
import { Upload, Modal, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { addImage } from "../../Action/ImageAction";
import "./style.css";
import { useDispatch } from "react-redux";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const ImageUploader = () => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });
  const dispatch = useDispatch();

  const sendForm = async () => {
    let form = new FormData();
    form.append("image", state.fileList[0]);
    await dispatch(addImage(form));
    setState({
      previewVisible: false,
      previewImage: "",
      previewTitle: "",
      fileList: [],
    });
  };
  const handleCancel = () => setState({ ...state, previewVisible: false });
  const handleChange = (e) => {
    setState({ ...state, fileList: e.target.files });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <MainLayout>
      <div className="imagesContainer">
        <h2 style={{ color: "blue", marginBottom: "35px" }}>کردن عکس جدید</h2>
        <div>
          {/*   <Upload fileList={state.fileList} onChange={handleChange}>
            <Button>Upload</Button>
          </Upload> */}
          <input type="file" onChange={handleChange} />
          <Modal
            visible={state.previewVisible}
            title={state.previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img
              alt="example"
              style={{ width: "100%" }}
              src={state.previewImage}
            />
          </Modal>
        </div>
        <Button type="primary" style={{ marginTop: 20 }} onClick={sendForm}>
          تایید
        </Button>
      </div>
    </MainLayout>
  );
};

export default ImageUploader;
