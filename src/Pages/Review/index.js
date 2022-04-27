import React from 'react'
import './review.css';
import { Row, Col, Button,Carousel,Form,FloatingLabel} from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/nav'
import axios from 'axios';
import Star from '../../components/star'

const Review = () => {
        const token = localStorage.getItem("token")
        const userId = localStorage.getItem("id")
        const navigate = useNavigate();
        const dataIn = useLocation().state
        const [idType,setIdType] = React.useState(0);
        const [score,setScore] = React.useState(0);
        const [detail,setDetail] = React.useState('');
        const [review,setReview] = React.useState([])
        const [totalScore,setTotalScore] = React.useState()

        const [resultScoreData,setResultScoreData] = React.useState([]);
        const [noti,setNoti] = React.useState("");

        const [dataApt, setDataApt] = React.useState({
                id:0,
                ownerId:0,
                name: "",
                rentalFreeMin: 0,
                rentalFreeMax:0,
                locationX: "",
                locationY:"",
                domitoryType:"",
                internet:false,
                cctv:false,
                keyCard:false,
                coinWashingMachine:false,
                laundry:false,
                carPark:false,
                contact:"",
                imgAptSrc:"",
                rooms: [],
                numberOfRoom: 0,
                available: 0,
                alley:"",
                createdAt: "",
                updatedAt:"",
        });
        const [model, setModel] = React.useState('');

        React.useEffect(() => {
                getDataApt()
        }, []);

        function getDataApt() {
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/apmnt-id/${dataIn.id}`,
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                        setModel(res.data)
                }
                );
        }

        function createReview(){
                if(detail===""){
                        setNoti("กรุณากรอกรายระเอียด")
                }
                else{
                        let tk = token.split(" ")[1]
                        axios.post(`http://localhost:1000/api/review`,{
                                apartmentId :dataIn.id,
                                score : score,
                                detail : detail
                        },
                        {       
                                headers: {
                                        'Authorization': 'Bearer ' + tk,   
                                },
                        }).then((res) => {
                                getReview()
                        }).catch((e) => {
                                setNoti(e.response.data.message);
                        });;
                }
        }

        function sumTotalScore(){
                let sum=0
                sum = review.reduce(function (sum, review) {
                        return sum + review.score;
                }, 0);
                if(sum<=0){
                        setTotalScore(0)
                }
                else{
                        setTotalScore(sum/review.length)
                }
        }

        function getReview(){
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/review/${dataIn.id}`,
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                        setReview(res.data)
                });
        }

        function reModelData(){
                        let dataFil ={
                                id:0,
                                ownerId:0,
                                name: "",
                                rentalFreeMin: 0,
                                rentalFreeMax:0,
                                locationX: "",
                                locationY:"",
                                domitoryType:"",
                                internet:false,
                                cctv:false,
                                keyCard:false,
                                coinWashingMachine:false,
                                laundry:false,
                                carPark:false,
                                contact:"",
                                imgAptSrc:"",
                                rooms: [],

                                numberOfRoom: 0,
                                available: 0,
                                alley:"",
                                createdAt: "",
                                updatedAt:"",

                        }
                        dataFil.id=model._id
                        dataFil.ownerId=model.ownerId
                        dataFil.name=model.name
                        dataFil.rentalFreeMin=model.rentalFeeMin
                        dataFil.rentalFreeMax=model.rentalFeeMax
                        dataFil.locationX=model.locationX   
                        dataFil.locationY=model.locationY   
                        dataFil.domitoryType=model.dormitoryType
                        dataFil.internet=model.option.internet
                        dataFil.cctv=model.option.cctv
                        dataFil.keyCard=model.option.keyCard
                        dataFil.coinWashingMachine=model.option.coinWashingMachine
                        dataFil.laundry=model.option.laundry
                        dataFil.carPark=model.option.carPark
                        dataFil.contact=model.contact
                        dataFil.imgAptSrc=model.imgAptSrc
                        dataFil.rooms=model.rooms
                        dataFil.numberOfRoom=model.numberOfRoom
                        dataFil.available=model.available
                        dataFil.alley=model.alley
                        dataFil.createdAt=model.createdAt
                        dataFil.updatedAt=model.updatedAt        
                
                setDataApt(dataFil)
        }
        const toBack = () => {
                if(dataIn.his!=null) {
                        console.log("to detial")
                        navigate('/DetailApt',{state:{apt:dataApt,his:dataIn.his}});
                }
                else{   
                        console.log("to Agenda")
                        navigate('/Agenda');
                }   
        }

        
        React.useEffect(()=>{ 
                if(model!==''){
                        reModelData()
                        getReview()
                }
        }, [model]);

        React.useEffect(()=>{ 
               sumTotalScore()
        }, [review]);

        const priceRate = dataApt.rentalFreeMin === dataApt.rentalFreeMax ? 
        `${dataApt.rentalFreeMin} บาท`
    :
        `${dataApt.rentalFreeMin} -  ${dataApt.rentalFreeMax} บาท`


        return (
                <div>
                        <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                        <Row>
                                <Col xs={2} md={2}>
                                        <div align='right'>
                                                <Button variant="secondary" onClick={() => {
                                                        toBack()
                                                }} >back</Button>
                                        </div>
                                </Col>
                        </Row>
                        <Row>
                                <div align='center'>
                                        <Col md={8}  >
                                                <div className='bordReview'>
                                                        <Row>
                                                               <Col md={12}>
                                                                      <div align='left'>
                                                                                <h4>Review</h4> 
                                                                                <hr />
                                                                      </div>
                                                               </Col> 
                                                        </Row>
                                                        <Row>
                                                                <Col md={6}>
                                                                        <div className='slide-review'>
                                                                                <Carousel>
                                                                                        <Carousel.Item interval={1000}>
                                                                                                <img
                                                                                                        className="imgReview"
                                                                                                        src={`http://localhost:1000/${dataApt.imgAptSrc}`}
                                                                                                        alt={0}
                                                                                                />
                                                                                                <Carousel.Caption>                                                
                                                                                                </Carousel.Caption>
                                                                                        </Carousel.Item>                                                
                                                                                </Carousel>
                                                                        </div>
                                                                        <div align = 'left'>
                                                                                <div className='bord-time-review' >                                                                                
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
                                                                        <Row>
                                                                                <div className='b-book-review'>
                                                                                        {noti===""?(<div></div>):(<h6 className='noti-red' align="right" >{noti}</h6>)}
                                                                                        <a
                                                                                        className='button-in-review-page' 
                                                                                        variant="success"
                                                                                        onClick={()=>{
                                                                                                setNoti("")
                                                                                                createReview()
                                                                                        }} >ยืนยันการให้คะแนน</a>
                                                                                </div>
                                                                        </Row>
                                                                </Col>
                                                                <Col xs={6}>
                                                                        <div className='subBox-white' >
                
                                                                                <div className='all-text-detail' >
                                                                                        <div align = 'left'><h2>{dataApt.name}</h2></div>
                                                                                        <hr />
                                                                                        <Row>
                                                                                        <Col xs={6}>
                                                                                                <div className='text-detail-inner-left' align = 'left'>
                                                                                                {dataApt.domitoryType==="male"?(<div>ประเภทหอพัก : ชาย</div>):(<div></div>)}
                                                                                                {dataApt.domitoryType==="female"?(<div>ประเภทหอพัก : หญิง</div>):(<div></div>)}
                                                                                                {dataApt.domitoryType==="other"?(<div>ประเภทหอพัก : รวม</div>):(<div></div>)}
                                                                                                ราคา : {priceRate}<br></br>
                                                                                                ซอย : {dataApt.alley}<br></br>
                                                                                                {/* พิกัดแกนนอน : {dataApt.locationX}<br></br>
                                                                                                พิกัดแกนตั้ง : {dataApt.locationY}<br></br> */}
                                                                                                ช่องทางติดต่อ : {dataApt.contact} <br></br>
                                                                                                </div>
                                                                                        </Col>
                                                                                        <Col xs={6}>
                                                                                                <div className='text-detail-inner' align = 'left'>
                                                                                                        คะแนนรีวิว : <Star rating={totalScore} />
                                                                                                </div>
                                                                                        </Col>
                                                                                        </Row>
                                                                                </div>
                                                                        </div>
                                                                        <Row>
                                                                                <br />
                                                                                <h3 align='left'>รีวิวทั้งหมด</h3>
                                                                                <hr className='review-hr' />
                                                                                <div className='bordListReview'>
                                                                                        
                                                                                        {review.map((task) => (
                                                                                                <div align='left' className='cardReview'>
                                                                                                        <Row>
                                                                                                                <Col md={12}>
                                                                                                                        ชื่อ : {task.nameUser}<br></br>
                                                                                                                        <Star rating={task.score} />
                                                                                                                        รายละเอียด : {task.detail}                                                                                                                                
                                                                                                                </Col>
                                                                                                                {/* <Col md={6}>
                                                                                                                        {userId===task.userId?(
                                                                                                                                <div>
                                                                                                                                        <Button
                                                                                                                                                
                                                                                                                                        >แก้ไข</Button><br></br>
                                                                                                                                        <Button
                                                                                                                                                variant='danger' 
                                                                                                                                        >ลบ</Button>
                                                                                                                                </div>
                                                                                                                        ):(
                                                                                                                                <div></div>
                                                                                                                        )}
                                                                                                                </Col> */}
                                                                                                        </Row>
                                                                                                </div>
                                                                                        ))}  
                                                                                </div>
                                                                               
                                                                        </Row>
                                                                </Col>
                                                        </Row>
                                                </div>
                                        </Col>  
                                </div>

                        </Row>

                </div>
        )
}

export default Review
