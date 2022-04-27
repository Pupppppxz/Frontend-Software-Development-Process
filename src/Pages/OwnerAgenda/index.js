import React from 'react'
import './ownerAgenda.css';
import {Row,Col} from 'react-bootstrap'
import Trans from '../../components/OwnerTransactionNoti/trans'
import Nav from '../../components/NavOwner/nav'
import axios from 'axios'

const OwnerAgenda  = () => {
        const token = localStorage.getItem("token")
        const [notiData,setNotiData] = React.useState([]);
        const [resultNotiData,setResultNotiData] = React.useState([]);


        function sortData(){
                notiData.sort((a, b) => b.id - a.id);
                setResultNotiData(notiData)
        }

        function getNoti(){
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/noti-owner`,
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                        let result=[]
                        result=res.data.filter((subData)=>{
                                return subData.statusAccept===true;
                        })

                        setResultNotiData(result)
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
                                        
                                        <div align="left" className='bord-noti' >
                                        <div className='title'>
                                                <h4>Notifications</h4>
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

export default OwnerAgenda
