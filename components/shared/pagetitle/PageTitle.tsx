import { pageTitle } from "@/types/pageTitle";
import React from "react";
import Title from "../Title/Title";

const PageTitle: React.FC<pageTitle> = (props) => {
  const { title, subtitle } = props;

  return (
    <div className='bg-[#619B7F] text-center py-12'>
      <Title
        title={title}
        titleClass='text-[64px] text-white'
        subtitle={subtitle}
        subtitleClass='text-[24px] text-white jost-400'></Title>
    </div>
  );
};

export default PageTitle;
