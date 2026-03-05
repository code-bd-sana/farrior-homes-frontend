import axiosClient from "@/lib/axiosClient"

export const CreateSubscripiton = async()=>{
  const resp = await axiosClient.post('/payment');
  return resp;
}