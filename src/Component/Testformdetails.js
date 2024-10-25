import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from '../Context/Datacontext';


const Testformdetails = () => {

 const navigate = useNavigate();
 const location = useLocation();

 const { data, setData } = useContext(DataContext);

 const { editdata, index } = location.state; // const [userData, setUserData] = useState(location.state);
 let [userData, setUserData] = useState(editdata); // console.log(userData);


 const handleUsername = (e) => {
  setUserData({ ...userData, uname: e.target.value });
 };

 const toggleGender = (gender) => {
  setUserData({ ...userData, gender });
 };

 const increment = () => {
  setUserData({ ...userData, count: userData.count + 1 });
 };

 const decrement = () => {
  setUserData({ ...userData, count: Math.max(0, userData.count - 1) });
 };

 const updaterecord = (e) => {
  e.preventDefault();
  let updatedData = [...data];
  updatedData[index] = userData;  // Replace the item at the specified index
  setData(updatedData);
  navigate('/testform');
 };

 return (
  <div className='formdetails'>
   <div className='formcontainer'>
    <div className='coldetail'>
     <form onSubmit={updaterecord}>
      <div>
       <div className='input'>
        <label>UserName:</label>
        <input type="text" value={userData.uname} onChange={handleUsername} />
       </div>

       <div className='input'>
        <label>Gender:</label>
        <button type="button" onClick={() => toggleGender('male')} className={userData.gender === 'male' ? 'active' : ''}>Male</button>
        <button type="button" onClick={() => toggleGender('female')} className={userData.gender === 'female' ? 'active' : ''}>Female</button>
       </div>

       <div className='input'>
        <label>Medals:</label>
        <button type="button" onClick={decrement}>-</button>
        {userData.count}
        <button type="button" onClick={increment}>+</button>
       </div>
       <br />
       <button type="submit">Update</button>
      </div>
     </form>
    </div>
   </div>
  </div>
 );
};

export default Testformdetails;