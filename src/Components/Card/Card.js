import React from "react";
import photo from "./114203993.jpg";
import { Card, Avatar } from "antd";
import { EditOutlined, DeleteOutlined, StarOutlined } from "@ant-design/icons";

const { Meta } = Card;
const MyCard = ({
  item,
  HandleUpdateModal,
  handleDeleteModal,
  handleDiscount,
}) => {
  let { productImg, name } = item;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 300 }}
        cover={<img alt="example" src={productImg[0].img.image} />}
        actions={[
          <DeleteOutlined
            key="setting"
            onClick={() => handleDeleteModal(item)}
          />,
          <EditOutlined key="edit" onClick={() => HandleUpdateModal(item)} />,
          <StarOutlined
            key="discount"
            onClick={() => handleDiscount(item._id)}
          />,
        ]}
      >
        <Meta title={name} description="۸۸,۰۰۰ تومان" />
      </Card>
    </div>
  );
};

export default MyCard;
