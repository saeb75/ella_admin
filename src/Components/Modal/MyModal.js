import React, { useState } from "react";
import { Modal, Button } from "antd";

const MyModal = ({
  handleCancel,
  open,
  children,
  modalTitle,
  footer,
  width,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Modal
        width={width}
        title={modalTitle}
        visible={open}
        onCancel={handleCancel}
        footer={footer}
      >
        {children}
      </Modal>
    </>
  );
};

export default MyModal;
