import './uInfo.css';
import React from "react";
import {Row,Col,Form,Button} from 'react-bootstrap'
import axios from 'axios';


const UInfo = (props)=>{
    
    const user= props.user
    
    const [name,setName] = React.useState("");
    const [lastName,setLastName] = React.useState("");
    const [type,setType] = React.useState("");
    const [mail,setMail] = React.useState("");
    const [phoneNum,setPhoneNum] = React.useState("");
    const [dis,setDis] = React.useState(true);
    const [editPass,setEditPass] = React.useState(false);

    const [inputPass,setInputPass] = React.useState("");
    const [inputPass2,setInputPass2] = React.useState("");

    const [textNoti,setTextNoti] = React.useState('');
    
    function changeDis(){
        if(dis){
            setDis(false)
        }
        else{
            setDis(true)
        }
    }

    function setValDefault(){
        setName(user.firstName)
        setLastName(user.lastName)
        setType(user.gender)
        setMail(user.email)
        setPhoneNum(user.phone)
    }

    function conFirm(){
        setTextNoti('')
        let tk = props.token.split(" ")[1]
        axios.put(`http://localhost:1000/api/user`,{
            firstName :name,
            lastName : lastName,
            email : mail,
            gender:type,
            phone:phoneNum
        },    
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            setDis(!dis)
        })
        .catch((e) => {
            setTextNoti(e.response.data.message);
        });
        ;
    }

    function conFirmUpdatePass(){
        setTextNoti('')
        let tk = props.token.split(" ")[1]
        axios.put(`http://localhost:1000/api/password`,{
            password  : inputPass,
            password2 : inputPass2
        },    
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        })
        .then((res) => {
            setEditPass(!editPass)
        })
        .catch((e) => {
            setTextNoti(e.response.data.message);
        });
    }

    React.useEffect(()=>{
        setValDefault()
    }, []);

    
    return(
        <div>
            <Row>
                <Col md={5} >
                    <Form.Control type="text" placeholder="Enter name" onChange={(e)=>{
                        setName(e.target.value)
                    }} value={name} disabled={dis} />
                    <Form.Text className="text-muted"></Form.Text>
                    <br></br>
                </Col>
                <Col md={5} >
                    <Form.Control type="text" placeholder="Enter last name" onChange={(e)=>{
                        setLastName(e.target.value)
                    }}value={lastName} disabled={dis} />
                    <Form.Text className="text-muted"></Form.Text>
                    <br></br>
                </Col>
                <Col md={2}>
                    <Form.Select aria-label="Default select example" onChange={(e) => {
                        setType(e.target.value)
                    }} value={type} disabled={dis} >
                        <option value="male">ชาย</option>
                        <option value="female">หญิง</option>
                    </Form.Select>
                    <br></br>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>{
                        setMail(e.target.value)
                    }} value={mail} disabled={dis} />
                    <Form.Text className="text-muted"></Form.Text>
                    <br></br>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Control type="text" placeholder="Enter phone number" onChange={(e)=>{
                        setPhoneNum(e.target.value)
                    }} value={phoneNum} disabled={dis} />
                    <Form.Text className="text-muted"></Form.Text>
                    <br></br>
                </Col>
            </Row>
            {dis?(
                <div align='right'>
                    <p 
                        variant="dark"
                        className='bt-userInfo-test' 
                        onClick={()=>{
                            changeDis()
                        }}
                    >แก้ไข</p>
                </div>
            ):(
                <div align='right'>
                    {textNoti===""?(<div></div>):(<h6 className='noti-red' align="right" >{textNoti}</h6>)}
                    <p className='bt-userInfo-success' variant="success"
                        onClick={()=>{
                            conFirm()
                        }}
                    >บันทึก</p>
                    <p
                        className='bt-userInfo-reset' variant="danger"
                        onClick={()=>{
                            setValDefault()
                            changeDis()
                            setTextNoti('')
                        }}
                    >ยกเลิก</p>
                </div>
            )}
            <br></br><br/>
            <Row>
                <div align='right'>
                    {editPass?(
                        <div>
                            <Row>
                                <Col md={12}>
                                    <div align='left'>
                                        {textNoti===""?(<div></div>):(<h6 className='noti-red' align="right" >{textNoti}</h6>)}
                                        <Form.Label><div  className='Rambla' >กรอกรหัสผ่านใหม่</div></Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={inputPass}  onChange={(e)=>{setInputPass(e.target.value)}} />
                                        <Form.Label><div  className='Rambla' >กรอกรหัสผ่านใหม่อีกครั้ง</div></Form.Label>
                                        <Form.Control type="password" placeholder="Password" value={inputPass2}  onChange={(e)=>{setInputPass2(e.target.value)}} />
                                    </div>
                                </Col>
                                <Col md ={4} sm={6}>
                                    <div className='editpass-btn'>
                                        <a
                                            className='bt-userInfo-success'
                                            variant='success'
                                            onClick={()=>{
                                                conFirmUpdatePass()
                                            }}
                                        >ยืนยัน</a>
                                        <a
                                            className='bt-userInfo-reset'
                                            variant='danger'
                                            onClick={()=>{
                                                setEditPass(!editPass)
                                                setInputPass('')
                                                setInputPass2('')
                                                setTextNoti('')
                                            }}
                                        >ยกเลิก</a>
                                    
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ):(
                        <div>
                            <Col md ={4} sm={6}>
                                <a
                                    className='bt-userInfo-test'
                                    variant='dark'
                                    onClick={()=>{setEditPass(!editPass)}}
                                >แก้ไข รหัสผ่าน</a>
                            </Col>
                        </div>
                    )}
                </div>
            </Row>
            
        </div>            
    )
}
export default UInfo;