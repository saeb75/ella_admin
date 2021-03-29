import React, { useState } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { Form, Input, Button, Checkbox } from "antd";
import "./style.css";
import ColorTable from "../../Components/ColorTable/ColorTable";
import { useDispatch } from "react-redux";
import { addColor } from "../../Action/ColorAction";

const Color = () => {
  const [newColor, setNewColor] = useState({
    code: "",
    prName: "",
    enName: "",
  });

  const handleChange = (name, value) => {
    setNewColor({ ...newColor, [name]: value });
  };
  const dispatch = useDispatch();
  const onFinish = () => {
    dispatch(addColor(newColor));
    setNewColor({ code: "", prName: "", enName: "" });
  };

  const onFinishFailed = () => {};
  return (
    <MainLayout>
      <div className="colorContainer">
        <h2 style={{ color: "blue", marginBottom: "35px" }}>
          {" "}
          sssssssssssssssssssssاضافه کردن رنگ جدید
        </h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item>
            <h4> کد رنگ</h4>
            <Input
              value={newColor.code}
              onChange={(e) => handleChange("code", e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <h4> نام انگلیسی رنگ</h4>
            <Input
              value={newColor.enName}
              onChange={(e) => handleChange("enName", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <h4> نام فارسی رنگ</h4>
            <Input
              value={newColor.prName}
              onChange={(e) => handleChange("prName", e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              تایید
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ColorTable />
    </MainLayout>
  );
};

export default Color;
