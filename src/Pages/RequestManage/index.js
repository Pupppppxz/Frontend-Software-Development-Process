import React from 'react'
import './requestManage.css';
import {Row,Col} from 'react-bootstrap'
import {trans} from './dataTrans.js'
import Trans from '../../components/RequestManageTransaction/trans'
import Nav from '../../components/NavOwner/nav'


const RequestManage  = () => {
        const dataTrans=trans
        

        const [requestData,setRequestData] = React.useState([]);
        const [resultNotiData,setResultNotiData] = React.useState([]);

        function findData(){
                let result = []  
                result=dataTrans.filter((data)=>{
                        return data.statusAccept===false&&data.statusReject===false;
                })
                setRequestData(result)
        }

        function sortData(){
                requestData.sort((a, b) => b.id - a.id);
                setResultNotiData(requestData)
        }

        React.useEffect(()=>{
               findData()      
        }, []);

        React.useEffect(()=>{
                sortData()
         }, [requestData]);

    return (
        <div>
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                       <div align="center">
                                <Col xs={8} md={8} sm={8}>
                                        
                                        <div align="left" className='bord-noti' >
                                        <div className='title'>
                                                <h4>Request</h4>
                                        </div>
                                        {resultNotiData.map((task) => (
                                                <Trans data={task}></Trans>
                                        ))}      
                                        </div>
                                </Col>
                       </div>
                </Row>  
        </div>  
    )
}

export default RequestManage
