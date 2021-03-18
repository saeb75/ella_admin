import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import BestCategory from "../../Components/BestCategory/BestCategory";
import MainLayout from "../../Components/MainLayout/MainLayout";
import { getBanner } from "../../Action/bannerAction";
const Banner = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanner());
  }, []);
  return (
    <MainLayout>
      <BestCategory />
    </MainLayout>
  );
};

export default Banner;
