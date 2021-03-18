import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Col, Row, Form, Button, Input, Select } from "antd";
import ImageUploader from "../ImageUploader/ImageUploader";
import { Option } from "antd/lib/mentions";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { addCategory, getListCategory } from "../../Action/CategoryAction";
import MyModal from "../Modal/MyModal";
import AddImage from "../AddImage/AddImage";
const AddCategoryForm = ({ category, handleCancel, updatedCategory }) => {
  const [fileList, setFileList] = useState([]);
  const [addImageOpen, setAddImageOpen] = useState(false);

  const [updateForm, setUpdateForm] = useState({
    _id: updatedCategory ? updatedCategory._id : "",
    name: updatedCategory ? updatedCategory.name : "",
    slug: updatedCategory ? updatedCategory.slug : "",
    parentId:
      updatedCategory && updatedCategory.parentId
        ? updatedCategory.parentId._id
        : "",
  });

  let dispatch = useDispatch();
  const handleAdd = (id) => {
    setFileList([id]);
  };
  const handleDelete = (id) => {
    let deletedList = fileList.filter((item) => item != id);
    setFileList(deletedList);
  };
  const onFinish = async () => {
    let form = new FormData();
    form.append("name", updateForm.name);
    form.append("_id", updateForm._id);
    form.append("slug", updateForm.slug);
    form.append("parentId", updateForm.parentId);
    if (fileList[0]) {
      form.append("categoryImg", fileList[0]);
    }

    await dispatch(addCategory(form));
    dispatch(getListCategory());
    handleCancel();
  };
  useEffect(() => {
    setUpdateForm({
      _id: updatedCategory ? updatedCategory._id : "",
      name: updatedCategory ? updatedCategory.name : "",
      slug: updatedCategory ? updatedCategory.slug : "",
      parentId:
        updatedCategory && updatedCategory.parentId
          ? updatedCategory.parentId._id
          : "",
    });
  }, [updatedCategory]);

  const onFinishFailed = () => {};
  const HandleChange = (name, e) => {
    setUpdateForm({ ...updateForm, [name]: e.target.value });
  };
  const handleSelect = (value) => {
    setUpdateForm({ ...updateForm, parentId: value });
  };
  const canselAddImage = () => {
    setAddImageOpen(false);
  };
  return (
    <div>
      <div>
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={16}>
            <Col lg={12}>
              <Form.Item label="نام" className="labelDir">
                <Input
                  value={updateForm.name}
                  onChange={(e) => HandleChange("name", e)}
                  type="text"
                />
              </Form.Item>
              <Form.Item
                className="labelDir"
                label="اسلاگ"
                rules={[
                  { required: true, message: "این قسمت را باید پر کنید" },
                ]}
              >
                <Input
                  value={updateForm.slug}
                  onChange={(e) => HandleChange("slug", e)}
                  style={{ width: "200px" }}
                />
              </Form.Item>
            </Col>
            <Col lg={12}>
              <Form.Item className="labelDir" label="دسته مادر">
                <Select
                  value={updateForm.parentId ? updateForm.parentId : ""}
                  style={{ width: 200 }}
                  onChange={handleSelect}
                >
                  <option value="">empty</option>
                  {category &&
                    category.map((item) => {
                      return <option value={item._id}>{item.name}</option>;
                    })}
                </Select>
              </Form.Item>
              <div>
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => setAddImageOpen(true)}
                >
                  اضافه کردن عکس
                </Button>
              </div>
            </Col>
            <Col lg={24} xs={24}>
              <Button type="primary" htmlType="submit">
                آپدیت
              </Button>
            </Col>
          </Row>
        </Form>
        <MyModal
          width={1000}
          modalTitle="اضاف کردن عکس"
          open={addImageOpen}
          handleCancel={canselAddImage}
          footer={[<Button onClick={canselAddImage}>بستن</Button>]}
        >
          <AddImage
            handleAdd={handleAdd}
            fileList={fileList}
            handleDelete={handleDelete}
          />
        </MyModal>
      </div>
    </div>
  );
};

export default AddCategoryForm;
