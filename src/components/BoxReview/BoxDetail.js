import './BoxDetail.css';
import React from "react";
import SubBoxWhite from "./subBoxWhite";
import SubBoxFac from "./subBoxFac";
import {Row,Col,Button,Carousel,Form,FloatingLabel} from 'react-bootstrap'
import {reviewArr} from './dataReview'




const BoxDetail = (props)=>{
    const [idType,setIdType] = React.useState(0);
    const [score,setScore] = React.useState(0);
    const [detail,setDetail] = React.useState('');

    const [resultScoreData,setResultScoreData] = React.useState([]);

    React.useEffect(()=>{
        filScore();
    }, [idType]);


    React.useEffect(()=>{
        console.log(props.data)
        filScore();
    }, []);

    function getScore(){
        // get score idApt===props.idApt
        // type id === ReactuseEffect
    }

    function filScore(){
        let result = []  
                result=reviewArr.filter((data)=>{
                    return data.idTypeRoom===parseInt(idType);
                })
        setResultScoreData(result)
    }
    

    return(
        <div className='boxDetail-review' >
            <Row>
                <Col md={5}>
                    <div className='bord-Detail-left' >
                        <Carousel>
                            {props.data.rooms[idType].img.map((task) => (
                                <Carousel.Item interval={1000}>
                                    <img
                                        className="d-block w-100"
                                        src={task.src}
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
                       
                        <div align = 'center'>
                        <div className='bord-time' >
                            <Form.Label>เลือกชนิดของห้องที่ต้องการให้คะแนน</Form.Label>
                            <Form.Select aria-label="Default select example" value={idType} onChange={(e)=>{
                                        setIdType(e.target.value)
                                    }}>
                                {props.data.rooms.map((task) => (
                                    <option value={task.id} >{task.nameType}</option>
                                ))}
                            </Form.Select>
                            <Form.Label>ให้คะแนน</Form.Label>
                            <Form.Select aria-label="Default select example" value={score} 
                                onChange={(e)=>{
                                    setScore(e.target.value)
                                }}>
                                <option value={0} >0 คะแนน</option>
                                <option value={1} >1 คะแนน</option>
                                <option value={2} >2 คะแนน</option>
                                <option value={3} >3 คะแนน</option>
                                <option value={4} >4 คะแนน</option>
                                <option value={5} >5 คะแนน</option>   
                            </Form.Select>
                            <Form.Label>รายละเอียด</Form.Label>
                            <FloatingLabel controlId="floatingTextarea2" label="Comments" value={detail} onChange={(e)=>{
                                    setDetail(e.target.value)
                                }}>
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                />
                            </FloatingLabel>
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
                            <SubBoxFac data={props.data.rooms[idType]} dataApt={props.data} detail={detail} idType={idType} score={score} dataScore={resultScoreData} ></SubBoxFac>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default BoxDetail;