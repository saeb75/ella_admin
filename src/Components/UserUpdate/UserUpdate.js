import { Col, Row, Form, Button, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUsers, updateUser } from "../../Action/UserAction";
import ImageUploader from "../ImageUploader/ImageUploader";
import "./style.css";
export const UserUpdate = ({ updateState, handleUpdateCancel }) => {
  const [fileList, setFileList] = useState([]);
  const [updateForm, setUpdateForm] = useState({
    firstName: updateState.firstName,
    lastName: updateState.lastName,
    role: updateState.role,
  });

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const dispatch = useDispatch();
  const onFinish = async () => {
    let form = new FormData();
    form.append("_id", updateState._id);
    form.append("firstName", updateForm.firstName);
    form.append("lastName", updateForm.lastName);
    form.append("role", updateForm.role);
    if (fileList.length > 0) {
      form.append("profilePicture", fileList[0].originFileObj);
    }
    await dispatch(updateUser(form));
    dispatch(getUsers());
  };
  const onFinishFailed = () => {};
  const HandleChange = (name, e) => {
    setUpdateForm({ ...updateForm, [name]: e.target.value });
  };
  return (
    <div>
      <div className="updateAvatar">
        <ImageUploader onChange={onChange} fileList={fileList} />
      </div>

      <div>
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={16}>
            <Col lg={12}>
              <Form.Item label="نام" name="firstName" className="labelDir">
                <Input
                  defaultValue={updateForm.firstName}
                  onChange={(e) => HandleChange("firstName", e)}
                  style={{ width: "200px" }}
                />
              </Form.Item>

              <Form.Item className="labelDir" label="رول" name="role">
                <Input
                  defaultValue={updateForm.role}
                  onChange={(e) => HandleChange("role", e)}
                  style={{ width: "200px" }}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item
                className="labelDir"
                label="نام خانوادگی"
                initialValue={updateForm.lastName}
                name="lastName"
              >
                <Input
                  onChange={(e) => HandleChange("lastName", e)}
                  style={{ width: "200px" }}
                />
              </Form.Item>
            </Col>
            <Col lg={24} xs={24}>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleUpdateCancel}
              >
                آپدیت
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
export default UserUpdate;
