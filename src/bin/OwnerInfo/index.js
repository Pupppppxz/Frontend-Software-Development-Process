import React from 'react'
import './ownerInfo.css';
import {Row,Col} from 'react-bootstrap'
import {user} from './dataUser.js'
import UInfo from '../../components/uInfo/uInfo'
import Nav from '../../components/NavOwner/nav'

const OwnerInfo  = () => {

    return (
        <div>         
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                       <div  align="center">
                                <Col  md={6} >
                                        <div className='bord-userInfo'>
                                                <Row>
                                                        <Col>
                                                                <div className='title' align='left'>
                                                                        <h4>Owner Apartment Info</h4>
                                                                </div>
                                                        </Col>
                                                </Row>
                                                <UInfo user={user}></UInfo>
                                        </div>
                                </Col>
                       </div>
                </Row>  
        </div>
    )
}

export default OwnerInfo
