import React from 'react'
import './userInfo.css';
import {Row,Col} from 'react-bootstrap'
import UInfo from '../../components/uInfo/uInfo'
import Nav from '../../components/NavOwner/nav'
import axios from 'axios';

const UserInfo  = () => {
        

        const [edit,setEdit] = React.useState(false);
        const [user,setUser] = React.useState(null);
        const token = localStorage.getItem("token")

        function getUserData(){
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/user`,{       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                       setUser(res.data)
                });
        }

        React.useEffect(()=>{
                getUserData()
        }, []);

    return (
        <div>         
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                       <div  align="center">
                                <Col md={6}>
                                        <div className='bord-userInfo'>
                                                <Row>
                                                        <Col>
                                                                <div className='title' align='left'>
                                                                        <h4>User Info</h4>
                                                                </div>
                                                        </Col>
                                                </Row>
                                                {user===null?(<div></div>):(<UInfo user={user} token={token}></UInfo>)}
                                        </div>
                                </Col>
                       </div>
                </Row>  
        </div>
    )
}

export default UserInfo
