import { useEffect, useState } from "react";
import { db } from "./firebase"; // Ensure you have firebase configured
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminDashboard() {
    const [cookies, , removeCookie] = useCookies(["username"]); // Removed unused 'setCookie'
    const [clientDetails, setClientDetails] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        if(!(cookies.username==='rsphotography'))
        {
            navigate('/login')
            return;
        }else{
            const fetchClients = async () => {
                try {
                    const querySnapshot = await getDocs(collection(db, "rsphotography")); // Adjust collection name
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
    }, []);

    function handleSignOut() {
        removeCookie("username"); // Remove only "username" instead of an array
        navigate("/home");
    }

    return (
        <div>
            <div className="m-2 text-success justify-content-center d-flex rounded">
                <span className="fs-3 p-2">{cookies["username"]} - Dashboard</span>
            </div>
            <table className="table table-hover m-2 p-2 overflow-scroll">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {clientDetails.map(client => (
                        <tr key={client.id}>
                            <td>{client.name}</td>
                            <td>{client.email}</td>
                            <td>{client.phone}</td>
                            <td>{client.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="btn btn-link" onClick={handleSignOut}>Signout</div>
        </div>
    );
}
