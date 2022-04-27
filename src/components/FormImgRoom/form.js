import React from "react";
import {Row,Col,Form,Button} from 'react-bootstrap'
import axios from 'axios';
const From = (props)=>{
    const token = localStorage.getItem("token")
    const [inputImg, setInputImg] = React.useState(null);

    function UpdateRoomImg(){
        let tk = token.split(" ")[1]
        let resultSrc = []
        resultSrc=props.dataRoom.img.filter((data)=>{
            return data.src!==props.src
        })
        let str=resultSrc[0].src
        for(let i=1 ; i < resultSrc.length ; i++){
            str+='$$'+resultSrc[i].src
        }
        const formData = new FormData()
        formData.append("roomId", props.dataRoom._id)
        formData.append("oldImageUrl", str)
        formData.append("uploadedImageArray",  inputImg)
        axios.put(`http://localhost:1000/api/room-image`, formData,
        {       
            headers: {
                'Authorization': 'Bearer ' + tk,   
            },
        }).then((res) => {
            console.log(res)
            props.setActionUpdateImg(!props.actionUpdateImg)
        });
    }

    React.useEffect(()=>{
        console.log(inputImg)
    }, [inputImg]);

    return(
        <div>
            <div align='center'>
                <br></br>
                <div align='left' >
                    <label for="img" > Select image: </label> <br></br>
                    <input type="file"
                        id="img"
                        name="img"
                        accept="image/*" 
                        onChange={(e)=>{
                            setInputImg(e.target.files[0])
                        }}
                        >
                    </input>
                </div>
                <Button variant="success"
                    onClick={()=>{
                        UpdateRoomImg()
                    }}
                > ยืนยัน </Button>
            </div>   
        </div>            
    )
}
export default From;