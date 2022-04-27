import React from 'react'
import './Signin.css';
import {Row,Col,Form} from 'react-bootstrap'
import img_bird from '../../Assets/img/Login/bird.png'
import axios from 'axios'
import {useNavigate} from 'react-router-dom';

const Signin = () => {
        const navigate = useNavigate();
        const [inputFirstName,setInputFirstName] = React.useState("");
        const [emtyFirstName,setEmtyFirstName] = React.useState(false);

        const [inputLastName,setInputLastName] = React.useState("");
        const [emtyLastName,setEmtyLastName] = React.useState(false);

        const [inputGender,setInputGender] = React.useState("male");
        const [emtyGender,setEmtyGender] = React.useState(false);

        const [inputEmail,setInputEmail] = React.useState("");
        const [emtyEmail,setEmtyEmail] = React.useState(false);

        const [inputPhoneNumber,setInputPhoneNumber] = React.useState("");
        const [emtyPhoneNumber,setEmtyPhoneNumber] = React.useState(false);

        const [inputPassword,setInputPassword] = React.useState("");
        const [emtyPassword,setEmtyPassword] = React.useState(false);

        const [inputRePassword,setInputRePassword] = React.useState("");
        const [emtyRePassword,setEmtyRePassword] = React.useState(false);

        const[notiComparePass,setNotiComparePass] = React.useState(false)

        const [noti,setNoti] = React.useState('');

        function send(){
                console.log("SignUp")
                console.log(inputFirstName)
                console.log(inputLastName)
                console.log(inputGender)
                console.log(inputEmail)
                console.log(inputPhoneNumber)
                console.log(inputPassword)
                console.log(inputRePassword)
        }

        function signUp() {
                axios
                .post("http://localhost:1000/api/register",{
                        firstName :inputFirstName,
                        lastName:inputLastName,
                        password:inputPassword,
                        password2:inputRePassword,
                        email : inputEmail,
                        gender : inputGender,
                        phone :inputPhoneNumber,
                }).then((res)=>{
                        if(res.data.message=="Registered"){
                                toLogin()
                        }
                }).catch((e) => {
                        console.log(e.response.data.message);
                        setNoti(e.response.data.message)
                });
        }
        const toLogin=()=>{
                navigate('/');
        }
        
        function check(){
                if(inputFirstName===""){
                        setEmtyFirstName(true)
                }
                else{
                        setEmtyFirstName(false)
                }
                if(inputLastName===""){
                        setEmtyLastName(true)
                }
                else{
                        setEmtyLastName(false)
                }
                if(inputGender==="select"){
                        setEmtyGender(true)
                }
                else{
                        setEmtyGender(false)
                }
                if(inputEmail===""){
                        setEmtyEmail(true)
                }
                else{
                        setEmtyEmail(false)
                }
                if(inputPhoneNumber===""){
                        setEmtyPhoneNumber(true)
                }
                else{
                        setEmtyPhoneNumber(false)
                }
                if(inputPassword===""){
                        setEmtyPassword(true)
                }
                else{
                        setEmtyPassword(false)
                }
                if(inputRePassword===""){
                        setEmtyRePassword(true)
                }
                else{
                        setEmtyRePassword(false)
                }
                if( inputFirstName!=="" && inputLastName!=="" &&  inputGender!=="select" && inputEmail!=="" && inputPhoneNumber!=="" && inputPassword!=="" && inputRePassword!==""){
                        if(inputPassword===inputRePassword){
                                setNotiComparePass(false)
                                send()
                        }
                        else{
                                setNotiComparePass(true)
                        }
                        
                }
        }


    return (
        <div>
        <Row style={{height: '100vh'}}>
                <Col md={5}>
                        <div className='box-bird' >
                                <Row>
                                        <img className='img-bird' id='img-left1'  src={img_bird} alt="bird"  />
                                </Row>
                                
                                <Row>
                                        {/* <Col md={3}>
                                        </Col> */}
                                        <Col md={6}>
                                                <div>
                                                        <br></br>
                                                        <a href="/">
                                                        <button className='button-signup' id='button-signin1' type="button"  >Login</button>
                                                        </a> 
                                                </div>
                                        </Col>
                                        {/* <Col md={3}>
                                        </Col> */}
                                </Row>
                                
      
                        </div>
                        
                </Col>
                <Col md={7}>
                        <div className='signup-right'>
                                <Row>
                                        <Col md={3}></Col>
                                        <Col md={6}>
                                        <div className='box-right'>
                                                <h1 className='Rambla' >Sign up</h1>
                                        </div>
                                        </Col>
                                        <Col md={3}></Col>
                                </Row>
                                <Row>
                                        <div className='box-from'>
                                        <Form>
                                                <Row>
                                                        <Col md={2}>
                                                        </Col>
                                                        <Col md={8}>
                                                                <Row>
                                                                        <Col md={6}>
                                                                                <Form.Label><div  className='Rambla' >First name</div></Form.Label>
                                                                                {emtyFirstName?(<h6 className='noti-red' align="right" >FirstName is Emty</h6>):(<h7></h7>)}
                                                                                <Form.Control type="string" placeholder="Enter First name" value={inputFirstName}  onChange={(e)=>{setInputFirstName(e.target.value) }} />
                                                                        </Col>
                                                                        <Col md={6}>
                                                                                <Form.Label><div  className='Rambla' >Last name</div></Form.Label>
                                                                                {emtyLastName?(<h6 className='noti-red' align="right" >LastName is Emty</h6>):(<h7></h7>)}
                                                                                <Form.Control type="string" placeholder="Enter Last name" value={inputLastName}  onChange={(e)=>{setInputLastName(e.target.value) }}/>
                                                                        </Col>

                                                                </Row>
                                                                <br></br>
                                                                <Row>
                                                                        <Col md={12}>
                                                                        <Form.Label><div  className='Rambla' >Gender</div></Form.Label>
                                                                        {emtyGender?(<h6 className='noti-red' align="right" >select this</h6>):(<h7></h7>)}
                                                                        <Form.Select aria-label="Default select example" onChange={(e)=>{setInputGender(e.target.value)}}>   
                                                                        <option value="male">male</option>
                                                                        <option value="female">female</option>
                                                                        </Form.Select>
                                                                        </Col>
                                                                </Row>
                                                                <br></br>
                                                                <Row>
                                                                        <Col md={12}>
                                                                                <Form.Label><div  className='Rambla' >Email</div></Form.Label>
                                                                                {emtyEmail?(<h6 className='noti-red' align="right" >Email address is Emty</h6>):(<h7></h7>)}
                                                                                <Form.Control type="email" placeholder="Enter Email" value={inputEmail}  onChange={(e)=>{setInputEmail(e.target.value) }} />
                                                                                <Form.Text className="text-muted">
                                                                                        We'll never share your email with anyone else.
                                                                                </Form.Text>
                                                                        </Col>
                                                                        
                                                                </Row>
                                                                <br></br>
                                                                <Row>
                                                                        <Col md={12}>
                                                                                <Form.Label><div  className='Rambla' >Phone number</div></Form.Label>
                                                                                {emtyPhoneNumber?(<h6 className='noti-red' align="right" >Phone number is Emty</h6>):(<h7></h7>)}
                                                                                <Form.Control type="phonenumber" placeholder="Enter Phone number" value={inputPhoneNumber}  onChange={(e)=>{setInputPhoneNumber(e.target.value) }}/>
                                                                                <Form.Text className="text-muted">
                                                                                        We'll never share your Phone number with anyone else.
                                                                                </Form.Text>
                                                                        </Col>
                                                                        
                                                                </Row>
                                                                <br></br>
                                                                <Row>
                                                                        <Col md={12}>
                                                                                <Form.Label><div  className='Rambla' >Password</div></Form.Label>
                                                                                {emtyPassword?(<h6 className='noti-red' align="right" >Password is Emty</h6>):(<h7></h7>)}
                                                                                <Form.Control type="password" placeholder="Enter Password" value={inputPassword}  onChange={(e)=>{setInputPassword(e.target.value) }} />
                                                                        </Col>
                                                                        
                                                                </Row>
                                                                <br></br>
                                                                <Row>
                                                                        <Col md={12}>
                                                                                <Form.Label><div  className='Rambla' >Confirm Your Password</div></Form.Label>
                                                                                {emtyRePassword?(<h6 className='noti-red' align="right" >Confirm password is Emty</h6>):(<h7></h7>)}
                                                                                {notiComparePass?(<h6 className='noti-red' align="right" >Passwords do not match</h6>):(<h7></h7>)}
                                                                                <Form.Control type="password" placeholder="Enter Password" value={inputRePassword}  onChange={(e)=>{setInputRePassword(e.target.value) }}/>
                                                                        </Col>
                                                                        
                                                                </Row>
                                                                
                                                        
                                                        </Col>
                                                        <Col md={2}>
                                                        </Col>
                                                </Row>
                                                <br></br>
                                                
                                                <Row>
                                                        <Col md={7}>
                                                        </Col>
                                                        <Col md={5}>
                                                                {noti!==''?(<h6 className='noti-red' align="left" >{noti}</h6>):(<div></div>)}
                                                                <button class='button-login2' id='button-login1' type="button"> <div className='Rambla'onClick={() => {
                                                                        signUp()
                                                                }}> SIGN UP </div></button>
                                                        </Col>
                                                </Row>
                                                
                                        </Form>
                                        </div>
                                </Row>
                        </div>
                </Col>
        </Row>
        </div>  
    )
}

export default Signin
