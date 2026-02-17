import ContactForm from "@/components/home/contact/ContactForm";
import FAQ from "@/components/home/contact/FAQ";
import QuickContact from "@/components/home/contact/QuickContact";
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
    </div>
  );
}
