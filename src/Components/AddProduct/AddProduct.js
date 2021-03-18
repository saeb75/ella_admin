import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Row, Col, Select } from "antd";
import AddSizeAndQuantity from "../AddSizeAndQuantity/AddSizeAndQuantity";
import ImageUploader from "./ImageUploder/ImageUploader";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, getProducts } from "../../Action/ProductAction";
import { getColors } from "../../Action/ColorAction";
import MyModal from "../Modal/MyModal";
import AddImage from "../AddImage/AddImage";
import { UploadOutlined } from "@ant-design/icons";
const layout = {};
const tailLayout = {};
const AddProduct = ({ category, product }) => {
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [featureProduct, setFeatureProduct] = useState(true);
  let myList = [];

  const [newProduct, setNewProduct] = useState({
    _id: product && product._id,
    name: product ? product.name : "",
    slug: product ? product.slug : "",
    description: product ? product.description : "",
    category: product ? product.category : "",
    price: product ? product.price : "",
    color: product ? product.color : "",
    fileList: product ? product.productImg.map((item) => item.img._id) : [],
    AddSizeAndQuantity: product ? product.productDetails : [],
  });

  const handleAdd = (id) => {
    setNewProduct({ ...newProduct, fileList: [...newProduct.fileList, id] });
  };
  const handleDelete = (id) => {
    let deletedList = newProduct.fileList.filter((item) => item != id);
    setNewProduct({ ...newProduct, fileList: deletedList });
  };
  const dispatch = useDispatch();
  const color = useSelector((state) => state.color);
  useEffect(() => {
    dispatch(getColors());
  }, []);

  useEffect(() => {
    setNewProduct({
      _id: product && product._id,
      name: product ? product.name : "",
      slug: product ? product.slug : "",
      description: product ? product.description : "",
      category: product ? product.category : "",
      price: product ? product.price : "",
      color: product ? product.color : "",
      fileList: product ? product.productImg.map((item) => item.img._id) : [],
      AddSizeAndQuantity: product ? product.productDetails : [],
    });
  }, [product]);
  const onFinish = async () => {
    await dispatch(
      addProducts({
        name: newProduct.name,
        description: newProduct.description,
        productDetails: newProduct.AddSizeAndQuantity,
        category: newProduct.category,
        slug: newProduct.slug,
        price: newProduct.price,
        color: newProduct.color,
        productImg: newProduct.fileList,
        id: newProduct._id && newProduct._id,
      })
    );
    dispatch(getProducts());
  };

  const onFinishFailed = (errorInfo) => {};
  const handleSelect = (value) => {};
  let handleChange = (name, value) => {
    setNewProduct({ ...newProduct, [name]: value });
  };
  const canselAddImage = () => {
    setAddImageOpen(false);
  };
  return (
    <div>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row>
          <Col lg={24}>
            <Row gutter={16}>
              <Col lg={8} xs={24}>
                <Form.Item>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>نام</h3>
                    <Input
                      value={newProduct.name}
                      type="text"
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col lg={8} xs={24}>
                <Form.Item>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>اسلاگ</h3>
                    <Input
                      value={newProduct.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col lg={8} xs={24}>
                <Form.Item>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>قیمت</h3>
                    <Input
                      value={newProduct.price}
                      type="number"
                      onChange={(e) => handleChange("price", e.target.value)}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col lg={24}>
            <Row gutter={16}>
              <Col lg={8} xs={24}>
                <Form.Item className="labelDir">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>دسته مادر</h3>

                    <Select
                      value={newProduct.category ? newProduct.category : ""}
                      onChange={(value) => handleChange("category", value)}
                    >
                      {category &&
                        category.map((item) => {
                          return <option value={item._id}>{item.name}</option>;
                        })}
                    </Select>
                  </div>
                </Form.Item>
              </Col>

              <Col lg={8} xs={24}>
                <Form.Item>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>رنگ:</h3>
                    <Select
                      value={newProduct.color}
                      onChange={(value) => handleChange("color", value)}
                      showSearch={true}
                    >
                      {color.colors.colors &&
                        color.colors.colors.map((item) => {
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
                  </div>
                </Form.Item>
              </Col>
              <Col lg={8} xs={24}>
                <Form.Item>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h3>توضیحات محصول</h3>
                    <Input.TextArea
                      value={newProduct.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col lg={24}>
            <Row gutter={16}>
              <Col lg={12} xs={24}>
                <AddSizeAndQuantity
                  setNewProduct={setNewProduct}
                  newProduct={newProduct}
                />
              </Col>
              <Col lg={12} xs={24}>
                {/*   <ImageUploader
                  setNewProduct={setNewProduct}
                  newProduct={newProduct}
                /> */}
                <Button
                  icon={<UploadOutlined />}
                  onClick={() => setAddImageOpen(true)}
                >
                  اضافه کردن عکس
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <MyModal
          width={1000}
          modalTitle="اضاف کردن عکس"
          open={addImageOpen}
          handleCancel={canselAddImage}
          footer={[<Button onClick={canselAddImage}>بستن</Button>]}
        >
          <AddImage
            handleAdd={handleAdd}
            fileList={newProduct.fileList}
            handleDelete={handleDelete}
          />
        </MyModal>
      </Form>
    </div>
  );
};

export default AddProduct;
