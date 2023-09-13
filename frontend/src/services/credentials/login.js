import axios from 'axios';

const URI_Credentials = process.env.URI_Credentials || "http://localhost:8082/credentials";


export const loginUser = async(data)=>{

    try{
        return await axios.post(`${URI_Credentials}/api/login` , data)
        .then(async(response)=>{
            return response.data;
        })
        .catch((error)=>{
                return {code:-1 , message:'Unable to login'};
            }
        )
    }
    catch(err){
        return {code:-1 , message:err.message};
    }

    
}