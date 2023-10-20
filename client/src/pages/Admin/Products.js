import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from "axios"
import toast from "react-hot-toast";
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts]=useState([]);

    //get all Products
    const getAllProducts = async () => {
        try {
            const {data } = await axios.get (`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong")
        }
    };
    // life cycle method
    useEffect(() => {
        getAllProducts();
    },[]);
  return ( <>
  <Layout>
      <div className="row">
          <div className='col-md-3'>
              <AdminMenu />
          </div>
          <div className='col-md-9'>
              <h1 className='text-center'>All products List</h1>
              <div className='d-flex flex-wrap' >
              {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
                    <div className="card m-2" style={{
                      "width": "12rem" , "height": " 25rem"
                  } } >
                  <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                  alt={p.name} width={'80px'}
                  height={"200px"} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <p className="card-text">Rs. {p.price}</p>
                    </div>
                </div>
                </Link>
                ))}
                </div>
          </div>
      </div>
  </Layout>
  </>
  )
}

export default Products