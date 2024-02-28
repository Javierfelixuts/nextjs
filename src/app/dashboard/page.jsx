"use client"
import {signOut} from 'next-auth/react'
import { useEffect, useState } from 'react';
import Loading from './loading';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid



function Dashboard() {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [isLoading, setIsLoading] = useState(true)

    const [rowData, setRowData] = useState([]);
      
      // Column Definitions: Defines the columns to be displayed.
      const [colDefs, setColDefs] = useState([
        { field: "account.institution.name" },
        { field: "category" },
        { field: "balance" },
        { field: "status" },
      ]);

    const secretId = process.env.NEXT_PUBLIC_SECRET_ID;
    const secretPassword = process.env.NEXT_PUBLIC_SECRET_PASSWORD;
    const apiUrl = process.env.NEXT_PUBLIC_BELVO_URL;

    const config = {
        method: 'GET',
            headers: {
            'Authorization': `Basic ${btoa(`${secretId}:${secretPassword}`)}`
            },
    };

    useEffect(() => {
        const fetchData = async () => {
            // get the data from the api
            const data = await fetch(`${apiUrl}/api/institutions/`, config);
            // convert the data to json
            const json = await data.json();
            // set state with the result
            setOptions(json);
            setIsLoading(false)
          }

          fetchData()
          .catch(console.error);
    }, []);
    
    console.log(isLoading);
    const getBank = (val) => {
        console.log("val: ", val);
    };

    const getAllLinks = async (institution) => {
      const fetchData = async () => {
        // get the data from the api
        const data = await fetch(`${apiUrl}/api/links/`, config);
        // convert the data to json
        const json = await data.json();

        const res = json.results.filter(obj => obj.institution == institution);
        return res
      }
      return fetchData()
    }

    const getAllTransactions = async (linkId) => {
      if(linkId == undefined) {
        setRowData([])
        return []
      }
      const fetchData = async () => {
        const data = await fetch(`${apiUrl}/api/transactions/?link=${linkId}`, config);
        const json = await data.json();
        setRowData(json.results)

        return json
      }
      return fetchData()
    }
    async function handleChange(e){
      const institution = e.target.value;
      setSelectedOption(institution)
      const link = await getAllLinks(institution);
      
      const transactions = await getAllTransactions(link[0]?.id) || []

      console.log("transactions_ ", transactions)
    };


    
  return (
    <section className=" flex justify-center items-center">

      { isLoading ? <Loading /> : 
        <div>
          <select value={selectedOption} name="" id="" onChange={handleChange}>
            {
                options?.results?.map(val => <option key={val.name} value={val.name}>{val.name}</option>)
            }
          </select>

          <div
                className="ag-theme-quartz me-4" // applying the grid theme
                style={{ height: 500 }} // the grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            </div>
          <div className='flex flex-wrap'>
            {
                  options?.results?.map(val => <div key={val.name} className='w-28 p-3 border-indigo-400' onClick={() => getBank(val)}>
                    <img  className='w-14 border-indigo-400' src={val.icon_logo} alt={val.name} />
                    <span className='text-xs'>{val.display_name}</span>
                  </div>)
            }
          </div>
        </div>
      }

    </section>
  )
}
export default Dashboard