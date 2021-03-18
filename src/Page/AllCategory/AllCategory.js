import { Button } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListCategory } from "../../Action/CategoryAction";
import AddCategoryForm from "../../Components/AddCategoryForm/AddCategoryForm";
import CategoryTable from "../../Components/CategoryTable/CategoryTable";
import MainLayout from "../../Components/MainLayout/MainLayout";
import MyModal from "../../Components/Modal/MyModal";
import "./style.css";
export const AllCategory = () => {
  const [addOpen, setAddOpen] = useState(false);
  let category = useSelector((state) => state.category);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListCategory());
  }, []);

  const canselAddcategoryModal = () => {
    setAddOpen(false);
  };
  return (
    <>
      <MainLayout>
        <div className="addCateory">
          <Button type="primary" onClick={() => setAddOpen(true)}>
            اضافه کردن دسته
          </Button>
        </div>
        <CategoryTable category={category} />
      </MainLayout>
      <MyModal
        width={1000}
        modalTitle="اضاف کردن دسته"
        open={addOpen}
        handleCancel={canselAddcategoryModal}
      >
        <AddCategoryForm
          category={category.categories}
          handleCancel={canselAddcategoryModal}
        />
      </MyModal>
    </>
  );
};
