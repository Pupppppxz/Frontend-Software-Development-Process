import React from 'react'
import './ownerSignUp.css';
import {Row,Col,Button, Container} from 'react-bootstrap'
import BoxDetail from '../../components/DetailApt/BoxDetail.js'
import {useLocation} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import Nav from '../../components/Nav/nav'
import axios from 'axios';


const OwnerSignUp  = () => {
    const token = localStorage.getItem("token")
    const testId = localStorage.getItem("id")
    const [idCard,setIdCard] = React.useState(null);
    const [dorRule,setDorRule] = React.useState(null);
    const [dor2,setDor2] = React.useState(null);
    const [dor9,setDor9] = React.useState(null);
    const [dis,setDis] = React.useState(true);
    const [resObj,setResObj] = React.useState(null);

    const [noti,setNoti] = React.useState('');
    

    function sendRequest(){
        let tk = token.split(" ")[1]
        axios.post(`http://localhost:1000/api/owner`,{},{
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            setNoti(e.response.data.message)
            console.log(e.response.data.message);
            checkRes()
        });;
    }

    function checkRes(){
        let tk = token.split(" ")[1]
        axios.get(`http://localhost:1000/api/owner`,{
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            setResObj(res.data)
            setDis(false)
        }).catch((e) => {
            setNoti(e.response.data.message)
            console.log(e.response.data.message);
        });;
    }

    function sendFile(typeUpload){
        setNoti('')
        let tk = token.split(" ")[1]
        const formData = new FormData()
        if(typeUpload==="idCard"){
            console.log(idCard.type)
            if(idCard.type!=="application/pdf")
            {
                setNoti("ทุกไฟล์ต้องเป็น pdf เท่านั้น")
            }
            formData.append("uploadedPdf", idCard)
            formData.append("type", typeUpload)
        }
        else if(typeUpload==="apartmentRule"){
            if(dorRule.type!=="application/pdf")
            {
                setNoti("ทุกไฟล์ต้องเป็น pdf เท่านั้น")
            }
            formData.append("uploadedPdf", dorRule)
            formData.append("type", typeUpload)
        }
        else if(typeUpload==="applicationForPrivate"){
            if(dor2.type!=="application/pdf")
            {
                setNoti("ทุกไฟล์ต้องเป็น pdf เท่านั้น")
            }
            formData.append("uploadedPdf", dor2)
            formData.append("type", typeUpload)
        }
        else if(typeUpload==="applicationForLicense"){
            if(dor9.type!=="ทุกไฟล์ต้องเป็น pdf เท่านั้น")
            {
                setNoti("ทุกไฟล์ต้องเป็น pdf เท่านั้น")
            }
            formData.append("uploadedPdf", dor9)
            formData.append("type", typeUpload)
        }

        axios.put(`http://localhost:1000/api/owner`, formData,
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            checkRes()
            setNoti('')
            console.log(res)
        }).catch((e) => {
            // setNoti(e.response.data.message)
            console.log(e.response.data.message);
        });;
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
          checkRes()
        }, 1000)
        return () => clearInterval(interval)
    }, []);

    React.useEffect(()=>{
        console.log(testId)
        checkRes()
    }, []);




    return (
        <div> 
               <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                       <div  align="center" >
                                <Col md={6} className={!dis ? 'SignManage' : 'SignManage-before'}>
                                    {dis?(
                                    <div>
                                        กดปุ่มส่งคำขอเพื่อส่งคำขอใช้ระบบผู้ดูแลหอพัก
                                        <br></br>
                                        <br></br>
                                        <div align='center'>
                                            <p variant='dark' 
                                                className='bt-userInfo-test'
                                                onClick={()=>{
                                                    sendRequest()
                                                }}
                                            >ส่งข้อมูลคำขอ</p>
                                        </div>
                                    </div>)
                                    :(
                                    <div>
                                        <Row>
                                            <Col>
                                                <div className='title' align='left'>
                                                    <h4>สมัครเป็นผู้ดูแลหอพัก</h4>
                                                </div>
                                                <hr />
                                            </Col>
                                        </Row>
                                        {noti===""?(<div></div>):(<h6 className='noti-red' align="center" >{noti}</h6>)}
                                        <div className='box-detail-SigManage'>
                                            <Row>
                                                <Col>
                                                    <div align='left' className='box-form-SignManage'>
                                                        <form action="/">
                                                                                                                                                
                                                            <label for="img">อัพโหลดรูปภาพ สำเนาบัตร ปชช</label><br></br>
                                                            <input type="file" id="img" name="img" accept="application/pdf" onChange={(e)=>{
                                                                setIdCard(e.target.files[0])
                                                            }} ></input>
                                                            {resObj.idCard!==""?(
                                                                <div>
                                                                    คุณได้อัพโหลดไฟล์ไปแล้ว
                                                                </div>)
                                                            :(                                                                
                                                                <a
                                                                    className='bt-userInfo-success'
                                                                    variant='dark'
                                                                    onClick={()=>{
                                                                        sendFile("idCard")
                                                                    }}
                                                                >อัพโหลด</a>
                                                            )}
                                                        </form>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div align='left' className='box-form-SignManage'>
                                                        <form action="/">
                                                                                                                                                
                                                            <label for="img">อัพโหลดรูปภาพระเบียบหอพัก</label><br></br>
                                                            <input type="file" id="img" name="img" accept="application/pdf" onChange={(e)=>{
                                                                setDorRule(e.target.files[0])
                                                            }} ></input>
                                                            {resObj.apartmentRule!==""?(
                                                                <div>
                                                                    คุณได้อัพโหลดไฟล์ไปแล้ว
                                                                </div>)
                                                            :(                                                                
                                                                <a
                                                                    className='bt-userInfo-success'
                                                                    variant='dark'
                                                                    onClick={()=>{
                                                                        sendFile("apartmentRule")
                                                                    }}
                                                                >อัพโหลด</a>
                                                            )}                                                            
                                                        </form>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div align='left' className='box-form-SignManage'>
                                                        <form action="/">
                                                                                                                                            
                                                            <label for="img">อัพโหลดรูปภาพแบบ หพ.2 (คำขอรับใบอนุญาตประกอบกิจการหอพักเอกชน)</label><br/><br/>
                                                            <input type="file" id="img" name="img" accept="application/pdf" onChange={(e)=>{
                                                                setDor2(e.target.files[0])
                                                            }} ></input>
                                                            {resObj.applicationForPrivate!==""?(
                                                                <div>
                                                                    คุณได้อัพโหลดไฟล์ไปแล้ว
                                                                </div>)
                                                            :(                                                                
                                                                <a
                                                                    className='bt-userInfo-success'
                                                                    variant='dark'
                                                                    onClick={()=>{
                                                                        sendFile("applicationForPrivate")
                                                                    }}
                                                                >อัพโหลด</a>
                                                            )}        
                                                            
                                                        </form>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <div align='left' className='box-form-SignManage'>
                                                        <form action="/">
                                                                                                                                            
                                                            <label for="img">อัพโหลดรูปภาพหพ.9  (คำขอรับใบอนุญาตผู้จัดการหอพักเอกชน)</label><br/><br/>
                                                            <input type="file" id="img" name="img" accept="application/pdf" onChange={(e)=>{
                                                                setDor9(e.target.files[0])
                                                            }} ></input>
                                                            {resObj.applicationForLicense!==""?(
                                                                <div>
                                                                    คุณได้อัพโหลดไฟล์ไปแล้ว
                                                                </div>)
                                                            :(                                                                
                                                                <a
                                                                    className='bt-userInfo-success'
                                                                    variant='dark'
                                                                    onClick={()=>{
                                                                        sendFile("applicationForLicense")
                                                                    }}
                                                                >อัพโหลด</a>
                                                            )} 
                                                        </form>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    )}                            
                                </Col>
                       </div>
                </Row>
        </div>  
    )
}

export default OwnerSignUp
