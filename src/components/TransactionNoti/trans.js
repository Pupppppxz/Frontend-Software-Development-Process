import './trans.css';
import React from "react";
import {Row,Col,Form,Button} from 'react-bootstrap'
import img_bin from '../../Assets/img/Trans/bin.png'
import axios from 'axios';

const Trans = (props)=>{
    const token = localStorage.getItem("token")
    const [inputChat,setInputChat]= React.useState('');
    const noti = props.noti
    const [mini,setMini]= React.useState(true);

 
    function sendMsg(){
        let tk = token.split(" ")[1]
        console.log(noti._id)
        console.log(inputChat)
        axios.post(`http://localhost:1000/api/noti-reply`,{
            notificationId :noti._id,
            message : inputChat,
        },
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res.data)
            setInputChat('')
        });     
    }

    function onCancel(){
        let tk = token.split(" ")[1]
        axios.put(`http://localhost:1000/api/noti-customer`,{
            accept :true,
            cancel :true,
            notificationId :noti._id,
        },
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res.data)
        }).catch((e) => {
            console.log(e.response.data.message);
        });;     
    }

    React.useEffect(()=>{
        
    }, []);

    return(
        <div className='card-trans'  >
            {mini?(
                <div align='left' className='Click' onClick={()=>{setMini(!mini)}} >
                    <h4>{noti.nameApartment}</h4>
                    ชนิดห้อง : {noti.roomType}<br/>
                    ราคา : {noti.rentalFee}<br></br><br />
                    {noti.statusAccept===false&&noti.statusCancel===false?(<p className='bt-userInfo-success' align="left" >รอการอนุมัติ</p>):(<div></div>)}
                    {noti.statusAccept===true&&noti.statusCancel===false?(<p className='bt-userInfo-approve' align="left" >อนุมัติแล้ว</p>):(<div></div>)}
                    {noti.statusCancel===true&&noti.statusAccept===false?(<p className='bt-userInfo-reset' align="left" >ถูกปฏิเสธแล้ว</p>):(<div></div>)}
                    {noti.statusCancel===true&&noti.statusAccept===true?(<p className='bt-userInfo-reset' align="left" >ถูกยกเลิกแล้ว</p>):(<div></div>)}
                </div>
            ):(
            <div>
                <Row>
                    <Col md={5}>
                        <div>
                            <h4 className='Click' onClick={()=>{
                                setMini(!mini)
                                console.log(noti)
                            }}>
                            {noti.nameApartment}</h4><br></br>
                            ชนิดห้อง : {noti.roomType}<br></br>
                            ราคา : {noti.rentalFee}<br></br>
                            พิกัดละติจูด : {noti.locationX}<br></br>
                            พิกัดลองจิจูด : {noti.locationY}<br></br>
                            วันที่นัดหมาย : วันที่ {noti.chat[0].dateTrans.split("-")[2]} เดือน {noti.chat[0].dateTrans.split("-")[1]} ปี {noti.chat[0].dateTrans.split("-")[0]}<br></br>
                            เวลานัดหมาย : {noti.chat[0].timeTrans}<br></br>
                            เจ้าของหอพัก : {noti.nameOwner}<br></br><br></br>
                            {noti.statusAccept===false&&noti.statusCancel===false?(<p className='bt-userInfo-success' align="left" >รอการอนุมัติ</p>):(<div></div>)}
                            {noti.statusAccept===true&&noti.statusCancel===false?(
                                <div>   
                                    <p className='bt-userInfo-approve' align="left" >อนุมัติแล้ว</p>
                                    <br></br>
                                    <button className='bt-userInfo-reset' align="left" 
                                        onClick={()=>{
                                            onCancel()
                                        }}
                                    >ยกเลิกการนัดหมาย</button>
                                </div>
                            ):(<div></div>)}
                            {noti.statusCancel===true&&noti.statusAccept===false?(<p className='bt-userInfo-reset' align="left" >ถูกปฏิเสธแล้ว</p>):(<div></div>)}
                            {noti.statusCancel===true&&noti.statusAccept===true?(<p className='bt-userInfo-reset' align="left" >ถูกยกเลิกแล้ว</p>):(<div></div>)}
                        </div>
                    </Col>
                    <Col md={7}>
                        <h4>chat</h4>
                        <div className='boxChat'>
                            {noti.chat.map((msg) => (
                                <div>
                                    {msg.from=="customer"?(
                                        <div align='right' >
                                        <Col md={6} >
                                        <div className='customerText' align='left'>{msg.message}</div>
                                        </Col>
                                        </div>
                                    ):(<div></div>)} 
                                    {msg.from=="owner"?(
                                        <div align='left' >
                                        <Col md={6} >
                                        <div className='ownerText' align='left'>{msg.message}</div>
                                        </Col>
                                        </div>
                                    ):(<div></div>)} 
                                </div>
                            ))}   
                        </div>
                        <br></br>
                        {noti.statusAccept===true?(<div></div>):(
                            <Row>
                                <Col md={9}>                        
                                    <Form.Control as="textarea" placeholder="พิมพ์ข้อความ" onChange={(e) => {
                                        setInputChat(e.target.value)
                                    }} value={inputChat} />
                                </Col>
                                <Col md={3}>    
                                    <p
                                        className='bt-userInfo-test'
                                        onClick={()=>{
                                            sendMsg()
                                        }}
                                    >ส่ง</p>
                                </Col>
                            </Row>
                        )}
                    </Col>
                </Row>
            </div>)} 
        </div>
    )
}
export default Trans;