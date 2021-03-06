import { Button, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addBanner } from "../../Action/bannerAction";
import AddImage from "../AddImage/AddImage";
import MyModal from "../Modal/MyModal";
import "./collectionBanner.css";
const CollectionBanner = () => {
  const { errors, register, handleSubmit } = useForm();
  const [addImageOpen, setAddImageOpen] = useState(false);
  const [addImage, setAddImage] = useState("");
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.banner);
  const [collection, setCollection] = useState([
    {
      id: Math.random(),
      image: "",
      category: "",
      infoTitle: "",
      infoDesc: "",
      button: "",
      link: "",
    },
    {
      id: Math.random(),
      image: "",
      category: "",
      infoTitle: "",
      infoDesc: "",
      button: "",
      link: "",
    },
  ]);
  useEffect(() => {
    if (banner.collection && banner.collection.banners.length > 0) {
      let list = [];

      banner.collection.banners.map((item) => {
        list.push({
          ...item,
          id: item._id,
          image: item.image._id,
        });
      });
      setCollection(list);
    }
  }, [banner.bestCategory]);
  const handleAdd = (image) => {
    let addBanner = collection.map((item) => {
      return item.id == addImage.id ? { ...item, image } : { ...item };
    });
    const updatedSlider = addBanner.filter((item) => item.id === addImage.id);

    setAddImage(updatedSlider[0]);
    setCollection(addBanner);
  };

  const canselAddImage = () => {
    setAddImageOpen(false);
  };
  const openImageModal = (item) => {
    setAddImageOpen(true);
    setAddImage(item);
  };
  const handleDelete = () => {
    let deleteSliderImage = collection.map((item) => {
      return item.id == addImage.id ? { ...item, image: "" } : { ...item };
    });
    const updatedSlider = deleteSliderImage.filter(
      (item) => item.id === addImage.id
    );

    setAddImage(updatedSlider[0]);
    setCollection(deleteSliderImage);
  };
  const handleChange = (id, name, value) => {
    let updatedList = collection.map((item) => {
      return item.id === id ? { ...item, [name]: value } : { ...item };
    });
    setCollection(updatedList);
  };
  const onsubmit = (data) => {
    let ImageRequired = collection.find((item) => item.image === "");
    if (ImageRequired) {
      return;
    } else {
      dispatch(addBanner(collection, "collection"));
    }
  };
  return (
    <div>
      <hr />
      <div className="best_Category_banner">
        <form onSubmit={handleSubmit(onsubmit)}>
          <Row>
            {collection.map((item) => {
              return (
                <>
                  <Col lg={12} md={12}>
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
                    <label>infoTitle</label>
                    <input
                      name={`infoTitle${item.id}`}
                      ref={register({ required: true })}
                      type="text"
                      value={item.infoTitle}
                      onChange={(e) =>
                        handleChange(item.id, "infoTitle", e.target.value)
                      }
                    />
                    <label>infoDesc</label>
                    <input
                      name={`infoDesc${item.id}`}
                      ref={register({ required: true })}
                      type="text"
                      value={item.infoDesc}
                      onChange={(e) =>
                        handleChange(item.id, "infoDesc", e.target.value)
                      }
                    />
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
        footer={[<Button onClick={canselAddImage}>????????</Button>]}
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

export default CollectionBanner;
