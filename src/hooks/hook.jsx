import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useErrors = (errors = [])=>{

    useEffect(()=>{

        errors.forEach(({isError, error, fallback})=>{
            if(isError){
                if(fallback) fallback();
                else toast.error(error?.data?.message || "An error occurred");
            }
        })
      },[errors]);
};

const useAsyncMutation = (mutationHook)=>{
    const [data, setData] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [mutate] = mutationHook();

    const excuteMutation = async (toastMessage, ...args)=>{
        setIsLoading(true);
        const toastId = toast.loading(toastMessage || "Updating data...");

        try {
            const res = await mutate(...args);
            if(res.data){
                setData(res.data);
                toast.success(res.data.message || "Data updated successfully",{id: toastId});
            }
            else{
                toast.error(res?.error?.data?.message || "Something went wrong",{id: toastId});
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong",{id: toastId});
        }
        finally{
            setIsLoading(false);
        }
    };

    return [excuteMutation, isLoading, data];
};




export { useErrors, useAsyncMutation};