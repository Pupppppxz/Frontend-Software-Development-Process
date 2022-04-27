import './subBoxFac.css';
import React from "react";
import {Row,Col,Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';


const SubBox = (props)=>{
    const navigate = useNavigate();

    const data=props.data
    const dataApt=props.dataApt

    const confirm=(data)=>{
        console.log(dataApt.id)
        console.log("user Name")
        console.log("userId")
        console.log(props.idType)
        console.log(props.score)
        console.log(props.detail)
    }

    React.useEffect(()=>{
        
    }, []);

    return(
        
            <div className='bord-all' >
                <Row>  
                    <Col md={8}>
                        <div className='box-reveiw' >
                            {props.dataScore.map((task) => (
                                <div align='left'>
                                    -------------------------------------------------<br></br>
                                    ผู้ให้คะแนน : {task.nameUser}<br></br>
                                    คะแนน : {task.score}<br></br>
                                    {task.detail!==''?(<div>รายละเอียด : {task.detail}<br></br></div>):(<div></div>)}
                                    
                                </div>             
                            ))}
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className='b-book' >
                            <Button 
                            variant="success"
                            onClick={()=>{
                               confirm();
                            }} >ยืนยัน</Button>
                        </div>
                    </Col>
                </Row>
            </div>
    )
}

export default SubBox;