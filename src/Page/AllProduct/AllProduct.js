import { Button, Card, Col, Input, Pagination, Row } from "antd";
import React, { useEffect, useState } from "react";
import MainLayout from "../../Components/MainLayout/MainLayout";
import MyCard from "../../Components/Card/Card";
import {
  addProductToDiscountList,
  deleteSingleProduct,
  getProducts,
} from "../../Action/ProductAction";
import { useDispatch, useSelector } from "react-redux";
import MyModal from "../../Components/Modal/MyModal";
import AddProduct from "../../Components/AddProduct/AddProduct";
import { getListCategory } from "../../Action/CategoryAction";
import Form from "antd/lib/form/Form";
const AllProduct = () => {
  const [productUpdateModal, setProductUpdateModal] = useState(false);
  const [productDeleteModal, setProductDeleteModal] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [discountPrecent, setDiscountPrecent] = useState("");
  const [discountId, setDiscountId] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState([]);
  const handleChage = (value) => {
    dispatch(getProducts(value));
  };
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getListCategory());
  }, []);
  const HandleUpdateModal = (product) => {
    setProductUpdateModal(true);
    setUpdatedProduct(product);
  };
  const deleteProduct = async () => {
    await dispatch(deleteSingleProduct(updatedProduct._id));
    canselupdateProductModal();
    dispatch(getProducts());
  };
  const canselupdateProductModal = () => {
    setProductUpdateModal(false);
    setProductDeleteModal(false);
    setDiscount(false);
  };
  let { totalPage, products } = product;
  const handleDeleteModal = (product) => {
    setProductDeleteModal(true);
    setUpdatedProduct(product);
  };
  const handleDiscount = (id) => {
    setDiscount(true);
    setDiscountId(id);
  };
  const addToDiscount = () => {
    if (!discountPrecent) {
      alert("فیلد را پر کنید");
    }
    dispatch(addProductToDiscountList("discount", discountId, discountPrecent));
  };

  return (
    <MainLayout>
      <Row>
        {products &&
          products.map((item, index) => {
            return (
              <Col
                span={6}
                lg={6}
                s={24}
                xs={24}
                md={12}
                key={index}
                style={{
                  marginBottom: 15,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MyCard
                  item={item}
                  HandleUpdateModal={HandleUpdateModal}
                  handleDeleteModal={handleDeleteModal}
                  handleDiscount={handleDiscount}
                />
              </Col>
            );
          })}
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Pagination
          defaultCurrent={1}
          total={totalPage * 10}
          onChange={handleChage}
        />
      </div>
      <MyModal
        width={1000}
        modalTitle="تغییر محصول"
        open={productUpdateModal}
        handleCancel={canselupdateProductModal}
      >
        <AddProduct category={category.categories} product={updatedProduct} />
      </MyModal>
      <MyModal
        width={1000}
        modalTitle="حذف محصول"
        open={productDeleteModal}
        handleCancel={canselupdateProductModal}
        footer={[]}
      >
        <p>آیا مخواهید این محصول را حذف کنید ؟</p>
        <Button type="primary" onClick={canselupdateProductModal}>
          خیر
        </Button>

        <Button type="primary" onClick={deleteProduct}>
          بله
        </Button>
      </MyModal>
      <MyModal
        width={1000}
        modalTitle="حذف محصول"
        open={discount}
        handleCancel={canselupdateProductModal}
        footer={[
          <Button type="primary" onClick={canselupdateProductModal}>
            خیر
          </Button>,
          <Button type="primary" onClick={addToDiscount}>
            بله
          </Button>,
        ]}
      >
        <div>
          <h3>درصد تخفیف</h3>
          <Input
            value={discountPrecent}
            type="number"
            onChange={(e) => setDiscountPrecent(e.target.value)}
          />
        </div>
      </MyModal>
    </MainLayout>
  );
};

export default AllProduct;
