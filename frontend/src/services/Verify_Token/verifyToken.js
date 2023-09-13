import axios from 'axios';

const URI_Credentials = process.env.URI_TokenVerication || "http://localhost:8082/verify_token";

export const verify_token = async(data)=>{
    try{
        return await axios.post(`${URI_Credentials}` , data)
            .then((response)=>{
                return response.data;
            })
            .catch((error)=>{
                return {code:-1 , role:'Invalid' , message:'Failed to verify token'}
            })
    }
    catch(err){
        return {code:-1 , role:'Invalid' , message:'Failed to verify token'}
    }
}
