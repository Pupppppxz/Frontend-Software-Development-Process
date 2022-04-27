import React from 'react'
import './detailApt.css';
import {Row,Col,Button, Container} from 'react-bootstrap'
import BoxDetail from '../../components/DetailApt/BoxDetail.js'
import {useLocation} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
import Nav from '../../components/Nav/nav'

const DetailApt  = () => {
       
        const dataApt = useLocation().state.apt;
        const stateDisplayApt = useLocation().state.his
        const navigate = useNavigate();

        const toDisplay=()=>{    
                navigate('/DisplayApt',{state:{stateDisplayApt}});
        }
        React.useEffect(()=>{
              
        }, []);
            
    return (
        <div className='scroll-apt-detail'> 
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                        <Col xs={2} md={2}>
                                <div align = 'right'>
                                        <Button variant="secondary"  onClick={()=>{toDisplay()}} >Back</Button>
                                </div>
                        </Col>
                </Row>
                <Row>
                        <div align = 'center'>
                                <Col  md={8}>
                                        <BoxDetail data={dataApt} his={stateDisplayApt}></BoxDetail>
                                </Col>
                        </div>
                </Row>
        </div>  
    )
}

export default DetailApt
