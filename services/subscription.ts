import axiosClient from "@/lib/axiosClient";

export const CreateSubscription = async () => {
  try {
    const response = await axiosClient.post('/payment');
    console.log('Subscription created:', response.data);
    return response.data; 
    
  } catch (error: any) {

    console.error('Subscription error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    

    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to create subscription'
    );
  }
}