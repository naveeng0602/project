import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from "react-hot-toast"
const Profile = () => {
  //context
  const [auth,setAuth] = useAuth()
  //state
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  
  //get user data 
  useEffect(() => {
    const {email, name, phone, address} = auth?.user
    setName(name);
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[auth?.user])
   

  //form function
    // e stand for event
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, password, phone, address}
        );
        if(data?.error){
          toast.error(data?.error)
        }else{
          setAuth({...auth, user:data?.updatedUser});
          let ls = localStorage.getItem('auth');
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem('auth',JSON.stringify(ls));
          toast.success("Profile Updated Successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong'); 
      }
     
  }; 

  return (
    <Layout title={'Profile'}>
         <div className='container-fluid p-3 m-3'>
            <div className='row'>
                <div className='col-md-3'>
                     <UserMenu/>
                </div>
                <div className='col-md-9'>
                <div className='form-container'>
       <form onSubmit={handleSubmit} >
        <h4 className='title'>User Profile</h4>
       <div className="mb-3">
      <input 
       type="text"
        value={name} 
        onChange={(e) => setName(e.target.value)}
        id="exampleInputname" 
        
        placeholder='Name'/>
    </div>

    <div className="mb-3">
     <input 
      type="email"
      onChange={(e) => setEmail(e.target.value)}
       value={email}
        id="exampleInputemail" 
      
        placeholder='Email'
        disabled/>
    </div>

   <div className="mb-3">
    <input 
     type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
       id="exampleInputPassword"
    
        placeholder='Password' />
   </div>

   <div className="mb-3">
    <input 
     type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      id="exampleInputphone"
     
      placeholder='Phone No.'/>
    </div>

    <div className="mb-3">
    <input 
     type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
        id="exampleInputaddress"
      
         placeholder='Address'/>
    </div>

  
  <button className="btn btn-primary" type="submit">Update</button>
</form>
       </div>
                </div>
            </div>
        </div>
    </Layout>
    
  )
}

export default Profile