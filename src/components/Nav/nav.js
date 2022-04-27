import './nav.css';
import React from "react";
import {Row,Col,Form,Nav,FormControl,Dropdown,Navbar,NavDropdown,Container} from 'react-bootstrap'
import img_book from '../../Assets/img/DisplayApt/book.png'
import img_noti from '../../Assets/img/DisplayApt/noti.png'
import img_noti2 from '../../Assets/img/DisplayApt/noti2.png'
import img_user from '../../Assets/img/DisplayApt/user.png'
import {useNavigate} from 'react-router-dom';

import {trans} from './dataTrans.js'

const NavBar = (props)=>{
    const role = localStorage.getItem("role")
    const navigate = useNavigate();
    const [notiAlert,setNotiAlert]=React.useState(false);
    const dataUser = localStorage.getItem("dataUser")

    function logOut(){
        localStorage.clear()
        navigate('/');
    }

    function getData(){
        //get Data 
        let result =[]
        result=trans.filter((data)=>{
            return data.statusReadCustomer===false&&data.statusCustomerDel===false;
        })
        if(result.length>0){
            setNotiAlert(true)
        }
    }
    function toOwnerMain(){
        navigate('/OwnerMain');
    }

    function validate(){
        // if(dataUser.role!=="customer"||dataUser.token===null){
        //     logOut()
        // }
    }

    React.useEffect(()=>{
        getData()
        if(role!=="customer"){
            console.log(role)
            if(role==="owner"){
                toOwnerMain()
            }
            else if(role=="admin"){
                navigate('/Admin');
            }
        }
    }, []);
    
    return(
        <div className='NavBar'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Nav>
                        <div align='left'>
                            <Navbar.Brand href="/displayApt">Yuhor</Navbar.Brand>\
                        </div>
                    </Nav>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="เมนู" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/displayApt">ค้นหาหอพัก</NavDropdown.Item>
                                <NavDropdown.Item href="/OwnerSignUp">สมัครเป็นผู้ดูแลหอพัก</NavDropdown.Item>
                                <NavDropdown.Divider />
                                {/* <NavDropdown.Item href="#action/3.4">รายละเอียดเกี่ยวกับ Yuhor</NavDropdown.Item> */}
                            </NavDropdown>
                        </Nav>
                        
                            {props.Search ? (
                                <div className='search'  >
                                    <Form className="d-flex">
                                        <FormControl
                                            type="search"
                                            placeholder="Name"
                                            className="me-2"
                                            aria-label="Search"
                                            value={props.inputSearch}
                                            onChange={(e) => {
                                                props.setInputSearch(e.target.value)
                                            }}
                                        />
                                    </Form>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        
                        <Nav> 
                            <Nav.Link href="/Agenda"><img className='icon-Nav' src={img_book} alt="book-Nav"/></Nav.Link>
                            <Nav.Link href="/Noti">{notiAlert?(<img className='icon-Nav'  src={img_noti2} alt="noti" />):(<img className='icon-Nav'  src={img_noti} alt="noti" />)}</Nav.Link>
                            <NavDropdown title={<img className='icon-Nav' src={img_user} alt="user" />} id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/UserInfo">ข้อมูลผู้ใช้</NavDropdown.Item>
                                <NavDropdown.Item href="/OwnerSignUp">สมัครเป็นผู้ดูแลหอพัก</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={()=>{
                                    logOut()
                                }}>log out</NavDropdown.Item>
                            </NavDropdown>
                            
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
                   
    )
}
export default NavBar;