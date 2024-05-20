import axios from "axios"
import { useState } from "react";


const instance = axios.create({
    baseURL: 'http://localhost:3000/api/',
  
  });
 
export async function Post(body:object,api: string){
    
    try {
        const response = await instance.post(api, body);
        // Handle success
        console.log('POST request successful');
        console.log('Response data:', response.data);
        return response.data; // Return response data
    } catch (error) {
        // Handle error
        console.error('Error making POST request:', error);
        throw error; // Throw error to be caught by caller
    } 
}
export async function Get(api: string) {
    try {
        const response = await instance.get(api);
        // Handle success
        console.log('GET request successful');
        console.log('Response data:', response.data);
        return response.data; // Return response data
    } catch (error) {
        // Handle error
        console.error('Error making GET request:', error);
        throw error; // Throw error to be caught by caller
    }
}
export async function Delete(api: string) {
    try {
        const response = await instance.delete(api);
        // Handle success
        console.log('DELETE request successful');
        console.log('Response data:', response.data);
        return response.data; // Return response data
    } catch (error) {
        // Handle error
        console.error('Error making DELETE request:', error);
        throw error; // Throw error to be caught by caller
    }
}
export async function Put(api: string, body: object) {
    try {
        const response = await instance.put(api, body);
        // Handle success
        console.log('PUT request successful');
        console.log('Response data:', response.data);
        return response.data; // Return response data
    } catch (error) {
        // Handle error
        console.error('Error making PUT request:', error);
        throw error; // Throw error to be caught by caller
    }
}