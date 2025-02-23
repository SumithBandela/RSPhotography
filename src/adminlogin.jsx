import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase"; // Import Firebase config
import { collection, getDocs } from "firebase/firestore";

export function AdminLogin() {
    const [cookies, setCookie] = useCookies(["username"]);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (user) => {
            try {
                const querySnapshot = await getDocs(collection(db, "AdminCredentials")); // Adjust collection name
                const adminList = querySnapshot.docs.map(doc => doc.data());

                const admin = adminList.find(record => record.username === user.username);

                if (admin) {
                    if (user.password === admin.password) {
                        setCookie("username", user.username);
                        navigate("/dashboard");
                    } else {
                        navigate("/invalid");
                    }
                } else {
                    navigate("/invalid");
                }
            } catch (error) {
                console.error("Error fetching admin credentials:", error);
            }
        },
    });

    return (
        <div className="d-flex justify-content-center admin-container m-5">
            <form onSubmit={formik.handleSubmit} className="border border-2 p-4"  >
                <h1 className="bi bi-person-fill">Admin Login</h1>
                <dl>
                    <dt>Username</dt>
                    <dd>
                        <input type="text" name="username" onChange={formik.handleChange} value={formik.values.username}  className="form-control"/>
                    </dd>
                    <dt>Password</dt>
                    <dd>
                        <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} className="form-control" />
                    </dd>
                </dl>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}
