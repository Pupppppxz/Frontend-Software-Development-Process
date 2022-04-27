import React from 'react'
import './manageApt.css';
import './checkBox.css';
import {Row,Col,Button, Container,Form} from 'react-bootstrap'
import Nav from '../../components/NavOwner/nav'
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const ManageApt  = () => {
        const token = localStorage.getItem("token")
        const navigate = useNavigate();
        const dApt = useLocation().state.data;
        const [dataApt,setDataApt] = React.useState(dApt);
        const [name,setName] = React.useState('');
        const [rentalFeeMin,setRentalFeeMin] = React.useState(0);
        const [rentalFeeMax,setRentalFeeMax] = React.useState(0);
        const [alley,setAlley] = React.useState('');
        const [location,setLocation] = React.useState('');
        const [locationX,setLocationX] = React.useState('');
        const [locationY,setLocationY] = React.useState('');
        const [dormitoryType,setDormitoryType] = React.useState('');
        const [internet,setInternet] = React.useState(false);
        const [cctv,setCCTV] = React.useState(false);
        const [keyCard,setKeyCard] = React.useState(false);
        const [coinWashingMachine,setCoinWashingMachine] = React.useState(false);
        const [laundry,setLaundry] = React.useState(false);
        const [carPark,setCarPark] = React.useState(false);
        const [contact,setContact] = React.useState(false);
        const [imgAptSrc,setImgAptSrc] = React.useState(null);
        const [rooms,setRooms] = React.useState([]);
        const [noti,setNoti] = React.useState('');
        const [dis,setDis] = React.useState(true);
        const [disPic,setDisPic] = React.useState(true);

        function getData(){
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/apmnt-id/${dApt._id}`,
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                        setDataApt(res.data)
                }
                );
        }

        function deleteApt(){
                let tk = token.split(" ")[1]
                axios.delete(`http://localhost:1000/api/apmnt`,{       
                        
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                        data: {
                                id:dataApt._id
                        },
                },).then((res) => {
                        console.log(res)
                        toMain()
                })

        }

        React.useEffect(()=>{
               getData()
        }, []);


        function setInputDefault(){
                setName(dataApt.name)
                setRentalFeeMax(dataApt.rentalFeeMax)
                setRentalFeeMin(dataApt.rentalFeeMin)
                setAlley(dataApt.alley)
                setLocation(dataApt.Location)
                setLocationX(dataApt.locationX)
                setLocationY(dataApt.locationY)
                setDormitoryType(dataApt.dormitoryType)
                setInternet(dataApt.option.internet)
                setCCTV(dataApt.option.cctv)
                setKeyCard(dataApt.option.keyCard)
                setCoinWashingMachine(dataApt.option.coinWashingMachine)
                setLaundry(dataApt.option.laundry)
                setCarPark(dataApt.option.carPark)
                setContact(dataApt.contact)
                setImgAptSrc(dataApt.imgAptSrc)
        }

        function  UpdateApt(){
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
                        axios.put(`http://localhost:1000/api/apmnt`,{
                                id:dataApt._id,
                                name : name,
                                locationX:locationX,
                                locationY:locationY,
                                dormitoryType:dormitoryType,
                                contact:contact,
                                option:{
                                        "internet":internet,
                                        "cctv":cctv,
                                        "keyCard":keyCard,
                                        "laundry":laundry,
                                        "carPark":carPark,
                                        "coinWashingMachine":coinWashingMachine
                                },
                                alley:alley
                        },    
                        {       
                                headers: {
                                        'Authorization': 'Bearer ' + tk,   
                                },
                        }).then((res) => {
                                console.log(res)
                                setDis(!dis)
                        })
                        .catch((e) => {
                                console.log(e.response.data.message);
                                setNoti(e.response.data.message)
                        });;
                }
        }

        function updateImg(){
                let tk =token.split(" ")[1]
                const formData = new FormData()
                formData.append("id",dataApt._id)
                formData.append("uploadedImageSingle", imgAptSrc)
                axios.put(`http://localhost:1000/api/apmnt-image`,formData,    
                {       
                    headers: {
                        'Authorization': 'Bearer ' + tk,   
                    },
                }).then((res) => {
                    console.log(res)
                    getData()
                    setDisPic(!disPic)
                })
                .catch((e) => {
                    console.log(e.response.data.message);
                    setNoti(e.response.data.message)
                });
                ;
        }
        


        function toManageRoom(data){
                navigate('/ManageRooms',{state:{data:data,dataApt:dataApt}});
        }
        function toMain(){
                navigate('/OwnerMain');
        }
        function toCreateRoom(){
                navigate('/CreateRoomType',{state:{dataApt:dataApt}});
        }


        React.useEffect(()=>{
               setInputDefault()
        }, [dataApt]);

       

        

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
                                        <div align="left" className='bordManageApt'>
                                                <div className='title'>
                                                        <h3>General info</h3>
                                                </div>
                                                <Row>
                                                        <Col md={8}>
                                                                <div className='detailBordManageApt'>
                                                                        <Row>
                                                                                <Col md={5}>
                                                                                        <Form.Label><div className='Rambla' >ชื่อหอพัก</div></Form.Label>
                                                                                        <Form.Control type="text" placeholder="Enter name" onChange={(e) => {
                                                                                                setName(e.target.value)
                                                                                        }} value={name} disabled={dis}/>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ชนิดหอพัก</div></Form.Label>
                                                                                        <Form.Select aria-label="Default select example" value={dormitoryType} onChange={(e)=>{setDormitoryType(e.target.value)}} disabled={dis}>
                                                                                                <option value="male">ชาย</option>
                                                                                                <option value="female">หญิง</option>
                                                                                                <option value="orther">หอพักรวม</option>                                                                                        
                                                                                        </Form.Select>                                                                                        
                                                                                </Col>
                                                                        </Row>
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ช่วงราคาตั้งแต่</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="" onChange={(e) => {
                                                                                                setRentalFeeMin(e.target.value)
                                                                                        }} value={rentalFeeMin} disabled={true}/>
                                                                                </Col>
                                                                                <Col md={3}>
                                                                                        <Form.Label><div className='Rambla' >ถึงราคาที่สูงที่สุด</div></Form.Label>
                                                                                        <Form.Control type="number" placeholder="" onChange={(e) => {
                                                                                               setRentalFeeMax(e.target.value)
                                                                                        }} value={rentalFeeMax} disabled={true}/>
                                                                                </Col>
                                                                        </Row>
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col md={7}>
                                                                                        <Form.Label><div className='Rambla' >ซอย</div></Form.Label>
                                                                                        <Form.Select aria-label="Default select example" value={alley} onChange={(e)=>{setAlley(e.target.value)}} disabled={dis}>
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
                                                                                        <Form.Label><div className='Rambla' >พิกัดลองจิจูด</div></Form.Label>
                                                                                        <Form.Control type="text" placeholder="กรอกพิกัดแนวตั้งของหอพัก" onChange={(e) => {
                                                                                                setLocationY(e.target.value)
                                                                                        }} value={locationY} disabled={dis}/>
                                                                                </Col>
                                                                                <Col md={4}>
                                                                                        <Form.Label><div className='Rambla' >พิกัดละติจูด</div></Form.Label>
                                                                                        <Form.Control type="text" placeholder="กรอกพิกัดแนวนอนของหอพัก" onChange={(e) => {
                                                                                                setLocationX(e.target.value)
                                                                                        }} value={locationX} disabled={dis}/>
                                                                                </Col>
                                                                        </Row>
                                                                        <br></br>
                                                                        <Row>
                                                                                <Col md={9}>
                                                                                        <Form.Label><div className='Rambla' >ช่องทางติดต่อ</div></Form.Label>
                                                                                        <Form.Control as="textarea" placeholder="กรอกช่องทางการติดต่อของท่าน" onChange={(e) => {
                                                                                                setContact(e.target.value)
                                                                                        }} value={contact} disabled={dis}/>
                                                                                </Col>
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
                                                                                                                        disabled={dis} 
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
                                                                                                                onClick={(e)=>{setCCTV(!cctv)}} disabled={dis} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีโทรทัศน์วงจรปิด</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={keyCard}  
                                                                                                                onClick={(e)=>{setKeyCard(!keyCard)}} disabled={dis} >
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีคีย์การ์ด</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={coinWashingMachine}  
                                                                                                                onClick={(e)=>{setCoinWashingMachine(!coinWashingMachine)}} disabled={dis}>
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีเครื่องซักผ้าหยอดเหรียญ</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div> 
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={laundry}  
                                                                                                                onClick={(e)=>{setLaundry(!laundry)}} disabled={dis}>
                                                                                                        </input>
                                                                                                        <span className="toggle__label">
                                                                                                        <span className="toggle__text">มีซักรีด</span>
                                                                                                        </span>
                                                                                                </label>
                                                                                        </div>
                                                                                        <div className="page__toggle">
                                                                                                <label className="toggle">
                                                                                                        <input className="toggle__input" type="checkbox" checked={carPark}  
                                                                                                                onClick={(e)=>{setCarPark(!carPark)}} disabled={dis}>
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
                                                                <div align='right'>
                                                                        {dis?(
                                                                                <div>
                                                                                        <a className='bt-userInfo-reset' variant="danger"
                                                                                        onClick={()=>{
                                                                                                deleteApt()
                                                                                        }}
                                                                                        >ลบข้อมูลหอพักนี้</a>
                                                                                        <a className='bt-userInfo-test' variant="dark"
                                                                                                onClick={()=>{
                                                                                                        setDis(false)
                                                                                                }}
                                                                                        >แก้ไขข้อมูล</a>
                                                                                </div>
                                                                        ):(
                                                                                <div>
                                                                                        {noti!==''?(<h6 className='noti-red' align="left" >{noti}</h6>):(<div></div>)}
                                                                                        <a 
                                                                                                className='bt-userInfo-approve' 
                                                                                                variant="success"
                                                                                                onClick={()=>{
                                                                                                        UpdateApt()
                                                                                                }}
                                                                                        >ยืนยัน</a>
                                                                                        <a 
                                                                                                className='bt-userInfo-reset'
                                                                                                variant="danger"
                                                                                                onClick={()=>{
                                                                                                        setDis(true)
                                                                                                        setInputDefault()
                                                                                                }}
                                                                                        >ยกเลิก</a>
                                                                                </div>
                                                                        )}
                                                                        <br></br>
                                                                        <br></br>
                                                                        
                                                                </div>
                                                        </Col>
                                                        <Col md={4}>
                                                                <div align='center' >
                                                                        {disPic?(
                                                                                <div>
                                                                                        <img  id='img' className='imgAptManage-test'   src={`http://localhost:1000/${imgAptSrc}`} alt="imgApt"  />
                                                                                </div>
                                                                        ):(
                                                                                <div></div>
                                                                        )}
                                                                        
                                                                </div>
                                                                <div align='center' >
                                                                <br></br>
                                                                {disPic?(
                                                                        <a className='bt-userInfo-test' variant="dark"
                                                                                        onClick={()=>{
                                                                                                setDisPic(false)
                                                                                        }}
                                                                        >แก้ไขรูปภาพ</a>
                                                                ):(
                                                                        <div>
                                                                                <form action="/">                                                                                        
                                                                                        <input type="file" id="img" name="img" accept="image/*" onChange={(e)=>{
                                                                                                setImgAptSrc(e.target.files[0])  
                                                                                        }}></input>
                                                                                </form>
                                                                                <br/><br/>
                                                                                <a className='bt-userInfo-approve' variant="success"
                                                                                        onClick={()=>{
                                                                                                updateImg()
                                                                                        }}
                                                                                >ยืนยัน</a>
                                                                                <a className='bt-userInfo-reset' variant="danger"
                                                                                        onClick={()=>{
                                                                                                setDisPic(true)
                                                                                        }}
                                                                                >ยกเลิก</a>
                                                                        </div>
                                                                )}
                                                                </div>
                                                                <br></br>
                                                                <br></br>
                                                                <div className='boxTypeManage'>
                                                                        {dataApt.rooms.map((task) => (
                                                                                <div className='cardTypeManage' 
                                                                                        onClick={()=>{
                                                                                                toManageRoom(task)
                                                                                        }}
                                                                                >
                                                                                        ชนิดห้อง : {task.nameType}<br></br>
                                                                                        ราคา : {task.price}<br></br>
                                                                                        พื้นที่ : {task.area}

                                                                                </div>
                                                                        ))}                                                                         
                                                                </div>
                                                                <br></br>
                                                                <div align='right'>
                                                                        <a className='bt-userInfo-test'
                                                                                variant='dark'
                                                                                onClick={()=>{
                                                                                        toCreateRoom()
                                                                                }}
                                                                        >เพิ่มชนิดห้อง</a>  
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

export default ManageApt
