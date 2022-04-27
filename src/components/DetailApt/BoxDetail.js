import './BoxDetail.css';
import React from "react";
import SubBoxWhite from "./subBoxWhite";
import SubBoxFac from "./subBoxFac";
import {Row,Col,Button,Carousel} from 'react-bootstrap'

const BoxDetail = (props)=>{
    const [idType,setIdType] = React.useState(0);
    return(
        <div className='box-DetailApt' >
            <Row>
                <Col md={5}>
                    <div className='bord-Detail-left' >
                        <Carousel>
                            <Carousel.Item interval={1000}>
                                    <img
                                        className="imgReview-detail"
                                        src={`http://localhost:1000/${props.data.imgAptSrc}`}
                                        alt={0}
                                    />
                                    <Carousel.Caption>
                                        <h3>รูปภาพที่ {1}</h3>
                                        <p>{props.data.name}</p>
                                        <p>{props.data.rooms[idType].nameType}</p>
                                    </Carousel.Caption>
                            </Carousel.Item>
                            {props.data.rooms[idType].img.map((task) => (
                                <Carousel.Item interval={1000}>
                                     <img
                                        className="imgReview-detail"
                                        src={`http://localhost:1000/${task.src}`}
                                        alt={task.id+1}
                                    />
                                    <Carousel.Caption>
                                        <h3>รูปภาพที่ {task.id+2}</h3>
                                        <p>{props.data.name}</p>
                                        <p>{props.data.rooms[idType].nameType}</p>
                                    </Carousel.Caption>
                                </Carousel.Item>
                                
                            ))}

                        </Carousel>
                        
                        <div align = 'center'>
                            {props.data.rooms.map((task) => (
                                <a 
                                    className="button-sectType-test"
                                    variant="secondary"
                                    onClick={()=>{
                                        setIdType(task.id)
                                    }}
                                >{task.nameType}</a>
                                
                            ))}
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
                            <SubBoxFac data={props.data.rooms[idType]} dataApt={props.data} his={props.his}></SubBoxFac>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {/* Rental fee : {props.rentalFree}<br></br> */}
      
            
            
        </div>
    )
}

export default BoxDetail;