import React from 'react'
import './available.css';
import {Row,Col,Button,Form} from 'react-bootstrap'
import Nav from '../../components/NavOwner/nav'
import Box from '../../components/BoxAvailRoom/box'
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';


const Available  = () => {
        const token = localStorage.getItem("token")
        const navigate = useNavigate();
        const dRoom = useLocation().state.dataRoom;
        const dApt = useLocation().state.dataApt;
        const [dataRoom,setDataRoom] = React.useState(dRoom);
        const [dataApt,setDataApt] = React.useState(dApt);
        
        const [edit,setEdit] = React.useState(false);
        const [add,setAdd] = React.useState(false);
        const [inputNum,setInputNum] = React.useState('');
        const [inputStatus,setInputStatus] = React.useState(true);
        
        const [actionDel,setActionDel] = React.useState(true);

        React.useEffect(()=>{
                fetchData()
        }, []);

        React.useEffect(()=>{
                fetchData()
        }, [actionDel]);
        
        function toManageRoom(){
                navigate('/ManageRooms',{state:{data:dataRoom,dataApt:dataApt}});
        }

       
        function fetchData(){
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/apmnt-id/${dataApt._id}`,
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                        setDataApt(res.data)
                        let result = null
                        result=res.data.rooms.filter((data)=>{
                                return data._id===dataRoom._id;
                        }) 
                        setDataRoom(result[0])
                        setInputStatus(true)
                        setAdd(false)
                });
                
        }


        function addRoom(){
                let tk = token.split(" ")[1]
                axios.post(`http://localhost:1000/api/room-insert`,{
                        roomId :dataRoom._id,
                        apartmentId :dataApt._id ,
                        roomDetail:inputNum+','+inputStatus
                },
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                       fetchData()
                });
        }

        

    return (
        <div>         
                <Nav setInputSearch={false} inputSearch={false} Search={false} ></Nav>
                <Row>
                       <div  align="center">
                                <Col md={6}>
                                        <div align='left'>
                                                <Button
                                                        variant='secondary'
                                                        onClick={()=>{
                                                                toManageRoom()
                                                        }}
                                                >Back</Button>
                                        </div>
                                        <div className='bordAvail'>
                                                <Row>
                                                        <Col>
                                                                <div className='title' align='left'>
                                                                        <h4>Room management</h4>
                                                                </div>
                                                        </Col>
                                                </Row>
                                                <div className='bordBox'>
                                                <Row >
                                                        <Col md={12}>
                                                                <div align='left'>
                                                                        {dataRoom.room.map((room) => (
                                                                                <Box edit={edit} num={room.roomNumber} avail={room.available} dataRoom={dataRoom} setActionDel={setActionDel} actionDel={actionDel} ></Box>
                                                                        ))}  
                                                                </div>
                                                        </Col>
                                                </Row>
                                                </div> 
                                                <div align='right'>
                                                {add?(
                                                        <div>
                                                                <Row>
                                                                        
                                                                        <Col md={5}>
                                                                                <div className='addFrom' align='left'>
                                                                                        
                                                                                        หมายเลขห้อง
                                                                                        <Form.Control type="string" placeholder="กรอกหมายเลขห้อง" value={inputNum}  onChange={(e)=>{setInputNum(e.target.value)}}/>
                                                                                        สถานะ
                                                                                        <Form.Select aria-label="Default select example" onChange={(e)=>{setInputStatus(e.target.value)}}>
                                                                                                <option value={true}>ว่าง</option>
                                                                                                <option value={false}>ไม่ว่าง</option>
                                                                                        </Form.Select>
                                                                                        
                                                                                </div>
                                                                        </Col>
                                                                        
                                                                        <Col>
                                                                                        <div align='right'>
                                                                                        <Button
                                                                                                variant='success'
                                                                                                onClick={()=>{
                                                                                                        addRoom()
                                                                                                }}
                                                                                        >ยืนยัน</Button> 
                                                                                        <Button
                                                                                                variant='danger'
                                                                                                onClick={()=>{
                                                                                                        setAdd(!add)
                                                                                                }}
                                                                                        >ยกเลิก</Button> 
                                                                                        </div>
                                                                        </Col>
                                                                        
                                                                        
                                                                </Row>
                                                                
                                                        </div>
                                                ):(
                                                        <div>
                                                                {edit?(
                                                                        <div>
                                                                                {/* <Button
                                                                                        variant='success'
                                                                                        onClick={()=>{
                                                                                                confirm()
                                                                                        }}
                                                                                >ยืนยัน</Button>  */}
                                                                                <Button
                                                                                        variant='success'
                                                                                        onClick={()=>{
                                                                                                setEdit(!edit)
                                                                                                fetchData()
                                                                                        }}
                                                                                >แก้ไขเสร็จแล้ว</Button> 
                                                                        </div>
                                                                ):(
                                                                        <div>
                                                                                <Button
                                                                                        variant='success'
                                                                                        onClick={()=>{
                                                                                                setAdd(!add)
                                                                                        }}
                                                                                >เพิ่มห้อง</Button> 
                                                                                <br></br>
                                                                                <br></br>
                                                                                <Button
                                                                                        variant='dark'
                                                                                        onClick={()=>{
                                                                                                setEdit(!edit)
                                                                                        }}
                                                                                >แก้ไขสถานะห้อง</Button> 
                                                                        </div>
                                                                
                                                                )}
                                                        </div>
                                                        )}
                                                </div>   
                                        </div>
                                </Col>
                       </div>
                </Row>  
        </div>
    )
}

export default Available
