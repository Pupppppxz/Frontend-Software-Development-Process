import React, {useRef} from 'react'
import './manageApt.css';
import './checkBox.css';
import {Row,Col,Button, Container,Form} from 'react-bootstrap'
import Nav from '../../components/NavOwner/nav'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api'
import mapStyle from './mapStyle'

const CreateApt  = () => {
        const token = localStorage.getItem("token")
        const navigate = useNavigate();
        const [name,setName] = React.useState('');
        const [rentalFeeMin,setRentalFeeMin] = React.useState(0);
        const [rentalFeeMax,setRentalFeeMax] = React.useState(0);
        const [alley,setAlley] = React.useState('เกกีงาม 1');
        const [location,setLocation] = React.useState('');
        
        const [dormitoryType,setDormitoryType] = React.useState('male');
        const [internet,setInternet] = React.useState(false);
        const [cctv,setCCTV] = React.useState(false);
        const [keyCard,setKeyCard] = React.useState(false);
        const [coinWashingMachine,setCoinWashingMachine] = React.useState(false);
        const [laundry,setLaundry] = React.useState(false);
        const [carPark,setCarPark] = React.useState(false);
        const [contact,setContact] = React.useState('');
        const [imgAptSrc,setImgAptSrc] = React.useState("");
        
        const [locationX,setLocationX] = React.useState(0);
        const [locationY,setLocationY] = React.useState(0);
        const [locationMap,setLocationMap] = React.useState({ lat: 13.7276575, lng: 100.7703233 });

        const [noti,setNoti] = React.useState('');

        function toMain(){
                navigate('/OwnerMain');
        }

        function createApt(){
                if(name===''){
                        setNoti("กรุณากรอกชื่อหอพัก")
                }
                else if(name.length>50){
                        setNoti("ชื่อหอพักต้องไม่เกิน 50 ตัวอักษร")
                }
                else if(locationX===''){
                        setNoti("กรุณากรอกพิกัดแกน X")
                }
                else if(locationY===''){
                        setNoti("กรุณากรอกพิกัดแกน Y")
                }
                else if(imgAptSrc===""){
                        setNoti("กรุณาเลือกรูปภาพที่ต้องการอัพโหลด")
                }
                else if(parseInt(imgAptSrc.size)>parseInt(5242880)){
                        setNoti("ไฟล์รูปภาพต้องขนาดไม่เกิน 5  เมกะไบต์")
                }
                else{  
                        let tk = token.split(" ")[1]
                        const formData = new FormData()
                        formData.append("name", name)
                        formData.append("locationX", locationX)
                        formData.append("locationY", locationY)
                        formData.append("dormitoryType", dormitoryType)
                        formData.append("alley", alley)
                        formData.append("internet", internet)
                        formData.append("cctv", cctv)
                        formData.append("keyCard", keyCard)
                        formData.append("laundry", laundry)
                        formData.append("carPark", carPark)
                        formData.append("coinWashingMachine", coinWashingMachine)
                        formData.append("uploadedImageSingle", imgAptSrc)
                        axios.post(`http://localhost:1000/api/apmnt`, formData,
                        {       
                                headers: {
                                        'Authorization': 'Bearer ' + tk,   
                                },
                        }).then((res) => {
                                navigate('/OwnerMain');
                        }).catch((e) => {
                                setNoti(e.response.data.message);
                        });;
                }
        }

        const mapRef = useRef(null)

        const containerStyle = {
                width: '600px',
                height: '500px'
        }
       
        const centerConteiner = {
                lat: 13.7276575,
                lng: 100.7703233
        }

        const { isLoaded } = useJsApiLoader({
                id: 'google-map-script',
                googleMapsApiKey: "AIzaSyBEIihSVTIBgefm0RE1vFG38TJXP2e7xlQ"
        })

        const onload = (map) => {
                mapRef.current = map;
        }

        const options = {
                styles: mapStyle,
                disableDefaultUI: true,
                zoomControl: true
        }

        const unMount = () => {
                mapRef.current = null;
        }

        const onMapClick = (e) => {
                setLocationX(e.latLng.lat())
                setLocationY(e.latLng.lng())
                setLocationMap({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }

        console.log("locationX = ", locationX)
        console.log("locationY = ", locationY)

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
                                                        toMain()
                                                }}
                                        >Back</Button>
                                        </div>
                                        <div align="left" className='bordManageApt-test'>
                                                <div className='title'>
                                                        <h4>Create Apartment</h4>
                                                </div>
                                                <Row>
                                                        <Col md={12}>
                                                                <div className='detailBordManageApt'>
                                                                        <Row>
                                                                                <Col md={5}>
                                                                                        <Form.Label><div className='Rambla' >ชื่อหอพัก</div></Form.Label>
                                                                                        <Form.Control type="text" placeholder="เช่น หอพักสุขสันต์" onChange={(e) => {
                                                                                                setName(e.target.value)
                                                                                        }} value={name} />
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ชนิดหอพัก</div></Form.Label>
                                                                                        <Form.Select aria-label="Default select example" value={dormitoryType} onChange={(e)=>setDormitoryType(e.target.value)} >
                                                                                                <option value="male">ชาย</option>
                                                                                                <option value="female">หญิง</option>
                                                                                                <option value="both">หอพักรวม</option>                                                                                        
                                                                                        </Form.Select>                                                                                        
                                                                                </Col>
                                                                        </Row>                                                                       
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col md={7}>
                                                                                        <Form.Label><div className='Rambla' >ซอย</div></Form.Label>
                                                                                        <Form.Select aria-label="Default select example" value={alley} onChange={(e)=>{setAlley(e.target.value)}} >
                                                                                                <option value="เกกีงาม 1">เกกีงาม 1</option>
                                                                                                <option value="เกกีงาม 2">เกกีงาม 2</option>
                                                                                                <option value="เกกีงาม 3">เกกีงาม 3</option>
                                                                                                <option value="เวิร์คพอยด์">เวิร์คพอยด์</option>
                                                                                                <option value="หอใหม่">หอใหม่</option>
                                                                                                <option value="RNP PLACE">RNP PLACE</option>
                                                                                                <option value="ENJOY">ENJOY</option>
                                                                                                <option value="บ้านกลางสวน">บ้านกลางสวน</option>   
                                                                                                <option value="AJ Park">AJ Park</option>  
                                                                                                <option value="FBT">FBT</option>
                                                                                                <option value="อื่นๆ">อื่นๆ</option>                                                                                      
                                                                                        </Form.Select>                                              
                                                                                </Col>
                                                                        </Row>
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col md={4}>
                                                                                        <Form.Label><div className='Rambla' >พิกัดละติจูด</div></Form.Label>
                                                                                        <Form.Control type="text" placeholder="กรอกพิกัดแกน X ของหอพัก" onChange={(e) => {
                                                                                                setLocationX(e.target.value)
                                                                                        }} value={locationX}/>
                                                                                </Col>
                                                                                <Col md={4}>
                                                                                        <Form.Label><div className='Rambla' >พิกัดลองจิจูด</div></Form.Label>
                                                                                        <Form.Control type="text" placeholder="กรอกพิกัดแกน Y ของหอพัก" onChange={(e) => {
                                                                                                setLocationY(e.target.value)
                                                                                        }} value={locationY} />
                                                                                </Col>
                                                                                <br/>
                                                                                <br/>
                                                                                {!isLoaded ? (
                                                                                        <div>Map Loaging...</div>
                                                                                ):(
                                                                                        <GoogleMap
                                                                                                mapContainerStyle={containerStyle}
                                                                                                options={options}
                                                                                                center={centerConteiner}
                                                                                                zoom={19}
                                                                                                onLoad={onload}
                                                                                                onUnmount={unMount}
                                                                                                onClick={onMapClick}
                                                                                        >
                                                                                                <marker
                                                                                                        position={locationMap}
                                                                                                />
                                                                                        </GoogleMap>
                                                                                )}
                                                                        </Row>                                                                        
                                                                        <br></br>
                                                                        <Row>
                                                                                <form action="/">                                                                                        
                                                                                        <label for="img">อัพโหลดรูปภาพหอพัก:</label><br></br>
                                                                                        <input type="file" id="img" name="img" accept="image/*" onChange={(e)=>{
                                                                                                setImgAptSrc(e.target.files[0])                                                                        
                                                                                        }}></input>
                                                                                </form>
                                                                        </Row>
                                                                        <br></br>
                                                                        <br></br>
                                                                        <h5>สิ่งอำนวยความสะดวก</h5>
                                                                        <Row>
                                                                                <Col>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={internet} 
                                                                                                                onClick={()=>{
                                                                                                                        setInternet(!internet)}}
                                                                                                                        
                                                                                                                >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีอินเทอร์เน็ต</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div> 
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={cctv}  
                                                                                                                onClick={(e)=>{setCCTV(!cctv)}} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีโทรทัศน์วงจรปิด</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={keyCard}  
                                                                                                                onClick={(e)=>{setKeyCard(!keyCard)}}  >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีคีย์การ์ด</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={coinWashingMachine}  
                                                                                                                onClick={(e)=>{setCoinWashingMachine(!coinWashingMachine)}} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีเครื่องซักผ้าหยอดเหรียญ</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div> 
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={laundry}  
                                                                                                                onClick={(e)=>{setLaundry(!laundry)}} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีซักรีด</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={carPark}  
                                                                                                                onClick={(e)=>{setCarPark(!carPark)}} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีที่จอดรถ</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                </Col>
                                                                        </Row>
                                                                </div>
                                                                <br></br>
                                                               
                                                        </Col>
                                                        {noti!==''?(<h6 className='noti-red' align="left" >{noti}</h6>):(<div></div>)}
                                                        <div align='right'>
                                                                <p
                                                                        className='bt-userInfo-test'
                                                                        variant='dark'
                                                                        onClick={()=>{
                                                                        setNoti('')
                                                                        createApt()
                                                                        }}
                                                                >สร้างหอพัก</p>
                                                        </div>
                                                </Row>
                                        </div>
                                       
                                </Col>
                       </div>
                </Row>  
                </Container>
        </div>  
    )
}

export default CreateApt
