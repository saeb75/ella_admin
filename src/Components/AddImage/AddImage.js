import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Button, Col, Image, Pagination, Row } from "antd";
import { getImage } from "../../Action/ImageAction";
const AddImage = ({ fileList, handleAdd, handleDelete }) => {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.image);
  useEffect(() => {
    dispatch(getImage());
  }, []);

  let myImages = image.images._images;
  let totalPage = image.images.totalPage;

  const handleButton = (id) => {
    console.log(fileList.includes(id));
    if (fileList.includes(id)) {
      return true;
    } else {
      return false;
    }
  };
  const handleChage = (page) => {
    dispatch(getImage(page));
  };
  return (
    <div>
      <Row>
        {myImages &&
          myImages.map((item, index) => {
            return (
              <Col lg={4} md={4} key={index} className="imgCol">
                <Image
                  preview={{
                    src: ` ${item.image}`,
                  }}
                  width={100}
                  src={item.image}
                  height={100}
                />
                {!handleButton(item._id) ? (
                  <Button
                    type="primary"
                    style={{ marginTop: 10 }}
                    onClick={() => handleAdd(item._id)}
                  >
                    انتخاب
                  </Button>
                ) : (
                  <Button
                    style={{ marginTop: 10 }}
                    onClick={() => handleDelete(item._id)}
                  >
                    حذف
                  </Button>
                )}
              </Col>
            );
          })}
      </Row>
      <Pagination
        defaultCurrent={1}
        total={totalPage * 10}
        onChange={handleChage}
      />
    </div>
  );
};

export default AddImage;
