import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';
import "../../styles/AuthStyles.css"


const Register = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [answer,setAnswer] = useState("")
  const navigate = useNavigate();

    //form function
    // e stand for event
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(` ${process.env.REACT_APP_API}/api/v1/auth/register`,
          { name, email, password, phone, address,answer}
          );
          if(res && res.data.success){
            toast.success(res.data && res.data.message)
            navigate('/login');
          }else{
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong'); 
        }
       
    };
    
  return (
    <Layout title={'Register - Shiv Store'}>
       <div className='form-container'>
       <form onSubmit={handleSubmit} >
        <h4 className='title'>Register Form</h4>
       <div className="mb-3">
      <input 
       type="text"
        value={name} 
        onChange={(e) => setName(e.target.value)}
        id="exampleInputname" 
          required
        placeholder='Name'/>
    </div>

    <div className="mb-3">
     <input 
      type="email"
      onChange={(e) => setEmail(e.target.value)}
       value={email}
        id="exampleInputemail" 
        required
        placeholder='Email'/>
    </div>

   <div className="mb-3">
    <input 
     type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
       id="exampleInputPassword"
       required
        placeholder='Password' />
   </div>

   <div className="mb-3">
    <input 
     type="text"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      id="exampleInputphone"
      required 
      placeholder='Phone No.'/>
    </div>

    <div className="mb-3">
    <input 
     type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
        id="exampleInputaddress"
        required
         placeholder='Address'/>
    </div>
    <div className="mb-3">
    <input 
     type="text"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
        id="exampleInputaddress"
        required
         placeholder='Enter answer for forgot password'/>
    </div>
  
  <button className="btn btn-primary" type="submit">Register</button>
</form>
       </div>
    </Layout>
  );
}

export default Register