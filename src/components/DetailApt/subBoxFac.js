import './subBoxFac.css';
import React from "react";
import {Row,Col,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom';

const SubBox = (props)=>{
    const iconHave = <FontAwesomeIcon size="1x" color="green" icon={faCircleCheck} />
    const iconNotHave = <FontAwesomeIcon size="1x" color="red" icon={faCircleXmark} />
    const navigate = useNavigate();
    
    const data=props.data
    const dataApt=props.dataApt
    const his=props.his

    const [numRoomAvail, setNumRoomAvail] = React.useState('');

    const toBook=(data)=>{
        navigate('/Book',{state:{dataApt:data.dataApt,dataRoom:data.dataRoom,his:data.his}});    
    }

    const toReview=(data)=>{
        navigate('/Review',{state:{id:data.dataApt.id,his:data.his}});    
    }

    React.useEffect(()=>{
        let availRoom=[]
        availRoom=data.room.filter((r)=>{
            return r.available===true
        })
        setNumRoomAvail(availRoom.length)
    },[props.data])


    return( 
            <div className='bord-all-fac' >
                <Row>
                    
                    <Col  md={8}>
                        <div className='box-white' >
                            <div className='text-detail-inner' align = 'left'>
                                <h5>ภายในห้อง</h5>
                                    <div className="text-detail-inner-inner">
                                        {data.roomOption.air?(<div>{iconHave} : มีเครื่องปรับอากาศ</div>):(<div>{iconNotHave} : ไม่มีเครื่องปรับอากาศ</div>)}
                                        {data.roomOption.refrigerator?(<div>{iconHave} : มีตู้เย็น</div>):(<div>{iconNotHave} : ไม่มีตู้เย็น</div>)}
                                        {data.roomOption.fan?(<div>{iconHave} : มีผัดลม</div>):(<div>{iconNotHave} : ไม่มีพัดลม</div>)}
                                        {data.roomOption.television?(<div>{iconHave} : มีโทรทัศน์</div>):(<div>{iconNotHave} : ไม่มีโทรทัศน์</div>)}
                                        {data.roomOption.waterHeater?(<div>{iconHave} : มีเครื่องทำน้ำอุ่น</div>):(<div>{iconNotHave} : ไม่มีเครื่องทำน้ำอุ่น</div>)}
                                        {data.roomOption.washingMachine?(<div>{iconHave} : มีเครื่องซักผ้าส่วนตัว</div>):(<div>{iconNotHave} : ไม่มีเครื่องซักผ้าส่วนตัว</div>)}
                                        {data.roomOption.cookingStove?(<div>{iconHave} : มีที่ทำอาหาร</div>):(<div>{iconNotHave} : ไม่มีที่ทำอาหาร</div>)}
                                    </div>
                                <hr />
                                <h5>ภายนอก</h5>
                                <div className="text-detail-inner-inner">
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
                                จำนวนห้องที่ว่าง : {numRoomAvail} ห้อง<br></br>
                                จำนวนห้องทั้งหมด : {data.numOfRoomTotal} ห้อง<br></br>
                            </div>
                        </div>
                        <div className='b-book' >
                            <div className='bt-detailApt' >
                                <a 
                                className='bt-detail-fac'
                                variant="dark"
                                onClick={()=>{
                                    toBook({dataApt:dataApt,dataRoom:data,his:his});
                                }} >นัดแนะเวลาดูหอ</a>
                            </div>
                            <div className='bt-detailApt' >
                            <a 
                                className='bt-detail-fac'
                                variant="dark"
                                onClick={()=>{
                                    toReview({dataApt:dataApt,dataRoom:data,his:his});
                                }} >คะแนนรีวิว</a>
                           </div>
                        </div>
                    </Col>
                </Row>
            </div>
    )
}

export default SubBox;