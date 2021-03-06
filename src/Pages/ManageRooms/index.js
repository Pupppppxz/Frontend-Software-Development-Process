import React from 'react'
import './manageRoom.css';
import './checkBox.css';
import { Row, Col, Button, Container, Form } from 'react-bootstrap'
import Nav from '../../components/NavOwner/nav'
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ImgForm from '../../components/FormImgRoom/form'
import axios from 'axios';

const ManageRoom = () => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const dRoom = useLocation().state.data;
    const dApt = useLocation().state.dataApt;

    const [dataRoom, setDataRoom] = React.useState(dRoom);
    const [dataApt, setDataApt] = React.useState(dApt);

    const [numRoomAvail, setNumRoomAvail] = React.useState('');

    const [nameType, setNameType] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [area, setArea] = React.useState(0);
    const [cashPledge, setCashPledge] = React.useState(0);
    const [leaseAgreement, setLeaseAgreement] = React.useState(1);
    const [electicCost, setElecticCost] = React.useState(0);
    const [waterCost, setWaterCost] = React.useState(0);
    const [numOfRoomTotal, setNumOfRoomTotal] = React.useState(0);
    const [air, setAir] = React.useState(false);
    const [refrigerator, setRefrigerator] = React.useState(false);
    const [fan, setFan] = React.useState(false);
    const [television, setTelevision] = React.useState(false);
    const [waterHeater, setWaterHeater] = React.useState(false);
    const [washingMachine, setWashingMachine] = React.useState(false);
    const [cookingStove, setCookingStove] = React.useState(false);
    const [img, setImg] = React.useState([])
    const [noti, setNoti] = React.useState('')



    const [actionUpdateImg, setActionUpdateImg] = React.useState(false)


    const [dis, setDis] = React.useState(true);

    function setInputDefault() {
        setNameType(dataRoom.nameType)
        setPrice(dataRoom.price)
        setArea(dataRoom.area)
        setCashPledge(dataRoom.contract.cashPledge)
        setLeaseAgreement(dataRoom.contract.leaseAgreement)
        setElecticCost(dataRoom.electricCost)
        setWaterCost(dataRoom.waterCost)
        setNumOfRoomTotal(dataRoom.numOfRoomTotal)
        setAir(dataRoom.roomOption.air)
        setRefrigerator(dataRoom.roomOption.refrigerator)
        setFan(dataRoom.roomOption.fan)
        setTelevision(dataRoom.roomOption.television)
        setWaterHeater(dataRoom.roomOption.waterHeater)
        setWashingMachine(dataRoom.roomOption.washingMachine)
        setCookingStove(dataRoom.roomOption.cookingStove)
        setImg(dataRoom.img)
    }

    function toManageApt() {
        navigate('/ManageApt', { state: { data: dataApt } });
    }

    function toAvail() {
        navigate('/AvailableRoom', { state: { dataApt: dataApt, dataRoom: dataRoom } });
    }

    React.useEffect(() => {
        setInputDefault()
    }, [dataRoom]);

    React.useEffect(() => {
        getData()
    }, [actionUpdateImg]);


    function getData(){
        let tk = token.split(" ")[1]
        axios.get(`http://localhost:1000/api/apmnt-id/${dApt._id}`,
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            setDataApt(res.data)
            let result=[]
            result=res.data.rooms.filter((data)=>{
                return data._id===dataRoom._id
            })
            setDataRoom(result[0])
            let availRoom=[]
            availRoom=result[0].room.filter((r)=>{
                return r.available===true
            })
            setNumRoomAvail(availRoom.length)
        });
    }

    function deleteRoom(){
        let tk = token.split(" ")[1]
        axios.delete(`http://localhost:1000/api/room`,{       
                
                headers: {
                    'Authorization': 'Bearer ' + tk,   
                },
                data: {
                    roomId:dataRoom._id
                },
        },).then((res) => {
            console.log(res)
            toManageApt()
        })
    }

    function  UpdateRoomType(){
        if(nameType===''){
                setNoti("???????????????????????????????????????????????????????????????")
        }
        else if(nameType.length>50){
                setNoti("????????????????????????????????????????????????????????????????????? 50 ????????????????????????")
        }
        else if(area===''){
                setNoti("????????????????????????????????????????????????????????????")
        }
        else if (parseFloat(area)<parseFloat(0)){
                setNoti("?????????????????????????????????????????????????????????????????????????????? 0 ???????????????????????????")
        }
        else if (parseFloat(area)>parseFloat(999)){
                setNoti("?????????????????????????????????????????????????????????????????? 999 ???????????????????????????")
        }
        else if (parseFloat(area)!==parseFloat(parseFloat(area).toFixed(2))){
                setNoti("?????????????????????????????????????????????????????????????????????????????????????????? 2 ?????????????????????")
        }
        else if(price===''){
                setNoti("????????????????????????????????????????????????????????????")
        }
        else if (parseFloat(price)<parseFloat(0)){
                setNoti("?????????????????????????????????????????????????????????????????????????????? 0 ?????????")
        }
        else if (parseFloat(price)>parseFloat(50000)){
                setNoti("?????????????????????????????????????????????????????????????????? 50,000 ?????????")
        }
        else if (parseFloat(price)!==parseFloat(parseFloat(price).toFixed(2))){
                setNoti("?????????????????????????????????????????????????????????????????????????????????????????? 2 ?????????????????????")
        }
        else if(cashPledge===''){
                setNoti("??????????????????????????????????????????????????????")
        }
        else if (parseFloat(cashPledge)<parseFloat(0)){
                setNoti("???????????????????????????????????????????????????????????????????????? 0 ?????????")
        }
        else if (parseFloat(cashPledge)>parseFloat(50000)){
                setNoti("???????????????????????????????????????????????????????????? 50,000 ?????????")
        }
        else if (parseFloat(cashPledge)!==parseFloat(parseFloat(cashPledge).toFixed(2))){
                setNoti("???????????????????????????????????????????????????????????????????????????????????? 2 ?????????????????????")
        }
        else if(leaseAgreement===''){
                setNoti("??????????????????????????????????????????????????????????????????")
        }
        else if (parseFloat(leaseAgreement)<parseFloat(1)){
                setNoti("???????????????????????????????????????????????????????????????????????????????????? 1 ??????")
        }
        else if (parseFloat(leaseAgreement)>parseFloat(99)){
                setNoti("???????????????????????????????????????????????????????????????????????? 99 ??????")
        }
        else if (parseFloat(leaseAgreement)!==parseFloat(parseFloat(leaseAgreement).toFixed(0))){
                setNoti("??????????????????????????????????????????????????????????????????????????????????????????????????????????????????")
        }
        else if(electicCost===''){
                setNoti("???????????????????????????????????????????????????")
        }
        else if (parseFloat(electicCost)<parseFloat(0)){
                setNoti("????????????????????????????????????????????????????????? 0 ?????????/???????????????")
        }
        else if (parseFloat(electicCost)>parseFloat(999)){
                setNoti("????????????????????????????????????????????????????????? 999 ?????????/???????????????")
        }
        else if (parseFloat(electicCost)!==parseFloat(parseFloat(electicCost).toFixed(2))){
                setNoti("????????????????????????????????????????????????????????????????????????????????? 2 ?????????????????????")
        }
        else if(waterCost===''){
                setNoti("?????????????????????????????????????????????")
        }
        else if (parseFloat(waterCost)<parseFloat(0)){
                setNoti("??????????????????????????????????????????????????? 0 ?????????/???????????????")
        }
        else if (parseFloat(waterCost)>parseFloat(999)){
                setNoti("??????????????????????????????????????????????????? 999 ?????????/???????????????")
        }
        else if (parseFloat(waterCost)!==parseFloat(parseFloat(waterCost).toFixed(2))){
                setNoti("??????????????????????????????????????????????????????????????????????????? 2 ?????????????????????")
        }
        else{
            let tk = token.split(" ")[1]
            axios.put(`http://localhost:1000/api/room`,{
                roomId: dataRoom._id,
                nameType : nameType,
                area:area,
                price:price,
                waterCost:waterCost,
                electricCost:electicCost,
                contract:{
                    "leaseAgreement": leaseAgreement,
                    "cashPledge":cashPledge
                },
                roomOption:{
                    "air":air,
                    "refrigerator":refrigerator,
                    "fan":fan,
                    "television":television,
                    "waterHeater":waterHeater,
                    "washingMachine":washingMachine,
                    "cookingStove": cookingStove
                },
                    
            },    
            {       
                headers: {
                    'Authorization': 'Bearer ' + tk,   
                },
            }).then((res) => {
                console.log(res)
                setDis(!dis)
            })
            .catch((e) => {
                    console.log(e.response.data.message);
                    setNoti(e.response.data.message)
            });;
        }
    }

    React.useEffect(() => {
        getData()
    }, []);



    return (
        <div>
            <Nav setInputSearch={false}
                inputSearch={false}
                Search={false} > 
            </Nav>
            <Container>
                <Row>
                    <div align="center" >
                        <Col xs={12}
                            md={12}
                            sm={12} >
                            <div align='left' >
                                <Button variant='secondary'
                                    onClick={
                                        () => {
                                            toManageApt()
                                        }
                                    } >
                                    Back </Button>       </div>
                            <div align="left" className='bordManageRoom' >
                                <div className='title' >
                                    <h4>Room info</h4> </div>
                                <Row>
                                    <Col md={8} >
                                        <div className='detailBordRoomInfo' >
                                            <Row >
                                                <Col md={5} >
                                                    <Form.Label > <div className='Rambla' > ???????????????????????????????????? </div></Form.Label >
                                                    <Form.Control type="text"
                                                        placeholder="Enter name"
                                                        onChange={
                                                            (e) => {
                                                                setNameType(e.target.value)
                                                            }
                                                        }
                                                        value={nameType}
                                                        disabled={dis}
                                                    /> 
                                                </Col>
                                                <Col md={3} >
                                                    <Form.Label > <div className='Rambla' > ?????????????????????(???????????????????????????) </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder=""
                                                        onChange={
                                                            (e) => {
                                                                setArea(e.target.value)
                                                            }
                                                        }
                                                        value={area}
                                                        disabled={dis}
                                                    />
                                                </Col>
                                            </Row> <br></br>
                                            <Row >
                                                <Col md={3} >
                                                    <Form.Label > <div className='Rambla' > ????????????????????????(?????????) </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder="Enter name"
                                                        onChange={
                                                            (e) => {
                                                                setPrice(e.target.value)
                                                            }
                                                        }
                                                        value={price}
                                                        disabled={dis}
                                                    />
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col md={3} >
                                                    <Form.Label > <div className='Rambla' > ???????????????????????????(?????????) </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder="???????????????????????????????????????????????????????????????????????????????????????"
                                                        onChange={
                                                            (e) => {
                                                                setCashPledge(e.target.value)
                                                            }
                                                        }
                                                        value={cashPledge}
                                                        disabled={dis}
                                                    /> </Col>
                                                <Col md={3} >
                                                    <Form.Label > <div className='Rambla' > ???????????????????????????????????????(??????) </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder=""
                                                        onChange={
                                                            (e) => {
                                                                setLeaseAgreement(e.target.value)
                                                            }
                                                        }
                                                        value={leaseAgreement}
                                                        disabled={dis}
                                                    /> </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col md={3} >
                                                    <Form.Label > <div className='Rambla' > ?????????????????????????????????????????????????????? </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder=""
                                                        onChange={
                                                            (e) => {
                                                                setNumOfRoomTotal(e.target.value)
                                                            }
                                                        }
                                                        value={numOfRoomTotal}
                                                        disabled={true}
                                                    />
                                                </Col>
                                                <Col md={3} >
                                                    <Form.Label > <div className='Rambla' > ???????????????????????????????????????????????? </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder=""
                                                        onChange={
                                                            (e) => {
                                                                setNumRoomAvail(e.target.value)
                                                            }
                                                        }
                                                        value={numRoomAvail}
                                                        disabled={true}
                                                    />
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <Row>
                                                <Col md={3} >
                                                    <Form.Label> <div className='Rambla'> ????????????????????????(?????????/???????????????) </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder="????????????????????????????????????????????????????????????????????????"
                                                        onChange={(e) => {
                                                            setElecticCost(e.target.value)
                                                        }
                                                        }
                                                        value={electicCost}
                                                        disabled={dis}
                                                    />
                                                </Col>
                                                <Col md={3}>
                                                    <Form.Label > < div className='Rambla' > ??????????????????(?????????/???????????????) </div></Form.Label >
                                                    <Form.Control type="number"
                                                        placeholder="?????????????????????????????????????????????????????????????????????"
                                                        onChange={
                                                            (e) => {
                                                                setWaterCost(e.target.value)
                                                            }
                                                        }
                                                        value={waterCost}
                                                        disabled={dis}
                                                    />
                                                </Col>
                                            </Row>
                                            <br></br>
                                            <h5> ?????????????????????????????????????????????????????? </h5>
                                            <Row>
                                                <Col>
                                                    <div className="page__toggle">
                                                        <label className="toggle" >
                                                            <input className="toggle__input"
                                                                type="checkbox"
                                                                checked={air}
                                                                onClick={() => {
                                                                    setAir(!air)
                                                                }}
                                                                disabled={dis} >
                                                            </input>
                                                            <span className="toggle__label">
                                                                <span className="toggle__text" > ?????????????????????????????????????????????????????? </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="page__toggle">
                                                        <label className="toggle" >
                                                            <input className="toggle__input"
                                                                type="checkbox"
                                                                checked={fan}
                                                                onClick={
                                                                    (e) => { setFan(!fan) }}
                                                                disabled={dis}>
                                                            </input>
                                                            <span className="toggle__label">
                                                                <span className="toggle__text" > ????????????????????? </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="page__toggle">
                                                        <label className="toggle" >
                                                            <input className="toggle__input"
                                                                type="checkbox"
                                                                checked={refrigerator}
                                                                onClick={
                                                                    (e) => { setRefrigerator(!refrigerator) }}
                                                                disabled={dis} >
                                                            </input>
                                                            <span className="toggle__label" >
                                                                <span className="toggle__text" > ??????????????????????????? </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="page__toggle">
                                                        <label className="toggle">
                                                            <input className="toggle__input"
                                                                type="checkbox"
                                                                checked={waterHeater}
                                                                onClick={
                                                                    (e) => { setWaterHeater(!waterHeater) }}
                                                                disabled={dis}
                                                            >
                                                            </input>
                                                            <span className="toggle__label">
                                                                <span className="toggle__text" > ?????????????????????????????????????????????????????? </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="page__toggle" >
                                                        <label className="toggle" >
                                                            <input className="toggle__input"
                                                                type="checkbox"
                                                                checked={washingMachine}
                                                                onClick={
                                                                    (e) => { setWashingMachine(!washingMachine) }}
                                                                disabled={dis}
                                                            >
                                                            </input>
                                                            <span className="toggle__label" >
                                                                <span className="toggle__text" > ????????????????????????????????????????????? </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                    <div className="page__toggle" >
                                                        <label className="toggle" >
                                                            <input className="toggle__input"
                                                                type="checkbox"
                                                                checked={cookingStove}
                                                                onClick={
                                                                    (e) => { setCookingStove(!cookingStove) }}
                                                                disabled={dis}>
                                                            </input>
                                                            <span className="toggle__label">
                                                                <span className="toggle__text" > ???????????????????????????????????? </span>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <br></br>
                                        <div align='right'>
                                            {dis ? (
                                                <div>
                                                    <Button variant="danger"
                                                        onClick={() => {
                                                            deleteRoom()
                                                        }}
                                                    > ?????????????????????????????? </Button>
                                                    <Button variant="dark"
                                                        onClick={() => {
                                                            setDis(false)
                                                        }}
                                                    > ????????????????????????????????? </Button>
                                                    <br></br>
                                                    <br></br>
                                                    <Button variant="dark"
                                                        onClick={() => {
                                                            toAvail()
                                                        }}
                                                    > ?????????????????????????????????????????? </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    {noti!==''?(<h6 className='noti-red' align="left" >{noti}</h6>):(<div></div>)}
                                                    <Button variant="success"
                                                        onClick={() => {
                                                            UpdateRoomType()
                                                        }}
                                                    > ?????????????????? </Button>
                                                    <Button variant="danger"
                                                        onClick={() => {
                                                            setDis(true)
                                                            setInputDefault()
                                                        }}
                                                    > ?????????????????? </Button>
                                                </div>
                                            )
                                            }
                                            <br></br>
                                            <br></br>
                                        </div>
                                    </Col>
                                    <Col md={4} >
                                        <div className='boxImgaeRoomManage' > 
                                            {dataRoom.img.map((task) => (
                                                <div>
                                                    <div align='center' >
                                                        <img id='img'
                                                            className='imgRoomManage'
                                                            src={`http://localhost:1000/${task.src}`}
                                                            alt="imgApt" />
                                                    </div>
                                                    <ImgForm dataRoom={dataRoom} src={task.src} setActionUpdateImg={setActionUpdateImg} actionUpdateImg={actionUpdateImg} ></ImgForm>                                                    
                                                    <br></br>
                                                    <br></br>
                                                </div>
                                            ))}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    )
}
export default ManageRoom