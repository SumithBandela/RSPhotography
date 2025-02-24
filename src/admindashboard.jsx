import { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure you have firebase configured
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminDashboard() {
    const [cookies, , removeCookie] = useCookies(["username"]); // Removed unused 'setCookie'
    const [clientDetails, setClientDetails] = useState([]);
    const[sortConfig,setSortConfig] = useState({key:null,direction:'asc'})
    let navigate = useNavigate();

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
      
     function sortedItems()
     {
        const sortableItems = [...clientDetails];

if (sortConfig.key !== null) {
  sortableItems.sort((a, b) => {
    if (sortConfig.key === 'date') {
      const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(Number);
        return new Date(year, month - 1, day); // Month is 0-based in JS Date
      };

      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);

      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    } else {
      // For name, do a case-insensitive sort
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (nameA > nameB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    }
  });
}

return sortableItems;
     }

     const sortedClientDetails = sortedItems();
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
                        <th onClick={()=>handleSort('name')}>Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '►'} </th>
                        <th>Email</th>
                        <th>Phone Number </th>
                        <th>Message</th>
                        <th onClick={()=>handleSort('date')}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : '► '}</th>
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
