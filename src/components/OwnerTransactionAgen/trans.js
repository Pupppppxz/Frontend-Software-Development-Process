import './trans.css';
import React from "react";
import {Row,Col,Button,Form} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';



const Trans = (props)=>{
    const navigate = useNavigate();
    const timeNow = new Date().toLocaleString() + ""
    const date = timeNow.split(', ')[0].split('/')
    const time = timeNow.split(', ')[1].split(':')
    const [valCard,setValCard] = React.useState(false);
    const [exp,setExp] = React.useState(true);
    const [thisDay,setThisday] = React.useState(false);
    const [detailCancel,setDetailCancel] = React.useState('')
    const [dis,setDis] = React.useState(true);
 
    function onCancel(){
        console.log("Cancel")
        //set statusCancel ==true
    }

    function onDelete(){
        console.log("Delete")
        //set statusCancel ==true
    }

    function checkStatus(){
        let transYear=props.data.dateAppointment.split('-')[0]
        let transMonth=props.data.dateAppointment.split('-')[1]
        let transDay=props.data.dateAppointment.split('-')[2]
       if(parseInt(date[2])<parseInt(transYear)){
            setExp(false)
       }
       else if(parseInt(date[0])<parseInt(transMonth)){
            setExp(false)
       }
       else if(parseInt(date[1])<parseInt(transDay)){
            setExp(false)
       }
       if(parseInt(date[2])===parseInt(transYear)&&parseInt(date[0])===parseInt(transMonth)&&parseInt(date[1])===parseInt(transDay)){
            setExp(false)
            setThisday(true)
       }
    }

    function onCancel(){
        let tk = token.split(" ")[1]
        axios.put(`http://localhost:1000/api/noti-owner`,{
            accept :false,
            cancel : false,
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


    React.useEffect(()=>{
        checkStatus()
    }, [] );


    return(
        <div>
            {exp?(
                    <div className='card-transExp-test'>
                    <div align="left">
                        {valCard ? (
                            <div>
                                <Row>
                                    <Col>
                                        <div
                                            className='titleNoti'
                                            onClick={() => {
                                                if (valCard) {
                                                    setValCard(false)
                                                }
                                                else {
                                                    setValCard(true)
                                                }
                                            }}>
                                            <h5>{props.data.title}  [ {props.data.dateAppointment} , {props.data.timeAppointment} ]</h5>
                                        </div>
                                    </Col>
                                </Row>

                                <div className='card-trans-detail'>
                                    <Row>
                                        <Col>
                                            ?????????????????????????????????????????? : {props.data.nameCustomer}<br></br>
                                            ??????????????????????????????????????? : {props.data.contactCustomer}<br></br>
                                            ???????????????????????? : {props.data.roomType}<br></br>
                                            ????????????????????????????????? : {props.data.rentalFee} ?????????/???????????????<br></br>                                            
                                            ???????????????????????? : {props.data.area} ???????????????????????????<br></br>
                                            ??????????????????????????? : {props.data.cashPledge} ?????????<br></br>
                                            ??????????????????????????????????????? : {props.data.leaseAgreement} ??????<br></br>                                    
                                            ?????????????????????????????? (????????????????????????????????????) : {props.data.location}
                                            <div align='right'>
                                                <Button variant="danger" onClick={() => {
                                                    onDelete()
                                                }} >??????</Button>
                                            </div>
                                        </Col>
                                    </Row>


                                </div>
                            </div>
                        ): (
                                <div>
                                    <h5
                                        className='titleNoti'
                                        onClick={() => {
                                            if (valCard) {
                                                setValCard(false)
                                            }
                                            else {
                                                setValCard(true)
                                            }
                                        }}
                                    >{props.data.title}  [ {props.data.dateAppointment} , {props.data.timeAppointment} ]<br></br>
                                    ?????????????????????????????????????????? : {props.data.nameCustomer}<br></br>
                                    </h5>
                                </div>
                        )}
                    </div>
                </div>
            ):(
                    <div className='card-trans-test'  >
                        <div align="left">
                            {valCard ? (
                                <div>
                                    <Row>
                                        <Col>
                                            <div
                                                className='titleNoti'
                                                onClick={() => {
                                                    if (valCard) {
                                                        setValCard(false)
                                                    }
                                                    else {
                                                        setValCard(true)
                                                    }
                                                }}>
                                                <h5>{props.data.title}  [ {props.data.dateAppointment} , {props.data.timeAppointment} ]</h5>
                                            </div>
                                        </Col>
                                    </Row>

                                    <div className='card-trans-detail'>
                                        <Row>
                                            <Col>
                                                ?????????????????????????????????????????? : {props.data.nameCustomer}<br></br>
                                                ??????????????????????????????????????? : {props.data.contactCustomer}<br></br>
                                                ???????????????????????? : {props.data.roomType}<br></br>
                                                ????????????????????????????????? : {props.data.rentalFee} ?????????/???????????????<br></br>                                            
                                                ???????????????????????? : {props.data.area} ???????????????????????????<br></br>
                                                ??????????????????????????? : {props.data.cashPledge} ?????????<br></br>
                                                ??????????????????????????????????????? : {props.data.leaseAgreement} ??????<br></br>                                    
                                                ?????????????????????????????? (????????????????????????????????????) : {props.data.location}
                                                <div align='right'>                                                   
                                                    
                                                    <br></br>
                                                    {dis?(
                                                        <div>
                                                            {thisDay?(
                                                                <div></div>
                                                            ):(
                                                                <div>
                                                                    <Button variant="danger" onClick={() => {
                                                                        setDis(false)
                                                                    }} >????????????????????????????????????????????????</Button>
                                                                </div>
                                                            )}     
                                                        </div>
                                                    ):(
                                                        <div>
                                                            <Col md={4}>
                                                                <div align='left'>
                                                                    <Form.Label><div className='Rambla' >?????????????????????????????????????????????</div></Form.Label>                                                                                                                                
                                                                    <Form.Control as="textarea" placeholder="?????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????" onChange={(e) => {
                                                                    setDetailCancel(e.target.value)
                                                                    }} value={detailCancel} disabled={dis}/>
                                                                </div>      
                                                            </Col>
                                                            <br></br>
                                                            <Button variant="success" onClick={() => {
                                                                onCancel()
                                                                setDis(true)
                                                            }} >??????????????????</Button>
                                                            <Button variant="danger" onClick={() => {
                                                                setDis(true)
                                                            }} >????????????????????????????????????????????????????????????</Button>
                                                        </div>
                                                    )}                                                       
                                                </div>
                                            </Col>
                                        </Row>


                                    </div>
                                </div>
                            ): (
                                    <div>
                                        <h5
                                            className='titleNoti'
                                            onClick={() => {
                                                if (valCard) {
                                                    setValCard(false)
                                                }
                                                else {
                                                    setValCard(true)
                                                }
                                            }}
                                        >{props.data.title}  [ {props.data.dateAppointment} , {props.data.timeAppointment} ]<br></br>
                                        ?????????????????????????????????????????? : {props.data.nameCustomer}<br></br>
                                        {thisDay?(<h6 className='text-red' >???????????????????????????????????????</h6>):(<div></div>)}
                                        </h5>
                                    </div>
                            )}
                        </div>
                    </div>
            )}
        </div>
    )
}
export default Trans;