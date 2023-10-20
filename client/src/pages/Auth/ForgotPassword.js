import React,{useState} from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  toast  from 'react-hot-toast';
import "../../styles/AuthStyles.css"

const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");
    
  const navigate = useNavigate()

  //form function
    // e stand for event
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post(` ${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          { email, newPassword,answer}
          );
          if(res && res.data.success){
            toast.success(res.data && res.data.message);
           
            navigate('/login');
          }else{
            toast.error(res.data.message)
          }
        } catch (error) {
          console.log(error);
          toast.error('Something went wrong'); 
        }
        console.log(process.env.REACT_APP_API);
    };
    
  return (
        <Layout title={'Forgot Password'}>
            <div className='form-container'>
       <form onSubmit={handleSubmit} >
        <h4 className='title'>Reset Password</h4>
       
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
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
       id="exampleInputPassword"
       required
        placeholder='NewPassword' />
    </div>

    <div className="mb-3">
     <input 
      type="text"
      onChange={(e) => setAnswer(e.target.value)}
       value={answer}
        id="exampleInputanswer" 
        required
        placeholder='Enter answer for forgot password'/>
    </div>

    <div className='mb-3'>
   <button className="btn btn-primary" type="submit">Reset Password</button>
   </div>
</form>
       </div>
        </Layout>
  )
}

export default ForgotPassword