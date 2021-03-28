import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBanner } from "../../Action/bannerAction";
import AddImage from "../AddImage/AddImage";
import MyModal from "../Modal/MyModal";
import "./fouthBanner.css";
const FouthBanner = ({ category }) => {
  const { errors, register, handleSubmit } = useForm();
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [addImage, setAddImage] = useState("");
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner);
  const [fouthBanner, setFouthBanner] = useState([
    {
      id: Math.random(),
      image: "",
      button: "",
      link: "",
    },
    {
      id: Math.random(),
      image: "",
      button: "",
      link: "",
    },
    {
      id: Math.random(),
      image: "",
      button: "",
      link: "",
    },
    {
      id: Math.random(),
      image: "",
      button: "",
      link: "",
    },
  ]);
  useEffect(() => {
    if (category == "homeFourthBanner") {
      if (banner.homeFourthBanner) {
        let list = [];
        banner.homeFourthBanner.banners.map((item) => {
          list.push({
            ...item,
            id: item._id,
            image: item.image._id,
          });
        });
        setFouthBanner(list);
      }
    } else {
      if (banner.singleFourthBanner) {
        let list = [];
        banner.singleFourthBanner.banners.map((item) => {
          list.push({
            ...item,
            id: item._id,
            image: item.image._id,
          });
        });
        setFouthBanner(list);
      }
    }
  }, [banner.singleFourthBanner]);
  const handleAdd = (image) => {
    let addBanner = fouthBanner.map((item) => {
      return item.id == addImage.id ? { ...item, image } : { ...item };
    });
    const updatedSlider = addBanner.filter((item) => item.id === addImage.id);

    setAddImage(updatedSlider[0]);
    setFouthBanner(addBanner);
  };

  const canselAddImage = () => {
    setAddImageOpen(false);
  };
  const openImageModal = (item) => {
    setAddImageOpen(true);
    setAddImage(item);
  };
  const handleDelete = () => {
    let deleteSliderImage = fouthBanner.map((item) => {
      return item.id == addImage.id ? { ...item, image: "" } : { ...item };
    });
    const updatedSlider = deleteSliderImage.filter(
      (item) => item.id === addImage.id
    );

    setAddImage(updatedSlider[0]);
    setFouthBanner(deleteSliderImage);
  };
  const handleChange = (id, name, value) => {
    let updatedList = fouthBanner.map((item) => {
      return item.id === id ? { ...item, [name]: value } : { ...item };
    });
    setFouthBanner(updatedList);
  };
  const onsubmit = (data) => {
    let ImageRequired = fouthBanner.find((item) => item.image === "");
    if (ImageRequired) {
      return;
    } else {
      dispatch(addBanner(fouthBanner, category));
    }
  };
  return (
    <div>
      <hr />
      <div className="fouth_banner">
        <form onSubmit={handleSubmit(onsubmit)}>
          <Row>
            {fouthBanner.map((item) => {
              return (
                <>
                  <Col lg={6} md={6}>
                    <Button onClick={() => openImageModal(item)}>
                      add Image
                    </Button>
                    <label>button</label>
                    <input
                      name={`button${item.id}`}
                      ref={register({ required: true })}
                      type="text"
                      value={item.button}
                      onChange={(e) =>
                        handleChange(item.id, "button", e.target.value)
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

export default FouthBanner;
