import axios from "axios"
import { LOGIN } from "./apiConstants"



export const login = async (data) =>{
    return axios.post(LOGIN,data)
}

export function getToken(){
    let token = localStorage.getItem('token')
    return token;
   
}

export function getLoggedInUser() {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
  
    // Check if the token exists
    if (token) {
      try {
        // Parse the token (assuming it's a JSON Web Token, JWT)
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
  
        // Assuming the token contains a 'user' object with username and role
        if (decodedToken && decodedToken.user) {
          return decodedToken.user;
        }
      } catch (error) {
        // Handle token parsing errors
        console.error('Error parsing token:', error);
      }
    }
  
   
    return null;
  }
  