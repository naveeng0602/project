import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [values,setValues]= useSearch()
     const navigate = useNavigate();
  return (
    <>
    <Layout title={'Search Results'}>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{values?.results.length < 1 ? 'No Prducts Found' : `Found ${values?.results.length}`}</h6>
                <div className='d-flex flex-wrap mt -4'>
                    {values?. results.map((p) => (
                   <div className="card m-3" style={{"width": "12rem"}} >
                  <img className="card-img-top" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} 
                  alt={p.name}  width={'80px'}
                  height={"150px"} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,10)}...</p>
                    <p className="card-text">Rs. {p.price}</p>
                    <button class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${p.slug}`)}>More Details</button>
                    {/* <button class="btn btn-secondary ms-1 m-1">Add To Card</button> */}
                    </div>
                </div>
              ))}
            </div>
            </div>
        </div>
    </Layout>
    </>
  )
}

export default Search