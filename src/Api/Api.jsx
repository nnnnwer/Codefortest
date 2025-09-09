import axios from "axios";
import { redirect } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_HTTP_URL}`;

const api = axios.create({
baseURL: API_URL,
});


export async function apiGet(path,token) {
// if (!token) {
// return redirect('/auth');
// }
const response = await api.get(path,
{ headers:{
// "Content-Type": "application/json" ,
"Authorization": `Bearer ${token}`,
}}
);
return response.data;
}

export async function apiPost(path, data, isFormData = false, token) {
const headers = {};

if (isFormData) 
    {
headers["Content-Type"] = "multipart/form-data";
} else {
headers["Content-Type"] = "application/json";
}

if (token) {
headers["Authorization"] = `Bearer ${token}`;
}

const response = await api.post(path, data, { headers });
return response.data;
}



export async function apiPut(path, data,token) {
const response = await api.put(path, data,
{
headers:{
// "Content-Type": "application/json" ,
"Authorization": `Bearer ${token}`,
}

}
);
return response.data;
}

export async function apiDelete(path,token) {
const response = await api.delete(path,{
headers:{
// "Content-Type": "application/json" ,
"Authorization": `Bearer ${token}`,
}
});
return response.data;
}