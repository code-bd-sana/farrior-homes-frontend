import ContactForm from "@/components/home/contact/ContactForm";
import FAQ from "@/components/home/contact/FAQ";
import QuickContact from "@/components/home/contact/QuickContact";
import Location from "@/components/home/property/Location";
import PageTitle from "@/components/shared/pagetitle/PageTitle";

export default function page() {
  return (
    <div>
      <div>
        <PageTitle
          title='Get in Touch'
          subtitle='Have questions? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.'
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:mx-12.5 px-6 lg:px-8 my-6 md:my-12'>
        <div>
          <ContactForm />
        </div>
        <div className='flex flex-col gap-4'>
          <div className='border border-[#D1CEC6] rounded-lg p-6'>
            <QuickContact />
          </div>
          <div className='border border-[#D1CEC6] rounded-lg p-6'>
            <FAQ />
          </div>
        </div>
      </div>
      <div className='border border-[#D1CEC6] rounded-lg p-3 md:p-6 mx-6 md:mx-19 px-3 lg:px-8 my-6 md:my-12'>
        <p className='text-4xl mb-3 border-b border-[#D1CEC6] pb-2 '>
          Location
        </p>
        <Location address={"South Suburbs, Chicago"} />
      </div>
    </div>
  );
}
