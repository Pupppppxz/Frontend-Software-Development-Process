import React from 'react'
import './createRoomType.css';
import './checkBox.css';
import {Row,Col,Button, Container,Form} from 'react-bootstrap'
import Nav from '../../components/NavOwner/nav'
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const CreateRoomType  = () => {
        const token = localStorage.getItem("token")
        const navigate = useNavigate();
        const dataApt = useLocation().state.dataApt;
        const [nameType,setNameType] = React.useState('');
        const [price,setPrice] = React.useState('');
        const [area,setArea] = React.useState('');
        const [cashPledge,setCashPledge] = React.useState('');
        const [leaseAgreement,setLeaseAgreement] = React.useState('');
        const [electicCost,setElecticCost] = React.useState('');
        const [waterCost,setWaterCost] = React.useState('');
        const [numOfRoomTotal,setNumOfRoomTotal] = React.useState(0);
        const [air,setAir] = React.useState(false);
        const [refrigerator,setRefrigerator] = React.useState(false);
        const [fan,setFan] = React.useState(false);
        const [television,setTelevision] = React.useState(false);
        const [waterHeater,setWaterHeater] = React.useState(false);
        const [washingMachine,setWashingMachine] = React.useState(false);
        const [cookingStove,setCookingStove] = React.useState(false);
        const [img,setImg]=React.useState([])
        const [inputImg,setInputImg]=React.useState(null)

        const [noti,setNoti] = React.useState('');

        const [dis,setDis] = React.useState(false);

        function createType(){
                if(nameType===''){
                        setNoti("กรุณากรอกชื่อชนิดห้อง")
                }
                else if(nameType.length>50){
                        setNoti("ชื่อชนิดห้องต้องไม่เกิน 50 ตัวอักษร")
                }
                else if(area===''){
                        setNoti("กรุณากรอกพื้นที่ห้อง")
                }
                else if (parseFloat(area)<parseFloat(0)){
                        setNoti("พื้นที่ห้องต้องไม่น้อยกว่า 0 ตารางเมตร")
                }
                else if (parseFloat(area)>parseFloat(999)){
                        setNoti("พื้นที่ห้องต้องไม่เกิน 999 ตารางเมตร")
                }
                else if (parseFloat(area)!==parseFloat(parseFloat(area).toFixed(2))){
                        setNoti("พื้นที่ห้องต้องมีทศนิยมไม่เกิน 2 ตำแหน่ง")
                }
                else if(price===''){
                        setNoti("กรุณากรอกราคาค่าเช่า")
                }
                else if (parseFloat(price)<parseFloat(0)){
                        setNoti("ราคาค่าเช่าต้องไม่น้อยกว่า 0 บาท")
                }
                else if (parseFloat(price)>parseFloat(50000)){
                        setNoti("ราคาค่าเช่าต้องไม่เกิน 50,000 บาท")
                }
                else if (parseFloat(price)!==parseFloat(parseFloat(price).toFixed(2))){
                        setNoti("ราคาค่าเช่าต้องมีทศนิยมไม่เกิน 2 ตำแหน่ง")
                }
                else if(cashPledge===''){
                        setNoti("กรุณากรอกราคามัดจำ")
                }
                else if (parseFloat(cashPledge)<parseFloat(0)){
                        setNoti("ราคามัดจำต้องไม่น้อยกว่า 0 บาท")
                }
                else if (parseFloat(cashPledge)>parseFloat(50000)){
                        setNoti("ราคามัดจำต้องไม่เกิน 50,000 บาท")
                }
                else if (parseFloat(cashPledge)!==parseFloat(parseFloat(cashPledge).toFixed(2))){
                        setNoti("ราคามัดจำต้องมีทศนิยมไม่เกิน 2 ตำแหน่ง")
                }
                else if(leaseAgreement===''){
                        setNoti("กรุณากรอกระยะเวลาสัญญา")
                }
                else if (parseFloat(leaseAgreement)<parseFloat(1)){
                        setNoti("ระยะเวลาสัญญาต้องไม่น้อยกว่า 1 ปี")
                }
                else if (parseFloat(leaseAgreement)>parseFloat(99)){
                        setNoti("ระยะเวลาสัญญาต้องไม่เกิน 99 ปี")
                }
                else if (parseFloat(leaseAgreement)!==parseFloat(parseFloat(leaseAgreement).toFixed(0))){
                        setNoti("ระยะเวลาสัญญาต้องเป็นจำนวนเต็มเท่านั้น")
                }
                else if(electicCost===''){
                        setNoti("กรุณากรอกค่าไฟฟ้า")
                }
                else if (parseFloat(electicCost)<parseFloat(0)){
                        setNoti("ค่าไฟฟ้าไม่น้อยกว่า 0 บาท/หน่วย")
                }
                else if (parseFloat(electicCost)>parseFloat(999)){
                        setNoti("ค่าไฟฟ้าต้องไม่เกิน 999 บาท/หน่วย")
                }
                else if (parseFloat(electicCost)!==parseFloat(parseFloat(electicCost).toFixed(2))){
                        setNoti("ค่าไฟฟ้าต้องมีทศนิยมไม่เกิน 2 ตำแหน่ง")
                }
                else if(waterCost===''){
                        setNoti("กรุณากรอกค่าน้ำ")
                }
                else if (parseFloat(waterCost)<parseFloat(0)){
                        setNoti("ค่าน้ำไม่น้อยกว่า 0 บาท/หน่วย")
                }
                else if (parseFloat(waterCost)>parseFloat(999)){
                        setNoti("ค่าน้ำต้องไม่เกิน 999 บาท/หน่วย")
                }
                else if (parseFloat(waterCost)!==parseFloat(parseFloat(waterCost).toFixed(2))){
                        setNoti("ค่าน้ำต้องมีทศนิยมไม่เกิน 2 ตำแหน่ง")
                } 
                else if(img.length===0){
                        setNoti("กรุณาเพิ่มรูปภาพ")
                }        
                else{
                        let tk = token.split(" ")[1]
                        const formData = new FormData()
                        formData.append("apartmentId", dataApt._id)
                        formData.append("nameType", nameType)
                        formData.append("electricCost", electicCost)
                        formData.append("waterCost", waterCost)
                        formData.append("price", price)
                        formData.append("area", area)
                        formData.append("air", air)
                        formData.append("refrigerator", refrigerator)
                        formData.append("fan", fan)
                        formData.append("television", television)
                        formData.append("waterHeater", waterHeater)
                        formData.append("washingMachine", washingMachine)
                        formData.append("cookingStove", cookingStove)
                        formData.append("leaseAgreement", leaseAgreement)
                        formData.append("cashPledge", cashPledge)
                        img.forEach(pic => {
                                formData.append("uploadedImageArray", pic)
                        })
                        // for (let i = 0; i < img.length; i++) {
                        //         formData.append('uploadedImageArray[' + i + ']', img[i]);
                        // }
                        // console.log(img)
                        axios.post(`http://localhost:1000/api/room`, formData,
                        {       
                                headers: {
                                        'Authorization': 'Bearer ' + tk,   
                                },
                        }).then((res) => {
                                console.log(res.data)
                                toManageApt()
                        }).catch((e) => {
                                setNoti(e.response.data.message);
                        });;
                }
        }
        
        
        
        function toManageApt(){
                navigate('/ManageApt',{state:{data:dataApt}});
        }

        React.useEffect(()=>{
               console.log(dataApt)
        }, []);

        

    return (
        <div>
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Container>
                <Row>
                       <div align="center">
                                <Col xs={12} md={12} sm={12}>
                                        <div align='left'>
                                        <Button variant='secondary' 
                                                onClick={()=>{
                                                        toManageApt()
                                                }}                                        
                                        >Back</Button>      
                                        </div>                                        
                                        <div align="left" className='bordManageRoom-test'>
                                                <div className='title'>
                                                        <h3>Create Room Type</h3>
                                                </div>
                                                <Row>
                                                        <Col md={8}>
                                                                <div className='detailBordManageRoom'>
                                                                        <Row>
                                                                                <Col md={5}>
                                                                                        <Form.Label><div className='Rambla' >ชื่อชนิดห้อง</div></Form.Label>
                                                                                        <Form.Control type="text" placeholder="เช่น ห้องแอร์,ห้องพัดลม" onChange={(e) => {
                                                                                                setNameType(e.target.value)
                                                                                        }} value={nameType} disabled={dis}/>
                                                                                </Col>  
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >พื้นที่ห้อง(ตารางเมตร)</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="เป็นตัวเลขเท่านั้น" onChange={(e) => {
                                                                                                setArea(e.target.value)
                                                                                        }} value={area} disabled={dis}/>
                                                                                </Col>                                                                              
                                                                        </Row>
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ราคาค่าเช่า(บาท/เดือน)</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="เป็นตัวเลขเท่านั้น" onChange={(e) => {
                                                                                                setPrice(e.target.value)
                                                                                        }} value={price} disabled={dis}/>
                                                                                </Col>
                                                                        </Row>
                                                                        <br></br>
                                                                        <Row>                                                                               
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ราคามัดจำ(บาท)</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="เป็นตัวเลขเท่านั้น" onChange={(e) => {
                                                                                                setCashPledge(e.target.value)
                                                                                        }} value={cashPledge} disabled={dis}/>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ระยะเวลาสัญญา(ปี)</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="เป็นตัวเลขเท่านั้น" onChange={(e) => {
                                                                                               setLeaseAgreement(e.target.value)
                                                                                        }} value={leaseAgreement} disabled={dis}/>
                                                                                </Col>
                                                                        </Row>                                                                        
                                                                        {/* <br></br>
                                                                        <Row>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >จำนวนห้องที่มีอยู่</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="" onChange={(e) => {
                                                                                                setNumOfRoomTotal(e.target.value)
                                                                                        }} value={numOfRoomTotal} disabled={dis}/>
                                                                                </Col>
                                                                        </Row> */}
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ค่าไฟฟ้า (บาท/หน่วย)</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="เป็นตัวเลขเท่านั้น" onChange={(e) => {
                                                                                                setElecticCost(e.target.value)
                                                                                        }} value={electicCost} disabled={dis}/>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ค่าน้ำ (บาท/หน่วย)</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="เป็นตัวเลขเท่านั้น" onChange={(e) => {
                                                                                                setWaterCost(e.target.value)
                                                                                        }} value={waterCost} disabled={dis}/>
                                                                                </Col>
                                                                        </Row>
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col>                                                                                     
                                                                                        <label for="img">อัพโหลดรูปภาพห้องชนิดนี้ (สามารถเพิ่มรูปได้หลายครั้ง) </label><br></br>
                                                                                        <input multiple type="file" id="img" name="img" accept="image/*" onChange={(e)=>{
                                                                                                if(e.target.files.length===1){
                                                                                                        setInputImg(e.target.files[0])
                                                                                                }
                                                                                                else{
                                                                                                        let arr=[]
                                                                                                        for (let i = 0; i < e.target.files.length; i++) {
                                                                                                                arr = [...arr, e.target.files[i]]
                                                                                                        }
                                                                                                        setInputImg(arr)
                                                                                                }                                                                        
                                                                                        }}></input><br></br>
                                                                                        <br></br>
                                                                                        <button className='bt-userInfo-approve'
                                                                                               variant='success'
                                                                                               onClick={()=>{
                                                                                                        let arrData=img
                                                                                                        if(inputImg.length>1){                                                                                                                
                                                                                                                for (let i = 0; i < inputImg.length; i++) {
                                                                                                                        arrData = [...arrData, inputImg[i]]
                                                                                                                }
                                                                                                        }
                                                                                                        else{
                                                                                                                arrData = [...arrData, inputImg]
                                                                                                        }
                                                                                                        setImg(arrData)
                                                                                               }} 
                                                                                        >เพิ่ม</button>
                                                                                        <button className='bt-userInfo-reset'
                                                                                                variant='danger'
                                                                                                onClick={()=>{
                                                                                                        setImg([])
                                                                                                }}
                                                                                        >ลบรูปภาพที่เพิ่มไว้</button>
                                                                                </Col>  
                                                                        </Row>
                                                                        <br></br>
                                                                        <h5>สิ่งอำนวยความสะดวก</h5>
                                                                        <Row>
                                                                                <Col>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={air} 
                                                                                                                onClick={()=>{
                                                                                                                        setAir(!air)}}
                                                                                                                        disabled={dis} 
                                                                                                                >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีเครื่องปรับอากาศ</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div> 
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={fan}  
                                                                                                                onClick={(e)=>{setFan(!fan)}} disabled={dis} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีพัดลม</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={refrigerator}  
                                                                                                                onClick={(e)=>{setRefrigerator(!refrigerator)}} disabled={dis} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีตู้เย็น</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={waterHeater}  
                                                                                                                onClick={(e)=>{setWaterHeater(!waterHeater)}} disabled={dis}>
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีเครื่องทำน้ำอุ่น</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div> 
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={washingMachine}  
                                                                                                                onClick={(e)=>{setWashingMachine(!washingMachine)}} disabled={dis}>
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีเครื่องซักผ้า</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={cookingStove}  
                                                                                                                onClick={(e)=>{setCookingStove(!cookingStove)}} disabled={dis}>
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีที่ทำอาหาร</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                </Col>
                                                                        </Row>
                                                                </div>
                                                                <br></br>
                                                                {noti!==''?(<h6 className='noti-red' align="left" >{noti}</h6>):(<div></div>)}
                                                                <div align='right'>
                                                                        
                                                                        <button className='bt-userInfo-success' variant="dark"
                                                                                onClick={()=>{
                                                                                        setNoti('')
                                                                                        createType()
                                                                                }}
                                                                        >บันทึกชนิดห้อง</button>
                                                                       
                                                                </div>
                                                        </Col>
                                                        <Col md={4}>
                                                                <div align='center' className='bordImgCreateType'>
                                                                        {img.map((img) => (
                                                                                <div >
                                                                                        <img    className='imgCreateRoomtype'
                                                                                                src={URL.createObjectURL(img)}
                                                                                                alt="Thumb"
                                                                                        />
                                                                                </div>
                                                                        ))}  
                                                                </div>    
                                                        </Col>
                                                       
                                                </Row>
                                        </div>
                                       
                                </Col>
                       </div>
                </Row>  
                </Container>
        </div>  
    )
}

export default CreateRoomType
