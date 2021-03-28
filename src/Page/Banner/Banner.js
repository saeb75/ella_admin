import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BestCategory from "../../Components/BestCategory/BestCategory";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { getBanner } from "../../Action/bannerAction";
import FourthBanner from "../../Components/FourthBanner/FourthBanner";
import CollectionBanner from "../../Components/CollectionBanner/CollectionBanner";
const Banner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanner());
  }, []);
  return (
    <MainLayout>
      <BestCategory />
      <FourthBanner category={"homeFourthBanner"} />
      <FourthBanner category={"singleFourthBanner"} />
      <CollectionBanner />
    </MainLayout>
  );
};

export default Banner;
