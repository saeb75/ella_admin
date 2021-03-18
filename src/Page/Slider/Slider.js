import { Button, Col, Input, Row } from "antd";
import Form, { List } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import AddImage from "../../Components/AddImage/AddImage";
import MainLayout from "../../Components/MainLayout/MainLayout";
import MyModal from "../../Components/Modal/MyModal";
import { useForm } from "react-hook-form";
import "./slider.css";
import { useDispatch, useSelector } from "react-redux";
import { addSlide, getSlides } from "../../Action/SliderAction";
const Slider = () => {
  const [sliderInfo, setSliderInfo] = useState([]);
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [updatedSlide, setUpdatedSlide] = useState("");
  const { errors, handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const slider = useSelector((state) => state.slider);
  let listSlides = [];
  useEffect(() => {
    dispatch(getSlides());
  }, []);
  useEffect(() => {
    if (slider.slider.slides) {
      slider.slider.slides.map((item) => {
        return listSlides.push({
          id: item._id,
          image: item.image._id,
          infoDesc: item.infoDesc,
          infoTitle: item.infoTitle,
          button: item.button,
          infoLocation: item.infoLocation,
          link: item.link,
          category: item.category,
        });
      });
      setSliderInfo(listSlides);
    }
  }, [slider.slider]);

  const handleAdd = (image) => {
    let addSlider = sliderInfo.map((item) => {
      return item.id == updatedSlide.id ? { ...item, image } : { ...item };
    });
    const updatedSlider = addSlider.filter(
      (item) => item.id === updatedSlide.id
    );

    setUpdatedSlide(updatedSlider[0]);
    setSliderInfo(addSlider);
  };

  const addInfoContainer = () => {
    setSliderInfo([
      ...sliderInfo,
      {
        id: Date.now(),
        image: "",
        infoDesc: "",
        infoTitle: "",
        button: "",
        infoLocation: "",
        link: "",
        category: "",
      },
    ]);
  };
  const deleteContainer = (id) => {
    const updatedSlider = sliderInfo.filter((item) => item.id != id);
    setSliderInfo(updatedSlider);
  };
  const openAddImage = (item) => {
    setUpdatedSlide(item);
    setAddImageOpen(true);
  };
  const canselAddImage = () => {
    setAddImageOpen(false);
  };

  const handleDelete = () => {
    let deleteSliderImage = sliderInfo.map((item) => {
      return item.id == updatedSlide.id ? { ...item, image: "" } : { ...item };
    });
    const updatedSlider = deleteSliderImage.filter(
      (item) => item.id === updatedSlide.id
    );

    setUpdatedSlide(updatedSlider[0]);
    setSliderInfo(deleteSliderImage);
  };
  const onsubmit = () => {
    let ImageRequired = sliderInfo.find((item) => item.image === "");
    if (ImageRequired) {
      return;
    } else {
      dispatch(addSlide(sliderInfo));
    }
  };
  const handleChange = (id, name, value) => {
    let changeSliderInfo = sliderInfo.map((item) => {
      return item.id === id ? { ...item, [name]: value } : { ...item };
    });
    setSliderInfo(changeSliderInfo);
  };

  return (
    <MainLayout>
      <form onSubmit={handleSubmit(onsubmit)}>
        <Row gutter={[16, 24]}>
          {sliderInfo.map((item, index) => {
            return (
              <Col lg={8} md={8} key={index}>
                <div className="add_slider">
                  <Button onClick={() => openAddImage(item)}>add Image</Button>
                  <label>link</label>
                  <input
                    type="text"
                    name={`link${item.id}`}
                    ref={register({ required: true })}
                    value={item.link}
                    onChange={(e) =>
                      handleChange(item.id, "link", e.target.value)
                    }
                  />
                  <label>category</label>
                  <input
                    type="text"
                    name={`category${item.id}`}
                    value={item.category}
                    onChange={(e) =>
                      handleChange(item.id, "category", e.target.value)
                    }
                    ref={register({ required: true })}
                  />
                  <label>infoTitle</label>
                  <input
                    type="text"
                    name={`infoTitle${item.id}`}
                    value={item.infoTitle}
                    onChange={(e) =>
                      handleChange(item.id, "infoTitle", e.target.value)
                    }
                    ref={register({ required: true })}
                  />
                  <label>infoDesc</label>
                  <input
                    type="text"
                    name={`infoDesc${item.id}`}
                    value={item.infoDesc}
                    onChange={(e) =>
                      handleChange(item.id, "infoDesc", e.target.value)
                    }
                    ref={register({ required: true })}
                  />
                  <label>infoLocation</label>
                  <input
                    type="text"
                    name={`infoLocation${item.id}`}
                    ref={register({ required: true })}
                    value={item.infoLocation}
                    onChange={(e) =>
                      handleChange(item.id, "infoLocation", e.target.value)
                    }
                  />
                  <label>button</label>
                  <input
                    type="text"
                    name={`button${item.id}`}
                    ref={register({ required: true })}
                    value={item.button}
                    onChange={(e) =>
                      handleChange(item.id, "button", e.target.value)
                    }
                  />
                </div>

                <Button onClick={() => deleteContainer(item.id)}>delete</Button>
              </Col>
            );
          })}
          <Col lg={8} md={8}>
            <Button onClick={addInfoContainer}>add container</Button>
          </Col>
        </Row>
        <button type="submit">submit</button>
      </form>
      <MyModal
        width={1000}
        modalTitle="add slide"
        open={addImageOpen}
        handleCancel={canselAddImage}
        footer={[<Button onClick={canselAddImage}>بستن</Button>]}
      >
        <AddImage
          handleAdd={handleAdd}
          fileList={updatedSlide.image}
          handleDelete={handleDelete}
        />
      </MyModal>
    </MainLayout>
  );
};

export default Slider;
