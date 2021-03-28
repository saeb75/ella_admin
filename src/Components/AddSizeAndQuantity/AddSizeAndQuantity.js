import React, { useState } from "react";
import { Form, Input, Button, Space, Select, Col, Row, Table } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Column from "antd/lib/table/Column";
import "./style.css";
const { Option } = Select;

const AddSizeAndQuantity = ({ setNewProduct, newProduct, colors }) => {
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");
  const [AddSizeAndQuantity, setAddSizeAndQuantity] = useState([]);
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const onFinish = () => {};
  const HandleAdd = () => {
    setNewProduct({
      ...newProduct,
      AddSizeAndQuantity: [
        ...newProduct.AddSizeAndQuantity,
        { _id: Date.now(), size: "", quantity: "", color: "" },
      ],
    });
  };
  console.log(colors);
  const handleChange = (id, name, value) => {
    let updatedProduct = newProduct.AddSizeAndQuantity.map((item) =>
      item._id == id ? { ...item, [name]: value } : { ...item }
    );
    setNewProduct({ ...newProduct, AddSizeAndQuantity: updatedProduct });
  };
  const handleDelete = (id) => {
    let deleteProduct = newProduct.AddSizeAndQuantity.filter(
      (item) => item._id != id
    );
    setNewProduct({ ...newProduct, AddSizeAndQuantity: deleteProduct });
  };
  let sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      {AddSizeAndQuantity && (
        <Table
          dataSource={newProduct.AddSizeAndQuantity}
          pagination={{ defaultPageSize: 4 }}
        >
          <Column
            title="سایز"
            render={(text, record) => {
              return (
                <Select
                  className="antSelectDesign"
                  style={{ width: "100%" }}
                  value={record.size}
                  onChange={(value) => handleChange(record._id, "size", value)}
                >
                  {sizes.map((item) => {
                    return (
                      <option
                        value={item}
                        style={{ textTransform: "capitalize" }}
                      >
                        {item}
                      </option>
                    );
                  })}
                </Select>
              );
            }}
            key="size"
          />
          <Column
            title="color"
            render={(text, record) => {
              return (
                <Select
                  className="antSelectDesign"
                  style={{ width: "100%" }}
                  value={record.color}
                  onChange={(value) => handleChange(record._id, "color", value)}
                >
                  {colors.map((item) => {
                    return (
                      <option value={item._id}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>{item.prName}</p>
                          <div
                            style={{
                              backgroundColor: `#${item.code}`,
                              width: "20px",
                              height: "20px",
                              marginTop: "4px",
                            }}
                          ></div>
                        </div>
                      </option>
                    );
                  })}
                </Select>
              );
            }}
            key="size"
          />
          <Column
            title=" تعداد"
            render={(text, record) => {
              return (
                <Input
                  type="number"
                  value={record.quantity}
                  onChange={(e) =>
                    handleChange(record._id, "quantity", e.target.value)
                  }
                />
              );
            }}
            key="email"
          />
          <Column
            title=" عملیات"
            render={(text, record) => {
              return (
                <DeleteOutlined onClick={() => handleDelete(record._id)} />
              );
            }}
            key="email"
          />
        </Table>
      )}

      <Button onClick={HandleAdd}>اضافه کردن</Button>

      <Form.Item>
        {/*  <Button type="primary" onClick={onFinish}>
              ok
            </Button> */}
      </Form.Item>
    </Form>
  );
};

export default AddSizeAndQuantity;
