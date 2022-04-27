import React from 'react'
import './displayApt.css';
import './checkBox.css';
import {Row,Col,Form,FormControl,Container} from 'react-bootstrap'
import BoxScroll from '../../components/Display/BoxScroll.js'
import Nav from '../../components/Nav/nav'
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
// import {reviewArr} from './dataReview'
import axios from 'axios';


const DisplayApt = () => {
        const { innerWidth } = window
        console.log("inner width = " + innerWidth)

        const [dataApt,setDataApt] = React.useState([]);
        const [reviewArr,setReviewArr] = React.useState([]);
        const navigate = useNavigate();
        const token = localStorage.getItem("token")
        const lastState = useLocation().state
        
        const toDetail=(data)=>{
                let stateFilter={
                        rentalFeeFil:rentalFeeFil,
                        dorTypeFil:dorTypeFil,
                        valAir:valAir,
                        valRefrigeratorr:valRefrigeratorr,
                        valFan:valFan,
                        valTelevison:valTelevison,
                        valWaterHeater:valWaterHeater,
                        valInternet:valInternet,
                        valCCTV:valCCTV,
                        valKeycard:valKeycard,
                        valLaundry:valLaundry,
                        valCarPark:valCarPark,
                        inputSearch:inputSearch,
                        sortFil:sortFil
                }
                navigate('/DetailApt',{state:{his:stateFilter,apt:data}});
        }
        const [remodel,setRemodel]=React.useState([]);
        const [Apt,setApt]=React.useState([]);
        const [afterRentalFeeFil,setAfterRentalFeeFil]=React.useState([]);

        const [afterAlley,setAfterAlley]=React.useState([]);
        
        const [afterdorType,setAfterdorType]=React.useState([]);
        const [afterFacIn,setAfterFacIn]=React.useState([]);
        const [afterFacOut,setAfterFacOut]=React.useState([]);
        const [resultApt,setResultApt]=React.useState([]);

        const [actionSort,setActionSort]=React.useState('0');

        const [sortFil,setSortFil]=React.useState('0');
        
        const [rentalFeeFil,setRentalFeeFil]=React.useState('0');

        const [dorTypeFil,setDorTypeFil]=React.useState('0');

        const [alley,setAllley]=React.useState('0');


        // Facinside
        const [valAir,setValAir]=React.useState(false)
        const [valRefrigeratorr,setValRefrigerator]=React.useState(false)
        const [valFan,setValFan]=React.useState(false)
        const [valTelevison,setValTelevison]=React.useState(false)
        const [valWaterHeater,setValWaterHeater]=React.useState(false)

        // FacOutside
        const [valInternet,setValInternet]=React.useState(false)
        const [valCCTV,setValCCTV]=React.useState(false)
        const [valKeycard,setValKeycard]=React.useState(false)
        const [valLaundry,setValLaundry]=React.useState(false)
        const [valCarPark,setValCarPark]=React.useState(false)

        //search
        const [inputSearch,setInputSearch]=React.useState("")


        function getReview(){
                let tk = token.split(" ")[1]
                axios.get(`http://localhost:1000/api/review-all`,
                {       
                        headers: {
                                'Authorization': 'Bearer ' + tk,   
                        },
                }).then((res) => {
                        setReviewArr(res.data)
                });
        }

        function setUpFilter(){
        
                if(lastState===null){
                        console.log("is null")
                }
                else{
                        let val = lastState.stateDisplayApt
                        setRentalFeeFil(val.rentalFeeFil)
                        setDorTypeFil(val.dorTypeFil)
                        setValAir(val.valAir)
                        setValRefrigerator(val.valRefrigeratorr)
                        setValFan(val.valFan)
                        setValTelevison(val.valTelevison)
                        setValWaterHeater(val.valWaterHeater)
                        setValInternet(val.valInternet)
                        setValCCTV(val.valCCTV)
                        setValKeycard(val.valKeycard)
                        setValLaundry(val.valLaundry)
                        setValCarPark(val.valCarPark)
                        setSortFil(val.sortFil)
                        setInputSearch(val.inputSearch)
                }
        }

        function search(){
                let store = afterFacOut
                let result = []
                if(inputSearch.length<1){
                        result=store
                }
                else{
                        result=store.filter((data)=>{
                                return data.name.toLowerCase().includes(inputSearch.toLowerCase())
                        })
                }
                setResultApt(result)
                
        }

        function fil_FacIn(){
                let store = afterdorType
                let result = []
                if(!valAir&&!valRefrigeratorr&&!valFan&&!valTelevison&&!valWaterHeater){
                        result=store.filter((data)=>{
                                return data.rentalFreeMin>=0;
                        })       
                }
                if(valAir){
                        result=store.filter((data)=>{
                                let subResult=[]
                               
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.roomOption.air===true;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                        store=result
                }
                if(valRefrigeratorr){
                        result=store.filter((data)=>{
                                let subResult=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.roomOption.refrigerator===true;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                        store=result
                }
                if(valFan){
                        result=store.filter((data)=>{
                                let subResult=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.roomOption.fan===true;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                        store=result
                }
                if(valTelevison){
                        result=store.filter((data)=>{
                                let subResult=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.roomOption.cookingStove===true;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                        store=result
                }
                if(valWaterHeater){
                        result=store.filter((data)=>{
                                let subResult=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.roomOption.waterHeater===true;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                }
                setAfterFacIn(result)
        }

        
        function fil_FacOut(){
                
                let store = afterFacIn
                let result = []
                if(!valInternet&&!valCCTV&&!valKeycard&&!valLaundry&&!valCarPark){
                        result=store.filter((data)=>{
                                return data.rentalFreeMin>=0;
                        })       
                }
                if(valInternet){
                        result=store.filter((data)=>{
                                return data.internet===true;
                        })
                        store=result
                }
                if(valCCTV){
                        result=store.filter((data)=>{
                                return data.cctv===true;
                        })
                        store=result
                }
                if(valKeycard){
                        result=store.filter((data)=>{
                                return data.keyCard===true;
                        })
                        store=result
                }
                if(valLaundry){
                        result=store.filter((data)=>{
                                return data.laundry===true;
                        })
                        store=result
                }
                if(valCarPark){
                        result=store.filter((data)=>{
                                return data.carPark===true;
                        })
                }
                setAfterFacOut(result)
        }

        function fil_rentalFee(){
                let result = [];
                if(rentalFeeFil==='0'){
                        result=Apt.filter((data)=>{
                                let subResult=[]
                                subResult=data.rooms.filter((subData)=>{                                        
                                        return subData.price>=0;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                        setAfterRentalFeeFil(result)
                }
                else if(rentalFeeFil==='1'){
                        result=Apt.filter((data)=>{
                                let subResult=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.price<2000;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                        setAfterRentalFeeFil(result)      
                }
                else if(rentalFeeFil==='2'){
                        
                        result=Apt.filter((data)=>{
                                let subResult=[]
                                let subResult2=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.price>2000;
                                })
                                subResult2=subResult.filter((subData)=>{
                                        return subData.price<=4000;
                                })
                                if(subResult2.length>0){
                                        return data;
                                } 
                        })
                        setAfterRentalFeeFil(result)
                }
                else if(rentalFeeFil==='3'){
                        result=Apt.filter((data)=>{
                                let subResult=[]
                                let subResult2=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.price>4000;
                                })
                                subResult2=subResult.filter((subData)=>{
                                        return subData.price<=6000;
                                })
                                if(subResult2.length>0){
                                        return data;
                                } 
                        })
                        setAfterRentalFeeFil(result)
                }
                else if(rentalFeeFil==='4'){
                        result=Apt.filter((data)=>{
                                let subResult=[]
                                subResult=data.rooms.filter((subData)=>{
                                        return subData.price>6000;
                                })
                                if(subResult.length>0){
                                        return data;
                                }
                        })
                        setAfterRentalFeeFil(result)    
                }

        }

        function fil_alley(){           
                let result = [];
                if(alley==='1'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="เกกีงาม 1";
                        })
                        setAfterAlley(result)
                }
                else if(alley==='2'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="เกกีงาม 2";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='3'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="เกกีงาม 3";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='4'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="เวิร์คพอยด์";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='5'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="หอใหม่";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='6'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="RNP PLACE";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='7'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="ENJOY";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='8'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="บ้านกลางสวน";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='9'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="AJ Park";
                        })
                        setAfterAlley(result)      
                }
                else if(alley==='10'){
                        result=afterRentalFeeFil.filter((d)=>{
                                return d.alley==="FBT";
                        })
                        setAfterAlley(result)      
                }
                else{
                        setAfterAlley(afterRentalFeeFil)
                }
        }

        function fil_dorType(){

                let result = [];
                if(dorTypeFil==='1'){
                        result=afterAlley.filter((d)=>{
                                return d.domitoryType==="male";
                        })
                        setAfterdorType(result)
                }
                else if(dorTypeFil==='2'){
                        result=afterAlley.filter((d)=>{
                                return d.domitoryType==="female";
                        })
                        setAfterdorType(result)      
                }
                else{
                        setAfterdorType(afterAlley)
                }
        }
        function set_facOutFil(label){
                if(label==="internet & wifi"){
                        if(valInternet===true){
                                setValInternet(false)
                        }
                        else{
                                setValInternet(true)
                        }
                }
                if(label==="CCTV"){
                        if(valCCTV===true){
                                setValCCTV(false)
                        }
                        else{
                                setValCCTV(true)
                        }
                }
                if(label==="Key card"){
                        if(valKeycard===true){
                                setValKeycard(false)
                        }
                        else{
                                setValKeycard(true)
                        }
                }
                if(label==="Laundry"){
                        if(valLaundry===true){
                                setValLaundry(false)
                        }
                        else{
                                setValLaundry(true)
                        }
                }
                if(label==="Car park"){
                        if(valCarPark===true){
                                setValCarPark(false)
                        }
                        else{
                                setValCarPark(true)
                        }
                }
                

        }

        function set_facInFil(label){
                // ['Air conditioner', 'Refrigerator','Fan','Televison','Water heater' ]
                if(label==="Air conditioner"){
                        if(valAir===true){
                                setValAir(false)
                        }
                        else{
                                setValAir(true)
                        }
                }
                else if(label==="Refrigerator"){
                        if(valRefrigeratorr===true){
                                setValRefrigerator(false)
                        }
                        else{
                                setValRefrigerator(true)
                        }
                }
                else if(label==="Fan"){
                        if(valFan===true){
                                setValFan(false)
                        }
                        else{
                                setValFan(true)
                        }
                }
                else if(label==="Televison"){
                        if(valTelevison===true){
                                setValTelevison(false)
                        }
                        else{
                                setValTelevison(true)
                        }
                }
                else if(label==="Water heater"){
                        if(valWaterHeater===true){
                                setValWaterHeater(false)
                        }
                        else{
                                setValWaterHeater(true)
                        }
                }
        }
        function reModelData(){
                let arrData=[]
                let result = [] 
                result=dataApt.filter((data)=>{
                        let dataFil ={
                                id:0,
                                ownerId:0,
                                name: "",
                                rentalFreeMin: 0,
                                rentalFreeMax:0,
                                locationX: "",
                                locationY:"",
                                domitoryType:"",
                                internet:false,
                                cctv:false,
                                keyCard:false,
                                coinWashingMachine:false,
                                laundry:false,
                                carPark:false,
                                contact:"",
                                imgAptSrc:"",
                                rooms: [],
                                numberOfRoom: 0,
                                available: 0,
                                alley:"",
                                createdAt: "",
                                updatedAt:"",

                                score:0,
                        }
                        let subResult=[]
                        let sum = 0
                        dataFil.id=data._id
                        dataFil.ownerId=data.ownerId
                        dataFil.name=data.name
                        dataFil.rentalFreeMin=data.rentalFeeMin
                        dataFil.rentalFreeMax=data.rentalFeeMax
                        dataFil.locationX=data.locationX   
                        dataFil.locationY=data.locationY   
                        dataFil.domitoryType=data.dormitoryType
                        dataFil.internet=data.option.internet
                        dataFil.cctv=data.option.cctv
                        dataFil.keyCard=data.option.keyCard
                        dataFil.coinWashingMachine=data.option.coinWashingMachine
                        dataFil.laundry=data.option.laundry
                        dataFil.carPark=data.option.carPark
                        dataFil.contact=data.contact
                        dataFil.imgAptSrc=data.imgAptSrc
                        dataFil.rooms=data.rooms
                        dataFil.numberOfRoom=data.numberOfRoom
                        dataFil.available=data.available
                        dataFil.alley=data.alley
                        dataFil.createdAt=data.createdAt
                        dataFil.updatedAt=data.updatedAt

                        subResult=reviewArr.filter((subData)=>{
                                return subData.apartmentId===data._id
                        })
                        sum = subResult.reduce(function (sum, review) {
                                return sum + review.score;
                        }, 0);
                        if(sum<=0){
                                dataFil.score=0
                        }
                        else{
                                dataFil.score=(sum/subResult.length)
                        }
                        dataFil.score=dataFil.score.toFixed(2);
                        arrData = [...arrData, dataFil]
                        return dataFil;
                }) 
                setRemodel(arrData)
        }


        function changeValueActionSort(){
                if(actionSort){
                        setActionSort(false)
                }
                else{
                        setActionSort(true)
                }
        }
        
        
        function sortData(){
        
                let data=remodel
                if(sortFil==="0"){
                        sortName('name', true);
                }
                else if(sortFil==="1"){
                        sortNameinvert('name', true);
                }
                else if(sortFil==="2"){
                        data.sort((a, b) => a.rentalFreeMin - b.rentalFreeMin);
                        setApt(data)

                }
                else if(sortFil==="3"){
                        data.sort((a, b) => b.rentalFreeMax - a.rentalFreeMax);
                        setApt(data)
                }
                else if(sortFil==="4"){
                        data.sort((a, b) => a.score - b.score);
                        setApt(data)
                }
                else if(sortFil==="5"){
                        data.sort((a, b) => b.score - a.score);
                        setApt(data)
                }

        }

        function sortNameinvert(prop, asc) {
                let data=remodel
                data.sort(function(a, b) {
                    if (asc) {
                        return (a[prop] > b[prop]) ? -1 : ((a[prop] < b[prop]) ? 1 : 0);
                    } else {
                        return (b[prop] > a[prop]) ? -1 : ((b[prop] < a[prop]) ? 1 : 0);
                    }
                });  
                setApt(data)
        }
        function sortName(prop, asc) {
                let data=remodel
                data.sort(function(a, b) {
                    if (asc) {
                        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                    } else {
                        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                    }
                });  
                setApt(data)
        }

        function fetchTask(){
                getData();
        }


        function getData(){ 
                let tk=token.split(" ")[1]
                axios.get(`http://localhost:1000/api/apmnt-all`,{
                        headers: {
                                'Authorization': 'Bearer ' + tk
                        }
                })
                .then((res)=>{
                        setDataApt(res.data)
                });
                
        }

        React.useEffect(()=>{
                if(dataApt!==[]){
                        reModelData()
                        getReview()
                }
        }, [dataApt]);

        React.useEffect(()=>{
                sortData()
        }, [remodel]);

        React.useEffect(()=>{
                sortData()
                changeValueActionSort()
        }, [sortFil]);

        React.useEffect(()=>{
                fil_rentalFee(); 
        }, [actionSort]);

        React.useEffect(()=>{
                fetchTask(); 
                setUpFilter();
        }, []);

        React.useEffect(()=>{
                search()
        }, [inputSearch]);

        React.useEffect(()=>{
                fil_alley()
        },[alley])


        React.useEffect(()=>{
                fil_rentalFee(); 
        }, [Apt]);

        // -------------------------------
        React.useEffect(()=>{
                fil_FacIn();               
        }, [valAir]);
        React.useEffect(()=>{
                fil_FacIn();                
        }, [valRefrigeratorr]);
        React.useEffect(()=>{
                fil_FacIn();                   
        }, [valFan]);
        React.useEffect(()=>{
                fil_FacIn();                
        }, [valTelevison]);
        React.useEffect(()=>{
                fil_FacIn();                 
        }, [valWaterHeater]);



        React.useEffect(()=>{
                fil_FacOut();     
        }, [valInternet]);
        React.useEffect(()=>{
                fil_FacOut();               
        }, [valCCTV]);
        React.useEffect(()=>{
                fil_FacOut();               
        }, [valKeycard]);
        React.useEffect(()=>{
                fil_FacOut();               
        }, [valLaundry]);
        React.useEffect(()=>{
                fil_FacOut();    
        }, [valCarPark]);



        React.useEffect(()=>{
                fil_rentalFee();               
        }, [rentalFeeFil]);

        React.useEffect(()=>{
                fil_dorType();           
        }, [dorTypeFil]);

        // -------------------------------
        React.useEffect(()=>{
                fil_dorType();
        }, [afterAlley] );

        React.useEffect(()=>{
                fil_alley()
        }, [afterRentalFeeFil] );

        React.useEffect(()=>{
                fil_FacIn();
        }, [afterdorType] );

        React.useEffect(()=>{
                fil_FacOut()
        }, [afterFacIn] );

        React.useEffect(()=>{
                search()
        }, [afterFacOut] );

        

        

  
    return (
        <div>
                <Nav setInputSearch={setInputSearch} inputSearch={inputSearch} Search={true} ></Nav>
                <div className='grid-center'>
                        <div className='display-grid-main'>
                                <div className='filter-box' >
                                        <div className='filter-head'>
                                                <h4 className='title-filter' >Search filter</h4>
                                        </div>
                                        <div className='filter-bottom'>
                                                <h5>การจัดเรียง</h5>
                                                <div className='select' >
                                                        <Form.Select aria-label="Default select example" value={sortFil} onChange={(e)=>{setSortFil(e.target.value)}}>
                                                                <option value={'0'}>ชื่อ a-z  </option>
                                                                <option value={'1'}>ชื่อ z-a  </option>
                                                                <option value={'2'}>ราคา น้อย-มาก</option>
                                                                <option value={'3'}>ราคา มาก-น้อย</option>
                                                                <option value={'4'}>คะแนน น้อย-มาก</option>
                                                                <option value={'5'}>คะแนน มาก-น้อย</option>
                                                        </Form.Select>
                                                </div>          
                                                <h5>ราคา</h5>
                                                <div className='select' >
                                                        <Form.Select aria-label="Default select example" value={rentalFeeFil} onChange={(e)=>{setRentalFeeFil(e.target.value)}}>
                                                                <option value={0}>ทั้งหมด</option>
                                                                <option value={1}>น้อยกว่า 2,000 บาท</option>
                                                                <option value={2}>2,001-4,000 บาท</option>
                                                                <option value={3}>4,001-6,000 บาท</option>
                                                                <option value={4}>มากกว่า 6,000 บาท</option>
                                                        </Form.Select>
                                                </div>  
                                                <h5>ซอย</h5>
                                                <div className='select' >
                                                        <Form.Select aria-label="Default select example" value={alley} onChange={(e)=>{setAllley(e.target.value)}}>
                                                                <option value={0}>ทุกซอย</option>
                                                                <option value={1}>เกกีงาม 1</option>
                                                                <option value={2}>เกกีงาม 2</option>
                                                                <option value={3}>เกกีงาม 3</option>
                                                                <option value={4}>เวิร์คพอยด์</option>
                                                                <option value={5}>หอใหม่</option>
                                                                <option value={6}>RNP PLACE</option>
                                                                <option value={7}>ENJOY</option>
                                                                <option value={8}>บ้านกลางสวน</option>   
                                                                <option value={9}>AJ Park</option>  
                                                                <option value={10}>FBT</option>                                            
                                                        </Form.Select>
                                                </div>                             
                                                <h5>ชนิดหอพัก</h5>
                                                <div className='select' >
                                                        <Form.Select aria-label="Default select example" value={dorTypeFil} onChange={(e)=>{setDorTypeFil(e.target.value)}}>
                                                                <option value={'0'}>ทั้งหมด</option>
                                                                <option value={'1'}>ชาย</option>
                                                                <option value={'2'}>หญิง</option>
                                                        </Form.Select>
                                                </div> 

                                                <h5>สิ่งอำนวยความสะดวก(ในห้อง)</h5>
                                                                {/* ['Air conditioner', 'Refrigerator','Fan','Televison','Water heater' ] */}
                                                        <div className="page__toggle">
                                                                <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valAir}  onClick={()=>{set_facInFil("Air conditioner")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">เครื่องปรับอากาศ</span>
                                                                </span>
                                                                </label>
                                                        </div>  
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valRefrigeratorr}  onClick={()=>{set_facInFil("Refrigerator")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">ตู้เย็น</span>
                                                                </span>
                                                        </label>
                                                </div> 
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valFan}  onClick={()=>{set_facInFil("Fan")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">พัดลม</span>
                                                                </span>
                                                        </label>
                                                </div>
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valTelevison}  onClick={()=>{set_facInFil("Televison")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">มีที่ทำอาหาร</span>
                                                                </span>
                                                        </label>
                                                </div>
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valWaterHeater}  onClick={()=>{set_facInFil("Water heater")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">เครื่องทำน้ำอุ่น</span>
                                                                </span>
                                                        </label>
                                                </div>   
                                                <br></br>                       
                                                <h5>สิ่งอำนวยความสะดวก(ของหอพัก)</h5>
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valInternet}  onClick={()=>{set_facOutFil("internet & wifi")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">อินเตอร์เน็ต และ wifi </span>
                                                                </span>
                                                        </label>
                                                </div>
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valCCTV}  onClick={()=>{set_facOutFil("CCTV")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">โทรทัศน์วงจรปิด</span>
                                                                </span>
                                                        </label>
                                                </div>
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valKeycard}  onClick={()=>{set_facOutFil("Key card")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">คีย์การ์ด</span>
                                                                </span>
                                                        </label>
                                                </div>
                                                <div className="page__toggle">
                                                        <label className="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valLaundry}  onClick={()=>{set_facOutFil("Laundry")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">ซักรีด</span>
                                                                </span>
                                                        </label>
                                                </div> 
                                                <div className="page__toggle">
                                                        <label class="toggle">
                                                                <input className="toggle__input" type="checkbox" checked={valCarPark}  onClick={()=>{set_facOutFil("Car park")}} ></input>
                                                                <span className="toggle__label">
                                                                <span className="toggle__text">ที่จอดรถ</span>
                                                                </span>
                                                        </label>
                                                </div>   
                                        </div>
                                </div>
                                <div className='box-display' >
                                        <div className='customGrid-displayApt'>
                                                {resultApt.map((task)=>(
                                                
                                                        <div className='card-display' onClick={()=>{
                                                                toDetail(task);
                                                        }}>
                                                                <Row>
                                                                        <div className="display-apt-grid-item">
                                                                                <img   className='imgApt-test' src={`http://localhost:1000/${task.imgAptSrc}`} alt="test"  />
                                                                                <div className='display-apt-grid-item-right'>
                                                                                        <h4>{task.name}</h4>
                                                                                        <BoxScroll  
                                                                                                dataApt={task}
                                                                                        />
                                                                                </div>
                                                                        </div>
                                                                </Row>
                                                        </div>
                                                
                                                ))} 
                                        </div>
                                </div> 
                        </div>
                </div>
        </div>
    )
}

export default DisplayApt
