import { Navigate } from "react-router-dom"
import useStore from "../../store/store"
import useWebSocket from "react-use-websocket";
import { useEffect, useRef } from "react";
import throttle from "lodash.throttle";
import Cursor from "../Cursor";

type userType = {
    username:string,
    state:{
        x:number,
        y:number
    }
}
const renderCursors = (users:{[key:string]:userType}) => {
    return Object.keys(users).map(key => {
        const user = users[key]
        return (
            <Cursor key={key} point={[user.state.x,user.state.y]}/>
        )
    })

}

function Home() {
    const { username } = useStore()

    const WS_URL = "ws://localhost:3000";
    const {sendJsonMessage, lastJsonMessage} = useWebSocket(WS_URL,{
        queryParams: { username }
    });

    const TH = 50;

    const sendThrottledMessage = useRef(throttle(sendJsonMessage,TH))

    useEffect(()=>{
        window.addEventListener("mousemove",e => {
            sendThrottledMessage.current({x:e.clientX,y:e.clientY})
        })
    })

    if(!username){
        return <Navigate to="/login" />
    }
   
    if(lastJsonMessage){
        const user = lastJsonMessage as { [key:string]:userType }
        return(
            <>
                {renderCursors(user)}
            </>
        )
    }
  return (
    <div>Username is {username}</div>
  )
}

export default Home