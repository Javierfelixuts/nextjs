"use client"
import { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

function Accounts() {
    const [isLoading, setIsLoading] = useState(true)
    const [rowData, setRowData] = useState([]);
      
      // Column Definitions: Defines the columns to be displayed.
      const [colDefs, setColDefs] = useState([
        { field: "institution.name" },
        { field: "name" },
        { field: "balance.current" },
        { field: "balance_type" },
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
            const data = await fetch(`${apiUrl}/api/accounts/?link=2e26181a-2afe-4b49-aa4b-19710bcf59ed`, config);
            // convert the data to json
            const json = await data.json();
            console.log(json)
            // set state with the result
            setRowData(json.results);
            setIsLoading(false)
        }

        fetchData()
            .catch(console.error);
    }, []);
    return (
        <>
            <h1 className="text-slate-600 font-bold text-4xl mb-4 text-center -mt-4">ACCOUNTS</h1>
            <div
                className="ag-theme-quartz me-2" // applying the grid theme
                style={{ height: 500 }} // the grid will fill the size of the parent container
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                />
            </div>
        </>
    )
}

export default Accounts