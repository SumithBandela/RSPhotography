import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

export function AdminDashboard() {
    const [cookies, , removeCookie] = useCookies(["username"]); // Removed unused 'setCookie'
    const [clientDetails, setClientDetails] = useState([]);
    const[sortConfig,setSortConfig] = useState({key:'date',direction:'desc'})
    let navigate = useNavigate();
    const sortedClientDetails = sortedItems();


    useEffect(() => {
        if(!(cookies.username==='rsphotography'))
        {
            navigate('/login')
            return;
        }else{
            const fetchClients = async () => {
                try {
                    axios.get('https://rsphotography.onrender.com/clientDetails')
                    .then(response=>{
                        setClientDetails(response.data)
                    })
                } catch (error) {
                    console.error("Error fetching client details:", error);
                }
            };
    
            fetchClients();
        }
    }, [cookies.username,navigate]);

    useEffect(()=>{
        sortedItems();
    })
      
    function sortedItems() {
        const sortableItems = [...clientDetails];
    
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key === "date") {
                    const parseDateTime = (dateTimeStr) => {
                        if (!dateTimeStr) return new Date(0); // Default to epoch if missing
    
                        const parts = dateTimeStr.split(", "); // Split by ", " to separate date and time
                        if (parts.length < 1) return new Date(0); // Handle invalid cases
    
                        const datePart = parts[0]; // Date part (expected: "DD/MM/YYYY")
                        const timePart = parts[1] || "00:00:00"; // Default to midnight if time is missing
    
                        const [day, month, year] = datePart.split("/").map(Number);
                        const [hours, minutes, seconds] = timePart.split(":").map(Number);
    
                        return new Date(year, month - 1, day, hours, minutes, seconds);
                    };
    
                    const dateA = parseDateTime(a.date);
                    const dateB = parseDateTime(b.date);
    
                    return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
                } else {
                    // Sorting by name (case-insensitive)
                    const nameA = a.name?.toLowerCase() || "";
                    const nameB = b.name?.toLowerCase() || "";
    
                    if (nameA < nameB) return sortConfig.direction === "asc" ? -1 : 1;
                    if (nameA > nameB) return sortConfig.direction === "asc" ? 1 : -1;
                    return 0;
                }
            });
        }
        return sortableItems;
    }
    

    function handleSignOut() {
        removeCookie("username"); // Remove only "username" instead of an array
        navigate("/home");
    }

    function handleSort(key)
    {
        let direction = 'asc';
        if(sortConfig.key === key && sortConfig.direction ==='asc'){
            direction = 'desc';
        }
        setSortConfig({key,direction})
        
    }
    return (
        <div>
            <div className="m-2 text-success justify-content-center d-flex rounded">
                <span className="fs-3 p-2">{cookies["username"]} - Dashboard</span>
            </div>
            <div className="overflow-scroll">
            <h3 className="text-center">Customer Details</h3>
            <table className="table table-hover table-bordered m-2 p-2 ">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th onClick={()=>handleSort('date')}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ' '}</th>
                        <th onClick={()=>handleSort('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ' '} </th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedClientDetails.map((client,index) => (
                        <tr key={client.id}>
                            <td>{index+1}</td>
                            <td>{client.date}</td>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="btn btn-link" onClick={handleSignOut}>Signout</div>
        </div>
    );
}
