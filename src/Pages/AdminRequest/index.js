import React from 'react'
import {Row,Col} from 'react-bootstrap'
import './admin.css'
import Trans from '../../components/AdminTrans/AdTrans'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/NavAdmin/nav'

const AdminRequest = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("role")
    const token = localStorage.getItem("token")
    const [dataReq,setDataReq] = React.useState([]);
    const [dataOwner,setDataOwner] = React.useState([]);

    const [action,setAction] = React.useState(false);

    function getReq(){
        let tk = token.split(" ")[1]
        axios.get(`http://localhost:1000/api/owner-admin`,
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res.data)
            
            setDataReq(res.data)
            
        });
    }


    React.useEffect(()=>{
        getReq()
        if(role!=="admin"){

            if(role==="owner"){
                navigate('/OwnerMain');
            }
            else if(role=="customer"){
                navigate('/DisplayApt');
            }
        }
    }, []);

    function getOwnerUser(){
        let tk = token.split(" ")[1]
        axios.get(`http://localhost:1000/api/owner-all`,{       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            setDataOwner(res.data)
            console.log(res.data)
        });
    }

    React.useEffect(()=>{
        getReq()
        getOwnerUser()
    }, [action]);

  return (
    <div>
        <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
        <Row>
            <div align="center">
                <Col>
                    <div className = "adminContainer">
                        <div className = "title">
                            <h4>Request</h4>
                        </div>
                        <Row>
                            <Col md={7}  >
                                {dataReq.map((r) => (
                                    <Trans DataReq={r} setAction={setAction} action={action} ></Trans>
                                ))}  
                            </Col>
                            <Col md={5}>
                                <div className='listOwner'>
                                    <h4>รายชื่อ Owner</h4>
                                    <div>
                                        {dataOwner.map((u) => (
                                            <div>{u.nameUser}</div>
                                        ))}  
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </div>
        </Row>
    </div>
  )
}

export default AdminRequest