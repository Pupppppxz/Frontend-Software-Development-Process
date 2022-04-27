import './subBoxFac.css';
import React from "react";
import {Row,Col,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const SubBox = (props)=>{
    const token = localStorage.getItem("token")
    const iconHave = <FontAwesomeIcon size="1x" color="green" icon={faCircleCheck} />
    const iconNotHave = <FontAwesomeIcon size="1x" color="red" icon={faCircleXmark} />
    const navigate = useNavigate();
    const [noti,setNoti] = React.useState(null);
    
    const data=props.data
    const dataApt=props.dataApt
    const current = new Date();
    const dayCurrent = `${current.getDate()}`;
    const monthCurrent = `${current.getMonth()+1}`;
    const yearCurrent = `${current.getFullYear()}`;

    function check(){
        if(props.date===''||props.time===''){
            setNoti("เลือกวันและเวลาที่ต้องการนัดหมายก่อน")
        }
        else if(parseInt(props.date.split('-')[0])>parseInt(yearCurrent)){
            send()
        }
        else if(parseInt(props.date.split('-')[0])===parseInt(yearCurrent)&&parseInt(props.date.split('-')[1])>parseInt(monthCurrent)){
            send()
        }
        else if(parseInt(props.date.split('-')[0])===parseInt(yearCurrent)&&parseInt(props.date.split('-')[1])===parseInt(monthCurrent)&&parseInt(props.date.split('-')[2])>parseInt(dayCurrent)){
            send()
        }
        else{
            setNoti("ไม่สามารถเลือกวันที่ผ่านมาแล้วหรือวันนี้ได้")
        }    
    }
    
    function send(){
        console.log(props.date)
        console.log(dayCurrent+" "+monthCurrent+" "+yearCurrent)
        
            let tk = token.split(" ")[1]
            axios.post(`http://localhost:1000/api/noti-new`,{
                apartmentId :data.apartmentId,
                roomType : data.nameType,
                rentalFee : data.price,
                area:data.area,
                leaseAgreement:data.contract.leaseAgreement,
                cashPledge:data.contract.cashPledge,
                locationX:dataApt.locationX,
                locationY:dataApt.locationY,
                ownerId:dataApt.ownerId,
                dateTrans:props.date,
                timeTrans:props.time,
                apartmentName:dataApt.name,
            },
            {       
                headers: {
                    'Authorization': 'Bearer ' + tk,   
                },
            }).then((res) => {
                console.log(res.data)
                getNoti()
            }).catch((e) => {
                setNoti(e.response.data.message);
            });; 
        
    }

    function getNoti(){
        let tk = token.split(" ")[1]
        axios.get(`http://localhost:1000/api/noti-customer`,
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res.data)
            let result = []  
            result=res.data.filter((noti)=>{
                return noti.apartmentId===data.apartmentId && noti.roomType===data.nameType;
            })
            sendRequest(result[result.length-1]._id)
        }).catch((e) => {
            setNoti(e.response.data.message);
        });;     
    }

    function sendRequest(NotiId){
        let tk = token.split(" ")[1]
        axios.post(`http://localhost:1000/api/noti-offer`,{
            notificationId :NotiId,
            apartmentId : data.apartmentId,
            dateTrans : props.date,
            timeTrans: props.time,
            accept:'false',
            cancel:'false',
        },
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            navigate('/Noti');
        }).catch((e) => {
            setNoti(e.response.data.message);
        });;     
    }



    return(
        
            <div className='bord-all-fac' >
                <Row>
                    
                    <Col  md={8}>
                        <div className='box-white' >
                            <div className='text-detail-inner' align = 'left'>                                
                                <h5>ภายในห้อง</h5>
                                <div className='text-detail-inner-inner'>
                                    {data.roomOption.air?(<div>{iconHave} : มีเครื่องปรับอากาศ</div>):(<div>{iconNotHave} : ไม่มีเครื่องปรับอากาศ</div>)}
                                    {data.roomOption.refrigerator?(<div>{iconHave} : มีตู้เย็น</div>):(<div>{iconNotHave} : ไม่มีตู้เย็น</div>)}
                                    {data.roomOption.fan?(<div>{iconHave} : มีผัดลม</div>):(<div>{iconNotHave} : ไม่มีผัดลม</div>)}
                                    {data.roomOption.television?(<div>{iconHave} : มีโทรทัศน์</div>):(<div>{iconNotHave} : ไม่มีโทรทัศน์</div>)}
                                    {data.roomOption.waterHeater?(<div>{iconHave} : มีเครื่องทำน้ำอุ่น</div>):(<div>{iconNotHave} : ไม่มีเครื่องทำน้ำอุ่น</div>)}
                                    {data.roomOption.washingMachine?(<div>{iconHave} : มีเครื่องซักผ้าส่วนตัว</div>):(<div>{iconNotHave} : ไม่มีเครื่องซักผ้าส่วนตัว</div>)}
                                    {data.roomOption.cookingStove?(<div>{iconHave} : มีที่ทำอาหาร</div>):(<div>{iconNotHave} : ไม่มีที่ทำอาหาร</div>)}
                                </div>
                                <hr />
                                <h5>ภายนอก</h5>
                                <div className='text-detail-inner-inner'>
                                    {dataApt.internet?(<div>{iconHave} : มีอินเทอร์เน็ต</div>):(<div>{iconNotHave} : ไม่มีอินเทอร์เน็ต</div>)}
                                    {dataApt.coinWashingMachine?(<div>{iconHave} : มีเครื่องซักผ้าหยอดเหรียญ</div>):(<div>{iconNotHave} : ไม่มีซักผ้าหยอดเหรียญ</div>)}
                                    {dataApt.laundry?(<div>{iconHave} : มีเครื่องอบผ้าหยอดเหรียญ</div>):(<div>{iconNotHave} : ไม่มีเครื่องอบผ้าหยอดเหรียญ</div>)}
                                    {dataApt.carPark?(<div>{iconHave} : มีที่จอดรถ</div>):(<div>{iconNotHave} : ไม่มีที่จอดรถ</div>)}
                                    {dataApt.keyCard?(<div>{iconHave} : มีคีย์การ์ด</div>):(<div>{iconNotHave} : ไม่มีคีย์การ์ด</div>)}
                                    {dataApt.cctv?(<div>{iconHave} : มีโทรทัศน์วงจรปิด</div>):(<div>{iconNotHave} : ไม่มีโทรทัศน์วงจรปิด</div>)}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col  md={4}>
                        <div className='box-white' >
                            <div className='text-detail-inner' align = 'left'>
                                ค่าไฟฟ้า : {data.electricCost} บาท/หน่วย<br></br>
                                ค่าน้ำ : {data.waterCost} บาท/หน่วย<br></br>
                            </div>
                        </div>
                        <div className='box-white' >
                            <div className='text-detail-inner' align = 'left'>
                                จำนวนห้องที่มี : {data.numOfRoomTotal} ห้อง<br></br>
                            </div>
                        </div>
                        <div className='b-book' >
                            {noti!==''?(<h6 className='noti-red' align="left" >{noti}</h6>):(<div></div>)}
                            <a 
                            className='bt-detail-fac'
                            variant="success"
                            onClick={()=>{
                                setNoti('')
                                check()
                            }} >ยืนยัน</a>
                        </div>
                    </Col>
                </Row>
            </div>
    )
}

export default SubBox;