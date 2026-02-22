import PropertyDetailsForm from "@/components/dashboard/property/PropertyDetailsForm";
import PropertyForm from "@/components/dashboard/property/PropertyForm";
import Location from "@/components/home/property/Location";

const AddProperty = () => {
  return (
    <div>
      <PropertyForm />
      <PropertyDetailsForm />
      <div className='mt-5'>
        <Location address={"South Suburbs, Chicago"} />
      </div>
    </div>
  );
};

export default AddProperty;
