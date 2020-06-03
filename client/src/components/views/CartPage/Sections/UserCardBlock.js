import React from 'react'

function UserCardBlock(props) {
    const renderCartImage=(images)=>{
        if(images.length > 0){
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }
    const renderItems=()=>(
        props.products && props.products.map(product=>(
            <tr key={product._id}>
                <td>
                    <img style={{width:'70px'}} alt="product" src={renderCartImage(product.images)}/>
                </td>
                <td>{product.quantity}</td>
                <td>VND {product.price}</td>
                <td><button onClick={()=>props.removeItem(product._id)}>Xóa</button></td>
            </tr>
        ))
    )
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Hình ảnh sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Xóa khỏi giỏ hàng</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
