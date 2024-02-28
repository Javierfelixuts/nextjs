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
    const [isLoading, setIsLoading] = useState(true);

    const [kpiBalance ,setKpiBalance] = useState(0)

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

          firstRender('erebor_co_retail')
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
        setKpiBalance(0)
        return []
      }
      const fetchData = async () => {
        const data = await fetch(`${apiUrl}/api/transactions/?link=${linkId}`, config);
        const json = await data.json();

        const balance = json.results.reduce((acc, transaction) => {
          if (transaction.type === 'INFLOW') {
            // Inflow transactions increase the balance
            acc += transaction.balance;
        } else if (transaction.type === 'OUTFLOW') {
            // Outflow transactions decrease the balance
            acc -= transaction.balance;
        }
        return acc;
        }, 0)

        setKpiBalance(balance.toFixed(2))
        setRowData(json.results)

        return json
      }
      return fetchData()
    }

    async function firstRender(institution){
      setSelectedOption(institution)
      const link = await getAllLinks(institution);
      
      await getAllTransactions(link[0]?.id) || []
    }
    async function handleChange(e){
      const institution = e.target.value;
      setSelectedOption(institution)
      const link = await getAllLinks(institution);
      
      const transactions = await getAllTransactions(link[0]?.id) || []

      console.log("transactions_ ", transactions)
    };

    


    
  return (<>

    <div className='p-4 bg-white text-black w-fit rounded-lg shadow-lg me-4 my-4'>
      BALANCE: $ <span className={kpiBalance < 0 ? "text-red-400" : kpiBalance == 0 ? "": "text-green-600"}> {kpiBalance}</span>
    </div>
    <section className=" flex justify-center items-center">

      { isLoading ? <Loading /> : 
        <div>
          <label htmlFor="" className='me-2 text-xs'>Selecciona un banco:</label>
          <select className='block peer h-full rounded-[7px] border border-blue-gray-200 p-2 border-x-8 border-white mb-3 shadow-lg' value={selectedOption} name="" id="" onChange={handleChange}>
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
  </>

  )
}
export default Dashboard