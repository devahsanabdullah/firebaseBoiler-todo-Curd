import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { query, orderBy, onSnapshot, deleteDoc } from "firebase/firestore";
import { db } from "../components/utils/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [getItem, setGetItem] = useState([]);
  const [storeId,setStoreId]=useState('')


  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setGetItem(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const handleDelete = async (id) => {
    const taskDocRef = doc(db, "tasks", id);
    try {
      await deleteDoc(taskDocRef);
    } catch (err) {
      alert(err);
    }
    toast.error('delete task!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      })
  };

  const addItem = async () => {

    if(storeId)
    {
      const taskDocRef = doc(db, 'tasks', storeId.id)
      try {
        await updateDoc(taskDocRef, {
          inputData,
          completed: false,
          created: Timestamp.now(),
        });
        setInputData('')
        setStoreId('')

      } catch (err) {
        console.log(err);
      }
    }
    else
    {
    try {
      await addDoc(collection(db, "tasks"), {
        inputData,
        completed: false,
        created: Timestamp.now(),
      });
      setInputData('')
        setStoreId('')
    } catch (err) {
      console.log(err);
    }
  }

  toast.success('successfull!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  };
  const handleEdit = (data) => {

    setInputData(data.data.inputData)
    setStoreId(data)
 

  };
  return (
    <>
      <div className="flex justify-center items-center mt-16">
        <input
          type="text"
          className="w-96 h-10 rounded-lg border-2"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button className=" bg-black  px-3 py-2 rounded-lg text-white cursor-pointer" onClick={() => addItem()}>
          Add
        </button>
      </div>
      <ul className="flex flex-col justify-center items-center mt-16">
        {getItem &&
          getItem.map((data) => {
            return (
              <li className=" flex flex-col shadow-lg p-3 w-1/2 h-24 mb-5 border-l-8 border-l-black">
               <h1 className="text-2xl "> {data.data.inputData}</h1>
                <div className="flex justify-end">
                <button
                  className="ml-2  bg-blue-500  px-3 py-2 rounded-lg text-white cursor-pointer"
                  onClick={() => handleEdit(data)}
                >
                  Edit
                </button>
                <button
                  className="ml-2  bg-red-500  px-3 py-2 rounded-lg text-white cursor-pointer"
                  onClick={() => handleDelete(data.id)}
                >
                  delete
                </button>
                
                </div>
              </li>
            );
          })}
      </ul>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
    </>
  );
};

export default Todo;
