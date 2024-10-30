import React, { useContext, useState } from 'react'
import 'react-notifications/lib/notifications.css';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import { useNavigate } from 'react-router-dom'
import { DataContext } from '../Context/Datacontext';

const Testform = () => {

  ////states define
  let [uname, setuname] = useState('');
  let [count, setcount] = useState(0);
  let [gender, setgender] = useState('');
  let [searchname, setsearchname] = useState(''); 

  // let [data, setData] = useState([]);
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();

  //// functions define
  let togglegender = (gender) => {
    setgender(gender)
  }

  let Increment = () => {
    setcount(count++);
  }

  let Decrement = () => {
    if (count <= 0) {
      setcount(0)
    }
    else {
      setcount(count--);
    }
  }
  let formhandle = (e) => {
    e.preventDefault();
  }

  ///submit form
  let submitdata = (e) => {
    //// not submit the empty form
    if (uname === '' || gender === '') {
      NotificationManager.warning('Plz fill the form')
    }
    else {
      /////data store in array
      let userdata = { uname, gender, count }
      let nameExists = data.filter((v, i) => v.uname === uname);
      /// no duplicate name is used
      if (nameExists.length === 0) {
        // old array data ,new array data
        let finaldata = [...data, userdata]
        setData(finaldata)
        NotificationManager.success('form successfully save');

        /////after click on add btn the form is empty 
        setuname('')
        setgender('')
        setcount(0)
      }
      else {
        NotificationManager.error('Name already exist')
      }
    }
    e.preventDefault();
  }

  // function for delete-record
  let delrecord = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this record?");

    if (confirmDelete) {
      let delrecord = data.filter((v, i) => i !== index);
      setData(delrecord);
      NotificationManager.warning("Record will be deleted ");
    }
    else {
      NotificationManager.info("Donot delete the record");
    }
  }

  /// function for edit record
  let editrecord = (index) => {
    let editdata = data[index];  // Directly access the item
    navigate('/formdetails', { state: { editdata, index } });
  };


  return (
    <>
      <NotificationContainer />
      <div className='Testform'>
        <div className='container'>
          <div className='column'>
            <form onSubmit={formhandle}>
              <div className='formflex'>
                <div className='input'>
                  <label>UserName:</label>
                  <input type="text" value={uname} name='uname' onChange={(event) => setuname(event.target.value)} />
                </div>

                <div className='input' >
                  <label>Gender:</label>
                  <button onClick={() => { togglegender('male') }} className={(gender) === 'male' ? 'active' : ''}
                  >Male</button >
                  <button onClick={() => { togglegender('female') }} className={(gender) === 'female' ? 'active' : ''}
                  >Female </button>
                </div>

                <div className='input' >
                  <label>Medals:</label>
                  <button onClick={Decrement}>-</button>
                  {count}
                  <button onClick={Increment}>+</button>
                </div>
                <br /><br />
                <button id='submitbtn' onClick={submitdata} >Save</button>
              </div>
            </form>

          </div>

          <div className='column'>
            <h2 style={{ margin: '10px 60px', color: '#358dcd' }}>Added Data details are:</h2>
            <div className='searchbar'>
              <div className='input'>
                <input type="text" value={searchname} name='searchname' onChange={(event) => setsearchname(event.target.value)} />
              </div>
            </div>
            <div className='lists'>
              {/* use of ternary operator for showing todolist*/}
              {data.length >= 1 ?
                (data
                  .filter((ele) => {
                    return searchname.toLowerCase() === ''
                      ? ele
                      : ele.uname.toLowerCase().includes(searchname.toLowerCase())
                  })
                  .map((v, i) => (
                    <ul key={i}>
                      <li><b>{i + 1}</b>-<b>Name</b>:{v.uname}  <br /><b>Gender</b>:{v.gender} <br /> <b>Medals:</b>{v.count} <br />
                        <button onClick={() => editrecord(i)} >Edit record</button>
                        <span onClick={() => delrecord(i)}> &times; </span>
                      </li>
                    </ul>
                  ))
                ) : (
                  <ul><li>No entry yet</li></ul>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testform;

