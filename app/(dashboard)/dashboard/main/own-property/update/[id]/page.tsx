'use client'
import { useParams } from 'next/navigation';

const UpdatePropertyPage = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default UpdatePropertyPage;