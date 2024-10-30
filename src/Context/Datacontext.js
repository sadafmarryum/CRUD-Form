
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const StateProvider = ({ children }) => {
 // const [data, setData] = useState([]); ///if we use this then data is not display in list if we reload the page

 const [data, setData] = useState(() => {
  const localData = localStorage.getItem('userdata');
  return localData ? JSON.parse(localData) : [];
 });

 useEffect(() => {
  localStorage.setItem('userdata', JSON.stringify(data));
 }, [data]);

 return (
  <DataContext.Provider value={{ data, setData }}>
   {children}
  </DataContext.Provider>
 );
};

