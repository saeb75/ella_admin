import React, { useState } from "react";
import { Button, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "./style.css";

const ImageUploader = ({ onChange, fileList }) => {
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <div>
      <ImgCrop
        rotate
        modalOk="تایید"
        modalCancel="انصراف"
        modalTitle="سایز عکس"
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && "+ Upload"}
        </Upload>
      </ImgCrop>
    </div>
  );
};

export default ImageUploader;
