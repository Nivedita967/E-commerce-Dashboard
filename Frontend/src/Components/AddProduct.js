import React from 'react';

const AddProduct= ()=>{
    const [name,setName]= React.useState("");
    const [price,setPrice]= React.useState("");
    const [category,setCategory]= React.useState("");
    const [company,setCompany]= React.useState("");
    const [error, setError]= React.useState(false);

    const AddProduct = async ()=>{
        // check if any input is blank
        console.log(!name);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        console.log(name,price,category,company);
        const userId = JSON.parse(localStorage.getItem('user'));
        let result = await fetch('http://localhost:5000/add-product',{
            method: 'POST',
            body: JSON.stringify({name,price,category,company,userId}),
            headers: {
                'Content-Type':'application/json',
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        });
        result= await result.json();
        console.log(result);
        
    }

    return(
        <div className="divBox">
            <h1>Add Products</h1>
            <input className= "inputBox" type="text" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Product Name" />
            {error && !name && <span className="Invalid">Enter valid name</span>}
            <input className= "inputBox" type="text" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder="Enter Product Price" />
            {error && !price && <span className="Invalid">Enter valid price</span>}
            <input className= "inputBox" type="text" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder="Enter Product Category" />
            {error && !category && <span className="Invalid">Enter valid Category</span>}
            <input className= "inputBox" type="text" onChange={(e)=>setCompany(e.target.value)} value={company} placeholder="Enter Product Company" />
            {error && !company && <span className="Invalid">Enter valid Company</span>}
            <button onClick={AddProduct} className="appButton" type="button">Add Product</button>
        </div>
    )
}

export default AddProduct;