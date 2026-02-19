import SubscriptionContent from "@/components/dashboard/subscription/SubscriptionContent";

export default function UserSubscriptionPage() {
  return (
    <div>
      <h1 className='text-2xl font-semibold mb-6'>Subscription Plan</h1>

      <div id='plans' className='mb-6'>
        <SubscriptionContent />
      </div>

      <div id='billing'>
        <h2 className='text-xl font-semibold mb-3 border-b-2 border-gray-300 pb-2'>
          Billing
        </h2>
        <p className='text-[#70706C]'>
          Billing history and payment method details will appear here.
        </p>
      </div>
    </div>
  );
}
