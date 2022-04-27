import React from 'react'
import './ownerMain.css';
import {Row,Col,Button, Container} from 'react-bootstrap'
import Nav from '../../components/NavOwner/nav'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const OwnerMain  = () => {

        const navigate = useNavigate();
        const[dataApt,setDataApt] = React.useState([])
        const token = localStorage.getItem("token")

        function getData(){ 
                let tk=token.split(" ")[1]
                axios.get(`http://localhost:1000/api/apmnt-owner-room`,{
                        headers: {
                                'Authorization': 'Bearer ' + tk
                        }
                })
                .then((res)=>{
                        setDataApt(res.data)
                });
                
        }
       
        function toManage(dataApt){
                navigate('/ManageApt',{state:{data:dataApt}});
        }

        function toCreateApt(){
                navigate('/CreateApt');
        }
        React.useEffect(()=>{
                getData()
        }, [] );

        React.useEffect(()=>{
        
        }, [] );

    return (
        <div>
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Container>
                <Row>
                       <div align="center">
                                <Col md={10}>
                                        
                                        <div align="left" className='bordDomitoryManagement' >
                                                <div className='title'>
                                                        <h3>Domitory Management</h3>
                                                </div>
                                                {/* <hr /> */}
                                                <div className='bordDomitoryManagement-detail-test'>
                                                        {dataApt.map((data) => (
                                                                <div className='DorManageCard' onClick={()=>{
                                                                        toManage(data)
                                                                }}>
                                                                        
                                                                        <Row>
                                                                                <div className="display-apt-grid-item">
                                                                                        <img  className='imgApt-test'  src={`http://localhost:1000/${data.imgAptSrc}`} alt="img"  />
                                                                                        <div className='display-apt-grid-item-right'>
                                                                                                <h4>{data.name}</h4>
                                                                                                ราคา : {data.rentalFeeMin} - {data.rentalFeeMax}<br></br>
                                                                                                {data.dormitoryType==="male"?(<div> ชนิดหอพัก : ชาย</div>):(<div></div>)}
                                                                                                {data.dormitoryType==="female"?(<div> ชนิดหอพัก : หญิง</div>):(<div></div>)}
                                                                                                {data.dormitoryType==="orther"?(<div> ชนิดหอพัก : รวม</div>):(<div></div>)} 
                                                                                                พิกัดละติจูด : {data.locationX}<br></br>
                                                                                                พิกัดลองจิจูด : {data.locationY}<br></br>
                                                                                                ซอย : {data.alley}<br></br>
                                                                                        </div>
                                                                                </div>
                                                                        </Row>
                                                                        
                                                                </div>
                                                        ))} 
                                                </div>
                                                <div align='right'>
                                                        <p variant="dark"
                                                                className='bt-userInfo-test'
                                                                onClick={()=>{
                                                                        toCreateApt()
                                                                }}
                                                        >เพิ่มหอพัก</p>   
                                                </div>  
                                        </div>
                                </Col>
                       </div>
                </Row>  
                </Container>
        </div>  
    )
}

export default OwnerMain
