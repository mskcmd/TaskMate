// import React, { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface User {
//   _id: User | null;
//   name: string;
//   email: string;
// }

// interface ChatContextType {
//   user: User | null;
//   setUser: React.Dispatch<React.SetStateAction<User | null>>;
// }

// const ChatContext = createContext<ChatContextType | undefined>(undefined);

// const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserInfo = async () => {
//       try {
//         const storedUserData = localStorage.getItem("userData");
        
//         if (storedUserData) {
//           const userInfo: any = JSON.parse(storedUserData);
//           setUser(userInfo.data);
//         } else {
//           navigate("/login"); 
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load user data");
//         navigate("/home");
//       }
//     };

//     fetchUserInfo();
//   }, [navigate]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <ChatContext.Provider 
//       value={{ 
//         user, 
//         setUser 
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };

// export const useChatState = () => {
//   const context = useContext(ChatContext);
  
//   if (context === undefined) {
//     throw new Error('useChatState must be used within a DataProvider');
//   }
  
//   return context;
// };

// export default DataProvider;

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"; 
import { useNavigate } from "react-router-dom"; 
 
interface User { 
  _id: string | null; 
  name: string; 
  email: string; 
} 
 
interface ChatContextType { 
  user: User | null; 
  setUser: React.Dispatch<React.SetStateAction<User | null>>; 
} 
 
const ChatContext = createContext<ChatContextType | undefined>(undefined); 
 
const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => { 
  const [user, setUser] = useState<User | null>(null); 
  const [error, setError] = useState<string | null>(null); 
  const [isLoading, setIsLoading] = useState(true);
 
  const navigate = useNavigate(); 
 
  const fetchUserInfo = useCallback(async () => {
    try { 
      const storedUserData = localStorage.getItem("userData"); 
       
      if (storedUserData) { 
        const userInfo: any = JSON.parse(storedUserData); 
        setUser(userInfo.data); 
      } else { 
        navigate("/login");  
      }
    } catch (err) { 
      console.error(err); 
      setError("Failed to load user data"); 
      navigate("/home"); 
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);
 
  useEffect(() => { 
    fetchUserInfo();
  }, [fetchUserInfo]); 
 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) { 
    return <div>Error: {error}</div>; 
  } 
 
  return ( 
    <ChatContext.Provider  
      value={{  
        user,  
        setUser  
      }} 
    > 
      {children} 
    </ChatContext.Provider> 
  ); 
}; 
 
export const useChatState = () => { 
  const context = useContext(ChatContext); 
   
  if (context === undefined) { 
    throw new Error('useChatState must be used within a DataProvider'); 
  } 
   
  return context; 
}; 
 
export default DataProvider;