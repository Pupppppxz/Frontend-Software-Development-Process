import React from 'react'
import './Login.css';
import {Row,Col,Form,Container} from 'react-bootstrap'
import img_bird from '../../Assets/img/Login/bird.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
const Login = () => {
        const role = localStorage.getItem("role")
        const navigate = useNavigate();
        const [inputEmail,setInputEmail] = React.useState("");
        const [inputPassword,setInputPassword] = React.useState("");
        const [emtyEmail,setEmtyEmail] = React.useState(false);
        const [emtyPassword,setEmtyPassword] = React.useState(false);

        const [noti,setNoti] = React.useState('');


    function logIn(){
        axios
        .post("http://localhost:1000/api/login",{
                email:inputEmail,
                password:inputPassword,
        }).then((res)=>{
                localStorage.setItem("token",res.data.token)
                localStorage.setItem("id",res.data.id)
                localStorage.setItem("name",res.data.fullname)
                localStorage.setItem("role",res.data.role)
                console.log(res.data)
                if(res.data.role==="customer"){
                        navigate('/DisplayApt');
                }
                else if(res.data.role==="owner"){
                        navigate('/OwnerMain');
                }
                else if(res.data.role==="admin"){
                        navigate('/Admin');
                }
        }).catch((e) => {
                console.log(e.response.data.message);
                setNoti(e.response.data.message)
        });
    }

    function toDisplayApt(){
        navigate('/DisplayApt');
    }

    function toOwnerMain(){
        navigate('/OwnerMain');
    }

    function check(){
        if(inputEmail===""){
                setEmtyEmail(true)
        }
        else{
                setEmtyEmail(false)
        }
        if(inputPassword===""){
                setEmtyPassword(true)
        }
        else{
                setEmtyPassword(false)
        }
        if(inputEmail!=="" && inputPassword!==""){
                
                setEmtyPassword(false)
                console.log("Login")
                console.log(inputEmail)
                console.log(inputPassword)
        }
    }

    React.useEffect(()=>{
        if(role!==null){
                if(role==="customer"){
                        navigate('/DisplayApt');
                }    
                else if(role==="owner"){
                        toOwnerMain()
                }
                else if(role=="admin"){
                        navigate('/Admin');
                }   
        } 
    }, []);

    return (
        <div className='login-landing'>
                <Row style={{height: '100%'}}>
                        <Col md={5}>
                                <div className='box-leftLogin'>
                                        <div className='img-left' align='center'>
                                               <img className='img-leftLogin' id='img-left1'  src={img_bird} alt="bird"  />
                                        </div> 
                                        <div align='center'>
                                                <h2 className='titleNew'>New Here?</h2>
                                                <br/>
                                                <div className='texLeft' id='texLeft1'>
                                                        Sign up and discover a great 
                                                        <br></br>
                                                        amount of new apportunities?
                                                </div>
                                        </div>
                                        <div align='center'>
                                                <a href="/SignUp" className='button-login-left' id='button-signin1'>Sign Up</a>
                                        </div>
                                </div>
                        </Col>
                        <Col md={7}>
                                <div className='box-rightLogin'>
                                        <h1 align='center'>Login to Your Account</h1>
                                        <center>
                                                <Form style={{width: '80%'}}>
                                                        <Form.Group controlId="formBasicEmail" align='left'>
                                                                <Form.Label>Email address</Form.Label>
                                                                {emtyEmail?(<h6 className='noti-red' align="right" >Email address is Emty</h6>):(<h6></h6>)}
                                                                <Form.Control type="email" placeholder="Email" value={inputEmail}  onChange={(e)=>{setInputEmail(e.target.value) }}  />
                                                        </Form.Group>
                                                        <br/>

                                                        <Form.Group controlId="formBasicPassword" align='left'>
                                                                <Form.Label>Password</Form.Label>
                                                                {emtyPassword?(<h6 className='noti-red' align="right" >Password is Emty</h6>):(<h6></h6>)}
                                                                <Form.Control type="password" placeholder="Password" value={inputPassword}  onChange={(e)=>{setInputPassword(e.target.value)}} />
                                                        </Form.Group>
                                                </Form>
                                        </center>
                                        <center>
                                                <div className='login-bottom'>
                                                        <div>
                                                                {noti!==''?(<h6 className='noti-red' align="left" >{noti}</h6>):(<div></div>)}
                                                                {/* <a href="/ForgotPass"><div  className='Rambla' >forgot your password?</div></a> */}
                                                        </div>
                                                        <div>
                                                                <button className='button-login' id='button-login1' type="button"> <div className='Rambla' onClick={() => {
                                                                        logIn()
                                                                }} >LOGIN</div></button>
                                                        </div>
                                                </div>
                                        </center>
                                </div>
                        </Col>
                </Row>
        </div>
    )
}

export default Login
