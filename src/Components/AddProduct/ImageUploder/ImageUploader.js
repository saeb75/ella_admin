import React, { useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const ImageUploader = ({ setNewProduct, newProduct }) => {
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  const handleCancel = () => setState({ ...state, previewVisible: false });
  const handleChange = ({ fileList }) =>
    setNewProduct({ ...newProduct, fileList });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      ...state,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      {" "}
      <>
        <Upload
          listType="picture-card"
          fileList={newProduct.fileList}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {newProduct.fileList.length >= 8 ? null : uploadButton}
        </Upload>
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
      </>
    </div>
  );
};

export default ImageUploader;
