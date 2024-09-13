import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const ProductList= ()=>{
    const [products,setProducts]= useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    // API call
    const getProducts = async ()=>{
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })

        result= await result.json();
        setProducts(result);
    }

    const deletePoduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: 'DELETE',
            headers:{
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result= await result.json();
        if(result){
            alert("Record Deleted");
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            result= await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }
        
    }

    return(
        <div className="product-list">
            <h1>Products</h1>
            <input type="text" placeholder='Search Product'
            onChange={searchHandle}
            />
            <ul>
                <li>S. No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                products.length>0 ? products.map((item,index) =>
                    <ul>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>$ {item.price}</li>
                        <li>{item.category}</li>
                        <li>
                        <button onClick={()=>deletePoduct(item._id)}>Delete</button>
                        <button><Link to={"/update/"+item._id}>Update</Link></button>
                        </li>
                    </ul>
                ):
                <h3 style={{color:"red"}}>No Result Found</h3>
            }
        </div>
    )
}

export default ProductList;