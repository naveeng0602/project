import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams,useNavigate } from 'react-router-dom'
import axios from "axios";
import { useSearch } from '../context/search';

const CategoryProduct = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    if(params?.slug) getProductsByCat()
  },[params?.slug])
const getProductsByCat = async () => {
  try {
    const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
    setProducts(data?.products);
    setCategory(data?.category);
  } catch (error) {
    console.log(error);
  }
}
  return (
    <Layout>
           <div className='container mt-3'>
            <h4 className='text-center'>{category?.name}</h4>
            <h6 className='text-center'>{products?.length} result found</h6>
            <div className='row'>
            <div className='col-md-12'>
            {JSON.stringify()}
            <h1 className='text-center'>All Products</h1>
            <div className='d-flex flex-wrap'>
            {products?.map((p) => (
              <div className="card m-3" style={{"width": "12rem"}} >
                  <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                  alt={p.name} width={'100px'}
                  height={"200px"} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,10)}...</p>
                    <p className="card-text">Rs. {p.price}</p>
                    <button class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                    <button class="btn btn-secondary ms-1 m-1">Add To Card</button>
                    </div>
                </div>
              ))}
            </div>
            {/* <div className='m-2 p-3'>
              {products && products.length <total && (
                <button className='btn btn-warning' onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}>
                  {loading ? "Loading ... " : "Loadmore"}
                </button>
              )}
              </div>*/}
          </div>
            </div>
            </div>         
    </Layout>
    
  )
}

export default CategoryProduct