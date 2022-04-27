import React from 'react'
import './ForgotPass.css';
import {Row,Col,Form} from 'react-bootstrap'
import img_bird from '../../Assets/img/Login/bird.png'
const ForgotPass = () => {
        const [inputEmail,setInputEmail] = React.useState("");
        const [emtyEmail,setEmtyEmail] = React.useState(false);


        
    function confirm(){
        if(inputEmail===""){
                setEmtyEmail(true)
        }
        else{
                setEmtyEmail(false)
        }
        if(inputEmail!==""){
                
                console.log("confirm")
        }
    }
  
    return (
        <div>
        <Row>
        <Col md={5}>
                                <div className='box-leftLogin'>
                                        <div className='img-left' align='center'>
                                               <img className='img-leftLogin' id='img-left1'  src={img_bird} alt="bird"  />
                                        </div>
                                </div>
                        </Col>
                <Col md={7}>
                        <div className='box-rightLogin'>
                                <div align='center'>
                                        <h1 >Forgot Password</h1>
                                </div>
                                <center>
                                        <Form style={{width: '70%'}}>
                                                <Form.Group controlId="formBasicEmail" align='left'>
                                                        <Form.Label>Email address</Form.Label>
                                                        <Form.Control type="email" placeholder="Enter email" value={inputEmail}  onChange={(e)=>{setInputEmail(e.target.value) }}  />
                                                </Form.Group>
                                        </Form>
                                </center>
                                <center>
                                        <button className='button-login' id='button-login1' type="button"> <div className='Rambla' onClick={() => {
                                                
                                        }} >Send</div></button>
                                </center>
                        </div>     
                </Col>
        </Row>
        </div>  
    )
}

export default ForgotPass
