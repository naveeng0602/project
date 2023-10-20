import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart';
import toast from 'react-hot-toast'

const ProductDetails = () => {
    const params = useParams()
    const [product,setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState()
    const navigate = useNavigate();
    const [cart,setCart] = useCart([]);

  
    //inital p details
    useEffect(() => {
        if(params?.slug) getProduct()
    },[params?.slug])
    //getProduct
    const getProduct = async() => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }
    //get similar product
    const getSimilarProduct = async (pid,cid) => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error);
            
        }
    }

  return (
  <Layout>
      <div className='row container mt-2'>
        <div className='col-md-6'>
          <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
          className='card-img-top'
          alt={product.name}
          height="400px"
          width="400px"
          />
        </div>
        <div className='col-md-6'>
            <h1 className='text-center'>Product Details</h1>
            <h5 className='mb-3 p-2'>Name: {product.name}</h5>
            <h5 className='mb-3 p-2'>Description: {product.description}</h5>
            <h5 className='mb-3 p-2'>Price:  Rs.{product.price}</h5>
            <h5 className='mb-3 p-2'>Category: {product.category?.name}</h5>
            {relatedProducts?.map((p) => (
            <button className='btn btn-secondary ms-1'
             onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart",JSON.stringify([...cart,p]));
                      toast.success("Item Added to cart")
                    }}
                    >
            Add To Cart</button>
             ))}
        </div>
      </div>
      <div className='row container'>
        <h3>Similar Product</h3>
        {relatedProducts?.length < 1 && <p className='text-center'>No Similar Product Found</p>}
        <div className='d-flex flex-wrap'>
            {relatedProducts?.map((p) => (
              <div className="card m-2" style={{"width": "18rem"}} >
                  <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                  alt={p.name} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,10)}...</p>
                    <p className="card-text">Rs. {p.price}</p>
                    <button class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                    <button class="btn btn-secondary ms-1"
                     onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem("cart",JSON.stringify([...cart,p]));
                      toast.success("Item Added to cart")
                    }}
                    >Add To Card</button>
                    </div>
                </div>
              ))}
            </div>
      </div>
  </Layout>
  )
}

export default ProductDetails