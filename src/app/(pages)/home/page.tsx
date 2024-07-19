import HomeAbout from "@/components/home-about/page";
import HomeHero from "@/components/home-hero/page";
import React from "react";

type Props = {};

function Homepage({}: Props) {
  return (
    <>
      <HomeHero />
      <HomeAbout />
    </>
  );
}

export default Homepage;
