import { commonAPI } from "./CommonAPI"
import { Server_URL } from "./Server_URL"
//user register,login,and get
export const registerUserAPI=async(userdata)=>{
  return await commonAPI("POST",`${Server_URL}/register`,userdata,"")
}
export const loginUserAPI=async(userdata)=>{
  return await commonAPI("POST",`${Server_URL}/login`,userdata,"")
}
export const getUserDetailsAPI=async(reqHeader)=>{
  return await commonAPI("GET",`${Server_URL}/profiledata`,"",reqHeader)
}

//adding turf in admin
export const sendTurfDataAPI=async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${Server_URL}/addturf`,reqBody,reqHeader)
}
//get turfdata of single admin
export const getTurfDataAPI=async(reqHeader)=>{
  return await commonAPI("GET",`${Server_URL}/getturf`,"",reqHeader)
}
//change booking status api
export const changeStatusAPI=async(reqBody,reqHeader)=>{
return await commonAPI("PATCH",`${Server_URL}/changestatus`,reqBody,reqHeader)
}
//get all turfdata from turfs collection
export const getAllTurfsAPI=async()=>{
  return await commonAPI("GET",`${Server_URL}/getallturfs`)
}
//get view turf
export const getViewTurfAPI=async(id)=>{
  return await commonAPI("GET",`${Server_URL}/getviewturf${id}`,{},"")
}