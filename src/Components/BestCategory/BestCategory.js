import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBanner } from "../../Action/bannerAction";
import AddImage from "../AddImage/AddImage";
import MyModal from "../Modal/MyModal";
import "./bestCategory.css";
const BestCategory = () => {
  const { errors, register, handleSubmit } = useForm();
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [addImage, setAddImage] = useState("");
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner);
  const [bestCategory, setBestCategory] = useState([
    {
      id: Math.random(),
      image: "",
      category: "",
      link: "",
    },
    {
      id: Math.random(),
      image: "",
      category: "",
      link: "",
    },
    {
      id: Math.random(),
      image: "",
      category: "",
      link: "",
    },
  ]);
  useEffect(() => {
    if (banner.bestCategory) {
      let list = [];
      banner.bestCategory.banners.map((item) => {
        list.push({
          ...item,
          id: item._id,
          image: item.image._id,
        });
      });
      setBestCategory(list);
    }
  }, [banner.bestCategory]);
  const handleAdd = (image) => {
    let addBanner = bestCategory.map((item) => {
      return item.id == addImage.id ? { ...item, image } : { ...item };
    });
    const updatedSlider = addBanner.filter((item) => item.id === addImage.id);

    setAddImage(updatedSlider[0]);
    setBestCategory(addBanner);
  };

  const canselAddImage = () => {
    setAddImageOpen(false);
  };
  const openImageModal = (item) => {
    setAddImageOpen(true);
    setAddImage(item);
  };
  const handleDelete = () => {
    let deleteSliderImage = bestCategory.map((item) => {
      return item.id == addImage.id ? { ...item, image: "" } : { ...item };
    });
    const updatedSlider = deleteSliderImage.filter(
      (item) => item.id === addImage.id
    );

    setAddImage(updatedSlider[0]);
    setBestCategory(deleteSliderImage);
  };
  const handleChange = (id, name, value) => {
    let updatedList = bestCategory.map((item) => {
      return item.id === id ? { ...item, [name]: value } : { ...item };
    });
    setBestCategory(updatedList);
  };
  const onsubmit = (data) => {
    let ImageRequired = bestCategory.find((item) => item.image === "");
    if (ImageRequired) {
      return;
    } else {
      dispatch(addBanner(bestCategory, "bestCategory"));
    }
  };
  return (
    <div>
      <div className="best_Category_banner">
        <form onSubmit={handleSubmit(onsubmit)}>
          <Row>
            {bestCategory.map((item) => {
              return (
                <>
                  <Col lg={8} md={8}>
                    <Button onClick={() => openImageModal(item)}>
                      add Image
                    </Button>
                    <label>category</label>
                    <input
                      name={`category${item.id}`}
                      ref={register({ required: true })}
                      type="text"
                      value={item.category}
                      onChange={(e) =>
                        handleChange(item.id, "category", e.target.value)
                      }
                    />
                    <label>link</label>
                    <input
                      name={`link${item.id}`}
                      ref={register({ required: true })}
                      type="text"
                      value={item.link}
                      onChange={(e) =>
                        handleChange(item.id, "link", e.target.value)
                      }
                    />
                  </Col>
                </>
              );
            })}
          </Row>
          <button type="submit">submit</button>
        </form>
      </div>
      <MyModal
        width={1000}
        modalTitle="add banner"
        open={addImageOpen}
        handleCancel={canselAddImage}
        footer={[<Button onClick={canselAddImage}>بستن</Button>]}
      >
        <AddImage
          handleAdd={handleAdd}
          fileList={addImage.image}
          handleDelete={handleDelete}
        />
      </MyModal>
    </div>
  );
};

export default BestCategory;
