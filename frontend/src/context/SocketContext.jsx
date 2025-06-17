import React,{createContext , useEffect} from "react";
import {io} from "socket.io-client";

export const SocketContext = createContext();

const socket = io('http://localhost:4000')

export const SocketProvider = ({ children }) => {
  

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    
  }, [socket]);



  return (
    <SocketContext.Provider value={{socket}}>
      {children}
    </SocketContext.Provider>
  );
};