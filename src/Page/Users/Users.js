import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../Action/UserAction";
import MainLayout from "../../Components/MainLayout/MainLayout";
import "./style.css";
import { Table, Tag, Space, Button } from "antd";
import MyModal from "../../Components/Modal/MyModal";
import UserUpdate from "../../Components/UserUpdate/UserUpdate";
const { Column, ColumnGroup } = Table;
const Users = () => {
  const [deletState, setDeleteState] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [updateState, SetUpdateState] = useState();
  const [openUpdate, SetOpenUpdate] = useState(false);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    return dispatch(getUsers());
  }, []);
  const showDeleteModal = (record) => {
    setOpenDelete(true);
    setDeleteState(record);
  };
  const showUpdateModal = (record) => {
    SetOpenUpdate(true);
    SetUpdateState(record);
  };
  const handleDeleteCancel = () => {
    setOpenDelete(false);
  };
  const handleUpdateCancel = () => {
    SetOpenUpdate(false);
  };
  const deleteUserById = (id) => {
    dispatch(deleteUser({ id }));
    setOpenDelete(false);
    dispatch(getUsers());
  };

  return (
    <>
      <MainLayout>
        <div className="userContainer">
          <Table dataSource={user.users}>
            <Column title="نام" dataIndex="firstName" key="firstName" />
            <Column title="نام خانوادگی" dataIndex="lastName" key="lastName" />
            <Column title="ایمیل" dataIndex="email" key="email" />
            <Column title="رول" dataIndex="role" key="role" />
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
        </div>
      </MainLayout>
      <MyModal
        open={openDelete}
        handleCancel={handleDeleteCancel}
        modalTitle="حذف کاربر"
        footer={[
          <Button type="primary" onClick={() => deleteUserById(deletState._id)}>
            بله
          </Button>,
          <Button onClick={handleDeleteCancel}>خیر</Button>,
        ]}
      >
        <div>
          <h4 style={{ direction: "rtl" }}>
            میخواهید {deletState && deletState.firstName} حذف کنید
          </h4>
        </div>
      </MyModal>
      <MyModal
        width={1000}
        open={openUpdate}
        handleCancel={handleUpdateCancel}
        modalTitle="آپدیت کاربر"
        footer={[]}
      >
        <UserUpdate
          updateState={updateState}
          handleUpdateCancel={handleUpdateCancel}
        />
      </MyModal>
    </>
  );
};

export default Users;
