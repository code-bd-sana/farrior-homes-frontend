import { pageTitle } from "@/types/pageTitle";
import React from "react";
import Title from "../Title/Title";

const PageTitle: React.FC<pageTitle> = (props) => {
  const { title, subtitle } = props;

  return (
    <div className='bg-[#619B7F] text-center py-20'>
      <Title
        title={title}
        titleClass='text-5xl md:text-[64px] text-white'
        subtitle={subtitle}
        subtitleClass='text-xl md:text-[23px] text-white jost-400 max-w-3xl mx-auto pt-4'
      />
    </div>
  );
};

export default PageTitle;
