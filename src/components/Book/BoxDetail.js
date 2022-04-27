import './BoxDetail.css';
import React from "react";
import SubBoxWhite from "./subBoxWhite";
import SubBoxFac from "./subBoxFac";
import {Row,Col,Button,Carousel,Form} from 'react-bootstrap'




const BoxDetail = (props)=>{
    const [idType,setIdType] = React.useState(0);
    const [date,setDate] = React.useState('');
    const [time,setTime] = React.useState('');
    return(
        <div className='box-Detail' >
            <Row>
                <Col md={5}>
                    <div className='bord-Detail-left' >
                        <Carousel>
                            {props.data.rooms[idType].img.map((task) => (
                                <Carousel.Item interval={1000}>
                                    <img
                                        className="imgReview-detail"
                                        src={`http://localhost:1000/${task.src}`}
                                        alt={task.id}
                                    />
                                    <Carousel.Caption>
                                        <h3>รูปภาพที่ {task.id+1}</h3>
                                        <p>{props.data.name}</p>
                                        <p>{props.data.rooms[idType].nameType}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))}

                        </Carousel>
                       
                        <div align='left'>
                            <div className='bord-time' >
                                <Form.Label >เลือกชนิดของห้อง</Form.Label>
                                <Form.Select aria-label="Default select example" value={idType} onChange={(e)=>{
                                            setIdType(e.target.value)
                                        }}>
                                    {props.data.rooms.map((task) => (
                                        <option value={task.id} >{task.nameType}</option>
                                    ))}
                                </Form.Select>
                                <Form.Group controlId="dob">
                                    <Form.Label>เลือกวันที่ต้องการนัดหมาย</Form.Label>
                                    <Form.Control type="date" name="dob" placeholder="Date" onChange={(e)=>{
                                        setDate(e.target.value)
                                    }}/>
                                </Form.Group>
                                <Form.Group controlId="dob">
                                    <Form.Label>เลือกเวลาที่ต้องการนัดหมาย</Form.Label>
                                    <Form.Control type="time" name="dob" placeholder="Date" onChange={(e)=>{
                                        setTime(e.target.value)
                                    }}/>
                                </Form.Group>
                                
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={7}>
                    <Row>
                        <Col>
                            <SubBoxWhite data={props.data.rooms[idType]} dataApt={props.data}></SubBoxWhite>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <SubBoxFac data={props.data.rooms[idType]} dataApt={props.data} time={time} date={date} ></SubBoxFac>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Rental fee : {props.rentalFree}<br></br> */}
      
            
            
        </div>
    )
}

export default BoxDetail;