import React, { createContext, useEffect, useState } from 'react'
export const TokenAuthContext=createContext()
function TokenAuth({children}) {
  const[isAuthorized,setIsAuthorized]=useState(false)
  const [isUser, setIsUser] = useState(false);
  useEffect(()=>{
    const token=sessionStorage.getItem("token")
    const role=sessionStorage.getItem("role")
    if(token && role==="turfadmin"){
      setIsAuthorized(true)
      setIsUser(false);
    }
    else if(token && role==="user"){
      setIsUser(true) 
      setIsAuthorized(false)     
    }
    else{
      setIsAuthorized(false)
      setIsUser(false)
    }
  },[isAuthorized,isUser])
  return (
    <div>
<TokenAuthContext.Provider value={{isAuthorized,setIsAuthorized,isUser,setIsUser}}>
  {children}
</TokenAuthContext.Provider>

    </div>
  )
}

export default TokenAuth