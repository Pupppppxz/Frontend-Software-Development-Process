import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './AdTrans.css'
import axios from 'axios';



const AdTrans = (props) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
  
    
    function approve(){
        let tk = token.split(" ")[1]
        axios.put(`http://localhost:1000/api/owner-approve`,{
            userId : props.DataReq.userId,
        },
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res.data)
            props.setAction(!props.action)
        });     
    }

    function deleteReq(){
        let tk = token.split(" ")[1]
        console.log(props.DataReq.userId)
        axios.post(`http://localhost:1000/api/owner-remove`,{
            userId : props.DataReq.userId,
        },
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res.data)
            props.setAction(!props.action)
        });     
    }




    const [valCard, setValCard] = React.useState(false);
    const [dis, setDis] = React.useState(true);

    return (
        <div>
                    <div className="AdTrans-card">
                        <div align="left">
                            {valCard ? (
                                <div>
                                    <Row>
                                        <Col>
                                            <div className='titleTrans'
                                                onClick={() => {
                                                    if (valCard) {
                                                        setValCard(false)
                                                    } else {
                                                        setValCard(true)
                                                    }
                                                }}>
                                                <h5>User : {props.DataReq.nameUser}</h5>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className='trans-detials'>
                                        <Row>
                                            <Col>
                                                สำเนาบัตร ปชช : {"  "}
                                                <a href={`http://localhost:1000/${props.DataReq.idCard}`} target="_blank">เปิดดูเอกสาร</a> <br></br>
                                                ระเบียบหอพัก : {"  "}
                                                <a href={`http://localhost:1000/${props.DataReq.apartmentRule}`} target="_blank">เปิดดูเอกสาร</a><br></br>
                                                แบบ หพ.2 (คำขอรับใบอนุญาตประกอบกิจการหอพักเอกชน) : {"  "}
                                                <a href={`http://localhost:1000/${props.DataReq.applicationForPrivate}`} target="_blank">เปิดดูเอกสาร</a><br></br>
                                                หพ.9 (คำขอรับใบอนุญาตผู้จัดการหอพักเอกชน) : {"  "}
                                                <a href={`http://localhost:1000/${props.DataReq.applicationForLicense}`} target="_blank">เปิดดูเอกสาร</a><br></br>
                                                <div align='right'>
                                                    <br></br>
                                                        <div>
                                                            <Button variant="success" onClick={() => {
                                                                approve()
                                                            }} >ตกลง</Button>
                                                            <Button variant="danger" onClick={() => {
                                                                deleteReq()
                                                            }} >ปฏิเสธ</Button>
                                                        </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='titleTrans'
                                        onClick={() => {
                                            if (valCard) {
                                                setValCard(false)
                                            } else {
                                                setValCard(true)
                                            }
                                        }}>
                                        <h5>User : {props.DataReq.nameUser}</h5>
                                    </div>
                                </div>
                            )
                            }
                        </div>
                    </div>
        </div>
    )
}

export default AdTrans