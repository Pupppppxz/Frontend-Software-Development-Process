import './box.css';
import React from "react";
import {Row,Col,Button,Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';



const BoxAvailRoom = (props)=>{
    const token = localStorage.getItem("token")
    
    const [status,setStatus] = React.useState(false);
   
    React.useEffect(()=>{
        setStatus(props.avail)
    },[]);



    function sendStatus(){
        let tk = token.split(" ")[1]
            axios.put(`http://localhost:1000/api/room-update`,{
                roomId : props.dataRoom._id,
                roomNumber : props.num ,
                available : !status
            },
            {       
                headers: {
                    'Authorization': 'Bearer ' + tk,   
                },
            }).then((res) => {
               
            });
    }

    function deleteRoom(){
        let tk = token.split(" ")[1]
        axios.delete(`http://localhost:1000/api/room-delete`,{       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
            data: {
                roomId : props.dataRoom._id,
                roomNumber : props.num ,
                apartmentId : props.dataRoom.apartmentId
            },
        },).then((res) => {
               props.setActionDel(!props.actionDel)
        });
    }



    return(
        <div className='frameBox'>
            {status?(
                <div className='boxAvailGreen' align='center'>
                    <div className='whiteBox'
                        onClick={()=>{
                            if(props.edit){
                            setStatus(!status)
                            sendStatus()
                            }
                        }}
                    >
                        ห้อง{props.num}<br></br>
                        ว่าง
                    </div>
                    <br></br>
                    {props.edit?(
                        <div>
                            <Button
                                variant='danger'
                                onClick={()=>{
                                    deleteRoom()
                                }}
                            >ลบ</Button>
                        </div>
                    ):(
                        <div></div>
                    )}
                    
                </div>
            ):(
                <div className='boxAvailRed'  align='center'>
                   <div className='whiteBox'
                        onClick={()=>{
                            if(props.edit){
                            setStatus(!status)
                            sendStatus()
                            }
                        }}
                    >
                        ห้อง{props.num}<br></br>
                        ไม่ว่าง
                    </div>
                    <br></br>
                    {props.edit?(
                        <div>
                            <Button
                                variant='danger'
                                onClick={()=>{
                                    deleteRoom()
                                }}
                            >ลบ</Button>
                        </div>
                    ):(
                        <div></div>
                    )}
                </div>
            )}
            
            
        </div>

    )
}
export default BoxAvailRoom;