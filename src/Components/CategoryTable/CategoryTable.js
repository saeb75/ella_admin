import { Table, Space, Button } from "antd";
import Column from "antd/lib/table/Column";
import React, { useEffect, useState } from "react";
import MyModal from "../Modal/MyModal";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../../Action/CategoryAction";
import "./style.css";
import AddCategoryForm from "../AddCategoryForm/AddCategoryForm";
import { deletedCategory } from "../../Action/CategoryAction";

const CategoryTable = ({ category }) => {
  const [updateCategory, setUpdateCategory] = useState(false);
  const [deleteCategory, setDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dispatch = useDispatch();
  const showDeleteModal = (record) => {
    setDeleteCategory(true);
    setSelectedCategory(record);
  };
  const handleUpdateAndDeleteClose = () => {
    setUpdateCategory(false);
    setDeleteCategory(false);
  };
  const showUpdateModal = (record) => {
    setUpdateCategory(true);

    setSelectedCategory(record);
  };
  const handleDeleted = async () => {
    await dispatch(deletedCategory(selectedCategory._id));
    dispatch(getListCategory());
    handleUpdateAndDeleteClose();
  };
  return (
    <div>
      <div className="userContainer">
        <Table dataSource={category.categories}>
          <Column title="نام" dataIndex="name" key="name" />
          <Column title="اسلاگ" dataIndex="slug" key="slug" />
          <Column
            title="دسته مادر"
            render={(text, record) => {
              return record.parentId ? record.parentId.name : "";
            }}
            key="email"
          />
          <Column
            title="عکس"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <img
                  width="60"
                  height="60"
                  src={record.categoryImg && record.categoryImg.image}
                />
              </Space>
            )}
          />
          <Column
            title="اکشن"
            key="action"
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => showUpdateModal(record)}>آپدیت</a>
                <a onClick={() => showDeleteModal(record)}>حذف</a>
              </Space>
            )}
          />
        </Table>
        <MyModal
          open={updateCategory}
          modalTitle="آپدیت دسته"
          width={1000}
          footer={[]}
          handleCancel={handleUpdateAndDeleteClose}
        >
          <AddCategoryForm
            category={category.categories}
            updatedCategory={selectedCategory}
            handleCancel={handleUpdateAndDeleteClose}
          />
        </MyModal>
        <MyModal
          open={deleteCategory}
          modalTitle="حذف دسته"
          handleCancel={handleUpdateAndDeleteClose}
          footer={[
            <Button onClick={handleUpdateAndDeleteClose}>خیر</Button>,
            <Button onClick={handleDeleted} type="primary">
              بله
            </Button>,
            ,
          ]}
        >
          <p>آیا میخواهید {selectedCategory.name} حذف کنید ؟</p>
        </MyModal>
      </div>
    </div>
  );
};

export default CategoryTable;
