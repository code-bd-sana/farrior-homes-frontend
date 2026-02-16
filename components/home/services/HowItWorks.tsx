import Title from "@/components/shared/Title/Title";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Tell Us What You Need",
      subTitle: "Share your requirements and preferences",
    },
    {
      step: "02",
      title: "Browse Properties",
      subTitle: "Explore curated listings matching your criteria",
    },
    {
      step: "03",
      title: "Visit & Evaluate",
      subTitle: "Schedule tours and inspect properties",
    },
    {
      step: "04",
      title: "Close the Deal",
      subTitle: "Complete paperwork and move in",
    },
  ];
  return (
    <div>
      <div className='bg-[#A3C7B3] text-center py-12 md:px-35 mt-8'>
        <Title
          title={"How It Works"}
          titleClass={"text-4xl  md:text-[64px]"}
          subtitle={
            "Our streamlined process makes finding your perfect property simple and stress-free"
          }
          subtitleClass={
            "text-xl md:text-[24px] text-[#70706C] md:max-w-[700px] jost-400 mx-auto pb-5"
          }
        />
        <div className='grid grid-cols-1 md:grid-cols-4 gap-y-7 md:py-12'>
          {steps.map((step, idx) => (
            <div
              key={idx + 1}
              className='flex flex-col items-center justify-between text-center'>
              <div className='w-12 h-12 md:w-18 md:h-18 bg-white rounded-full flex items-center justify-center mb-6 md:mb-8'>
                <div className='text-2xl text-[#619B7F] font-normal'>
                  {step.step}
                </div>
              </div>
              <Title
                title={step.title}
                subtitle={step.subTitle}
                titleClass='text-(--primary-text-color) text-xl md:text-[24px] font-semibold mb-2 jost-400'
                subtitleClass='text-[#70706C] text-sm md:text-base'
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
