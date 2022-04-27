import React from 'react'
import './agenda.css';
import {Row,Col} from 'react-bootstrap'
import {trans} from './dataTrans.js'
import Trans from '../../components/TransactionNoti/trans'
import Nav from '../../components/Nav/nav'
import axios from 'axios'


const Agenda  = () => {
        const token = localStorage.getItem("token")

        const [notiData,setNotiData] = React.useState([]);
        const [resultNotiData,setResultNotiData] = React.useState([]);

        function sortData(){
                notiData.sort((a, b) => b.updatedAt - a.updatedAt);
                setResultNotiData(notiData)
        }

        function getNoti(){
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/noti-customer`,
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                        let result=[]
                        result=res.data.filter((subData)=>{
                                return subData.statusAccept===true;
                        })
                        setNotiData(result)
                });
        }

        React.useEffect(() => {
                const interval = setInterval(() => {
                  getNoti()
                }, 1000)
                return () => clearInterval(interval)
        }, []);


        React.useEffect(()=>{
                getNoti()
        }, []);

        React.useEffect(()=>{
                sortData()
         }, [notiData]);

    return (
        <div>
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                       <div align="center">
                                <Col  md={8} >
                                        
                                        <div align="left" className='bord-noti-test' >
                                                <div className='title'>
                                                        <h4>Agenda</h4>
                                                </div>
                                                {resultNotiData.map((noti) => (
                                                        <Trans noti={noti} ></Trans>
                                                ))}      
                                        </div>
                                </Col>
                       </div>
                </Row>  
        </div>  
    )
}

export default Agenda
