import './BoxScroll.css';
import React from "react";
import Star from '../star'

const BoxScroll = (props)=>{
    const priceRate = props.dataApt.rentalFreeMin === props.dataApt.rentalFreeMax ? 
        `${props.dataApt.rentalFreeMin} บาท`
    :
        `${props.dataApt.rentalFreeMin} -  ${props.dataApt.rentalFreeMax} บาท`
    
    return(
        <div className='box' >
            
            {/* คะแนน : {props.dataApt.score}<br></br> */}
            ราคา : {priceRate}<br></br>
            ซอย : {props.dataApt.alley}<br></br>
            {/* พิกัดแกน X : {props.dataApt.locationX}<br></br>
            พิกัดแกน Y : {props.dataApt.locationY}<br></br> */}
            {props.dataApt.domitoryType==="male"?(<div>ประเภทหอพัก : ชาย</div>):(<div></div>)}
            {props.dataApt.domitoryType==="female"?(<div>ประเภทหอพัก : หญิง</div>):(<div></div>)}
            {props.dataApt.domitoryType==="both"?(<div>ประเภทหอพัก : รวม</div>):(<div></div>)}
            <Star rating={props.dataApt.score} />
            {/* {props.dataApt.internet?(<div>มีอินเตอร์เน็ต</div>):(<div></div>)}
            {props.dataApt.cctv?(<div>มีโทรทัศน์วงจรปิด</div>):(<div></div>)}
            {props.dataApt.keyCard?(<div>มีระบบคีย์การ์ดประเภท</div>):(<div></div>)}
            {props.dataApt.coinWashingMachine?(<div>มีเครื่องซักผ้าหยอดเหรียญ</div>):(<div></div>)}
            {props.dataApt.laundry?(<div>มีบริการซักรีด</div>):(<div></div>)}
            {props.dataApt.carPark?(<div>มีที่จอดรถ</div>):(<div></div>)} */}
        </div>
    )
}

export default BoxScroll;