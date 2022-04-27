import './subBoxWhite.css';
import React from "react";
import {Row,Col} from 'react-bootstrap'

const SubBox = (props)=>{
    const data=props.data
    const dataApt=props.dataApt
    return(
        <div className='subBox-white' >
            
            <div className='all-text-detail' >
                <div align = 'left'><h2>{dataApt.name}</h2></div>
                <Row>
                    <Col xs={6}>
                        <div className='text-detail-inner-left' align = 'left'>
                            {dataApt.domitoryType==="male"?(<div>ประเภทหอพัก : ชาย</div>):(<div></div>)}
                            {dataApt.domitoryType==="female"?(<div>ประเภทหอพัก : หญิง</div>):(<div></div>)}
                            {dataApt.domitoryType==="other"?(<div>ประเภทหอพัก : รวม</div>):(<div></div>)}
                            ประเภทห้อง : {data.nameType}<br></br>
                            ค่าเช่า : {data.price} บาท/เดือน<br></br>
                            จำนวนห้องที่มี : {data.numOfRoomTotal} ห้อง<br></br>
                            ขนาดพื้นที่ : {data.area} ตารางเมตร<br></br>
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div className='text-detail-inner' align = 'left'>
                            ระยะเวลาสัญญาเช่า : {data.contract.leaseAgreement} ปี<br></br>
                            เงินมัดจำจำนวน : {data.contract.cashPledge} บาท<br></br>
                            ช่องทางติดต่อ : {dataApt.contact} <br></br>
                        </div>
                    </Col>
                </Row>
            </div>
            
            
            
     
        </div>
    )
}

export default SubBox;