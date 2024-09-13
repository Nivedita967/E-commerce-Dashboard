import React, { useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProd= ()=>{
    const [name,setName]= React.useState("");
    const [price,setPrice]= React.useState("");
    const [category,setCategory]= React.useState("");
    const [company,setCompany]= React.useState("");
    const params = useParams();
    const Navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async () =>{
        console.log(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result= await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async ()=>{
        console.log(name,price,category,company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'PUT',
            body: JSON.stringify({name,price,category,company}),
            headers: {
                'Content-Type':'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result= await result.json();
        console.log(result);
        Navigate('/');
    }

    return(
        <div className="divBox">
            <h1>Update Products</h1>
            <input className= "inputBox" type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Product Name" />
            <input className= "inputBox" type="text" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder="Enter Product Price" />
            <input className= "inputBox" type="text" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder="Enter Product Category" />
            <input className= "inputBox" type="text" onChange={(e)=>setCompany(e.target.value)} value={company} placeholder="Enter Product Company" />
            <button onClick={updateProduct} className="appButton" type="button">Update Product</button>
        </div>
    )
}

export default UpdateProd;