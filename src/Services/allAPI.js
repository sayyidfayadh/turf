import { commonAPI } from "./CommonAPI"
import { Server_URL } from "./Server_URL"
//user register,login,and get,update
export const registerUserAPI=async(userdata)=>{
  return await commonAPI("POST",`${Server_URL}/register`,userdata,"")
}
//updateprofile
export const updateProfileAPI=async(userdata)=>{
  return await commonAPI("PATCH",`${Server_URL}/updateprofile`,userdata,"")
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
export const getTurfDataAPI=async(reqBody,reqHeader)=>{
  // console.log(reqBody);
  return await commonAPI("POST",`${Server_URL}/getturf`,reqBody,reqHeader)
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
//getslots in bookslot page
export const getSlotsAPI=async(reqBody)=>{
  return await commonAPI("POST",`${Server_URL}/getslots`,reqBody,"")
}

//book slot
export const bookSlotAPI=async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${Server_URL}/bookslot`,reqBody,reqHeader)
}
//offline slot or cancel
export const handleBookingAPI=async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${Server_URL}/handlebooking`,reqBody,reqHeader)
}
//userside cancel
export const handleCancelAPI=async(reqBody,reqHeader)=>{
  return await commonAPI("POST",`${Server_URL}/handlecancel`,reqBody,reqHeader)
}
//getallbookings for admin profile
export const getallbookingsAPI=async(reqHeader)=>{
  return await commonAPI("POST",`${Server_URL}/getallbookings`,{},reqHeader)
}


// superadmin

// get all admins
export const getAllAdminsAPI=async()=>{
  return await commonAPI("GET",`${Server_URL}/getalladmins`)
}
//add admin
export const addAdminAPI=async(admindata)=>{
  return await commonAPI("POST",`${Server_URL}/register`,admindata,"")
}