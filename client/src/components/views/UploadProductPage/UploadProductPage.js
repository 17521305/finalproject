import React, {useState} from 'react'
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';
const { Title } = Typography;
const { TextArea } = Input;
const Devices=[
    {key:1,value:"Điện thoại"},
    {key:2,value:"Tablet"},
    {key:3,value:"Đồng hồ"},
    {key:4,value:"Âm thanh"},
    {key:5,value:"Laptop"},
]
function UploadProductPage(props) {
    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [DevicesValue, setDevicesValue] = useState(1)
    const [Images, setImages] = useState([])
    const onTitleChange=(event)=>{
        setTitleValue(event.currentTarget.value)
    }
    const onDescriptionChange=(event)=>{
        setDescriptionValue(event.currentTarget.value)
    }
    const onPriceChange=(event)=>{
        setPriceValue(event.currentTarget.value)
    }
    const updateImages=(newImages)=>{
        setImages(newImages)
    }
    const onDevicesSelectChange=(event)=>{
        setDevicesValue(event.currentTarget.value)
    }
    const onSubmit=(event)=>{
        event.preventDefault();
        if(!TitleValue||!DescriptionValue||!PriceValue||!Images||!Devices){
            return alert('Vui lòng điền hết vào các trường!')
        }
        const variables={
            writer:props.user.userData._id,
            title:TitleValue,
            description:DescriptionValue,
            price:PriceValue,
            images:Images,
            devices:DevicesValue
        }
        Axios.post('/api/product/uploadProduct',variables)
        .then(response=>{
            if(response.data.success){
                alert('Sản phẩm đã được upload thành công')
                props.history.push('/') 
            }else{
                alert('Upload sản phẩm không thành công')
            }
        })
    }
    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>Upload sản phẩm</Title>
            </div>
            <Form onSubmit={onSubmit}>
                <FileUpload refreshFunction={updateImages}/>
                <br/>
                <br/>
                <label>Tiêu đề</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br/>
                <br/>
                <label>Mô tả</label>
                <TextArea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br/>
                <br/>
                <label>Mức giá (VND)</label>
                <Input
                    onChange={onPriceChange}
                    value={PriceValue}
                    type='number'
                />
                <select onChange={onDevicesSelectChange}>
                    {Devices.map(item=>(
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br/>
                <br/>
                <Button onClick={onSubmit}>
                    Đăng
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
