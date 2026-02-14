import Title from "../shared/Title/Title";

export default function DiscoverProperties() {
  return (
    <div className='text-(--primary-text-color) '>
      <Title
        title={"Discover Your Dream Home"}
        subtitle={
          "Browse our hand picked selection of premium properties in the most desirable locations."
        }
        titleClass={"max-w-210 text-4xl md:text-[48px] font-bold"}
        subtitleClass={
          "text-lg font-light text-xl md:text-[24px] mb-10 md:mb-12 max-w-3xl mt-3.25"
        }
      />
    </div>
  );
}
