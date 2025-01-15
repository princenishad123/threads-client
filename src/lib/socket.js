import { io } from 'socket.io-client';

// Connect to the server
let socket;

export const connectSocket = (userId) => {

 

    if (!socket || socket.disconnected) {
        socket = io(import.meta.env.VITE_SERVER_URL, {
            query: {
                userId:userId
            }

        }); // Replace with your server's URL
    }
 
  return socket;
};



export const disconnectSocket =()=> {
    if (socket) {
      socket.disconnect()
    }
}

export const getSocket = ()=>socket;


