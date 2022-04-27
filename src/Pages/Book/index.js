import React from 'react'
import './book.css';
import {Row,Col,Button} from 'react-bootstrap'
import BoxDetail from '../../components/Book/BoxDetail.js'
import {useLocation} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import Nav from '../../components/Nav/nav'



const BookApt  = () => {
        
        const navigate = useNavigate();
        const dataApt = useLocation().state.dataApt;
        const dataRoom = useLocation().state.dataRoom;
        const his = useLocation().state.his;



        React.useEffect(()=>{
               console.log(dataApt)
               console.log(dataRoom)
        }, []);


        const toDetail=()=>{    
                navigate('/DetailApt',{state:{apt:dataApt,his:his}});
        }
    return (
        <div>
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                        <Col xs={2} md={2}>
                                <div align = 'right'>
                                       <Button variant="secondary" onClick={()=>{
                                               toDetail()
                                       }} >back</Button>
                                </div>
                        </Col>
                </Row>
                <Row>
                        <div align = 'center'>
                                
                                <Col xs={8}  md={8}>
                                        <BoxDetail data={dataApt}  ></BoxDetail>
                                </Col>
                        </div>
                        
                </Row>
                
        </div>
    )
}

export default BookApt
