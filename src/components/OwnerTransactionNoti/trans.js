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

    function sendAnswer(ans){
        let tk = token.split(" ")[1]
        axios.put(`http://localhost:1000/api/noti-owner`,{
            accept :ans,
            cancel : !ans,
            notificationId :noti._id,
        },
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res.data)
        });     
    }

    function onCancel(){
        let tk = token.split(" ")[1]
        axios.put(`http://localhost:1000/api/noti-owner`,{
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
        console.log(props.noti)
    }, []);

    return(
        <div className='card-trans'  >
            {mini?(
                <div align='left' className='Click' onClick={()=>{setMini(!mini)}} >
                    <h5>{noti.nameCustomer}</h5>
                    ???????????????????????? : {noti.roomType}<br></br>
                    ???????????? : {noti.rentalFee}<br></br>
                    {noti.statusAccept===false&noti.statusCancel===false?(
                        <div>
                            <h6 className='text-blue' align="left" >??????????????????????????????????????????????????????</h6>
                        </div>
                    ):(<div></div>)}
                    {noti.statusAccept===true&&noti.statusCancel===false?(<h6 className='text-green' align="left" >?????????????????????????????????</h6>):(<div></div>)}
                    {noti.statusCancel===true&&noti.statusAccept===true?(<h6 className='text-red' align="left" >???????????????????????????</h6>):(<div></div>)}
                    {noti.statusCancel===true&&noti.statusAccept===false?(<h6 className='text-red' align="left" >???????????????????????????????????????</h6>):(<div></div>)}
                </div>
            ):(
            <div>
                <Row>
                    <Col md={5}>
                        <div>
                            <h5 className='Click' onClick={()=>{setMini(!mini)}} >{noti.nameCustomer}</h5><br></br>
                            ???????????????????????? : {noti.roomType}<br></br>
                            ???????????? : {noti.rentalFee}<br></br>
                            ???????????????????????????????????? : {noti.locationX}<br></br>
                            ??????????????????????????????????????? : {noti.locationY}<br></br>
                            ???????????????????????????????????? : {noti.nameOwner}<br></br>
                            ??????????????????????????????????????? : ?????????????????? {noti.chat[0].dateTrans.split("-")[2]} ??????????????? {noti.chat[0].dateTrans.split("-")[1]} ?????? {noti.chat[0].dateTrans.split("-")[0]}<br></br>
                            ????????????????????????????????? : {noti.chat[0].timeTrans}<br></br>
                            {noti.statusAccept===false&noti.statusCancel===false?(
                                <div>
                                    <h6 className='text-blue' align="left" >??????????????????????????????????????????????????????</h6>
                                    <Button
                                        variant='success'
                                        onClick={()=>{
                                            sendAnswer(true)
                                        }}
                                    >?????????????????????</Button>
                                    <Button
                                        variant='danger'
                                        onClick={()=>{
                                            sendAnswer(false)
                                        }}
                                    >??????????????????</Button>
                                </div>
                            ):(<div></div>)}
                            {noti.statusAccept===true&&noti.statusCancel===false?(
                                <div>
                                    <h6 className='text-green' align="left" >?????????????????????</h6>
                                    <Button
                                        variant='danger'
                                        onClick={()=>{
                                            onCancel()
                                        }}
                                    >??????????????????</Button>
                                </div>
                            ):(<div></div>)}
                            {noti.statusCancel===true&noti.statusAccept===true?(<h6 className='text-red' align="left" >???????????????????????????</h6>):(<div></div>)}
                            {noti.statusCancel===true&&noti.statusAccept===false?(<h6 className='text-red' align="left" >???????????????????????????????????????</h6>):(<div></div>)}
                        </div>
                    </Col>
                    <Col md={7}>
                        <h5>chat</h5>
                        <div className='boxChat'>
                            {noti.chat.map((msg) => (
                                <div>
                                    {msg.from=="owner"?(
                                        <div align='right' >
                                        <Col md={6} >
                                        <div className='customerText' align='left'>{msg.message}</div>
                                        </Col>
                                        </div>
                                    ):(<div></div>)} 
                                    {msg.from=="customer"?(
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
                                    <Form.Control as="textarea" placeholder="????????????????????????????????????" onChange={(e) => {
                                        setInputChat(e.target.value)
                                    }} value={inputChat} />
                                </Col>
                                <Col md={3}>    
                                    <Button
                                        onClick={()=>{
                                            sendMsg()
                                        }}
                                    >??????????????????????????????</Button>
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