import logo from './logo.svg';
import './App.css';
import { useTable } from 'react-table/dist/react-table.development';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

function App() {
  //1 State/Hook Area
  const [data,setData] = useState([]);

  useEffect(()=>{
    //Api Calling code comes here
    (async()=>{
        let po = await axios('https://api.tvmaze.com/search/shows?q=snow');
        //console.log('Before setting ',po.data);
        setData(po.data);
        
        //console.log('After Hook vatiable set',data);
    })(); // Immediatly Invoked Function Expression  IIFE ()();
  },[]);
  const columns = useMemo(
    () => [
      {
        // first group - TV Show
        Header: "TV Show",
        // First group columns
        columns: [
          {
            Header: "Name",
            accessor: "show.name"
          },
          {
            Header: "Type",
            accessor: "show.type"
          }
        ]
      },
      {
        // Second group - Details
        Header: "Details",
        // Second group columns
        columns: [
          {
            Header: "Language",
            accessor: "show.language"
          },
          {
            Header: "Genre(s)",
            accessor: "show.genres"
          },
          {
            Header: "Runtime",
            accessor: "show.runtime"
          },
          {
            Header: "Status",
            accessor: "show.status"
          }
        ]
      }
    ],
    []
  );
  
  const tableInstance = useTable({ columns, data })

  //Destructing = Extract
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance 
  //2. Function Defination Area`


  //3. Return statement
  return (
    <div className="App">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
