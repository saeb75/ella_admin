import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../../Action/CategoryAction";
import AddProduct from "../../Components/AddProduct/AddProduct";
import MainLayout from "../../Components/MainLayout/MainLayout";

const Product = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(getListCategory());
  }, []);
  return (
    <MainLayout>
      <AddProduct category={category.categories} />
    </MainLayout>
  );
};

export default Product;
