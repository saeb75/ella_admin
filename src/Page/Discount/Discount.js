import { Button, Space, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiscountList,
  deleteProductFromDiscount,
} from "../../Action/ProductAction";
import MainLayout from "../../Components/MainLayout/MainLayout";
import MyModal from "../../Components/Modal/MyModal";

const Discount = () => {
  const [deleteDisounct, setDeleteDiscount] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(getDiscountList());
  }, []);
  let { discount } = product;
  let arrayList = [];
  let list = discount.products?.map((item) => arrayList.push(item.product));
  if (!arrayList) {
    return <h2>loading</h2>;
  }
  const handleDeleteCancel = () => {
    setDeleteDiscount(false);
  };
  const showDeleteModal = (record) => {
    setDeleteDiscount(true);
    setDeleteId(record._id);
  };
  const deleteUserById = () => {
    dispatch(deleteProductFromDiscount(deleteId, "discount"));
    setDeleteDiscount(false);
  };
  return (
    <MainLayout>
      <Table dataSource={arrayList}>
        <Column title="نام" dataIndex="name" key="name" />
        <Column title="اسلاگ" dataIndex="slug" key="slug" />
        <Column
          title="اکشن"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a onClick={() => showDeleteModal(record)}>حذف</a>
            </Space>
          )}
        />
      </Table>
      <MyModal
        open={deleteDisounct}
        handleCancel={handleDeleteCancel}
        modalTitle="حذف کاربر"
        footer={[
          <Button type="primary" onClick={() => deleteUserById()}>
            بله
          </Button>,
          <Button onClick={handleDeleteCancel}>خیر</Button>,
        ]}
      >
        <div>
          <h4 style={{ direction: "rtl" }}>میخواهید حذف کنید</h4>
        </div>
      </MyModal>
    </MainLayout>
  );
};

export default Discount;
