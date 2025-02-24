import { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure you have firebase configured
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

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
                    const querySnapshot = await getDocs(collection(db, "ClientDetails")); // Adjust collection name
                    const clientsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setClientDetails(clientsData);
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
                        const [datePart, timePart] = dateTimeStr.split(", "); // Assuming format: "DD/MM/YYYY, HH:MM:SS"
                        const [day, month, year] = datePart.split("/").map(Number);
                        const [hours, minutes, seconds] = timePart ? timePart.split(":").map(Number) : [0, 0, 0];
    
                        return new Date(year, month - 1, day, hours, minutes, seconds);
                    };
    
                    const dateA = parseDateTime(a.date);
                    const dateB = parseDateTime(b.date);
    
                    return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
                } else {
                    const nameA = a.name.toLowerCase();
                    const nameB = b.name.toLowerCase();
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
            <table className="table table-hover m-2 p-2 ">
                <thead>
                    <tr>
                        <th onClick={()=>handleSort('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ' '} </th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Message</th>
                        <th onClick={()=>handleSort('date')}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ' '}</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedClientDetails.map(client => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.message}</td>
                            <td>{client.date.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <div className="btn btn-link" onClick={handleSignOut}>Signout</div>
        </div>
    );
}
