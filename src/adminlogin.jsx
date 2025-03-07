import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

export function AdminLogin() {
    const [ , setCookie] = useCookies(["username"]);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (user) => {
            try {
                axios.get('https://rsphotography.onrender.com/users')
                .then(response=>{
                    const adminList = response.data

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
                })
                
            } catch (error) {
                console.error("Error fetching admin credentials:", error);
            }
        },
        validationSchema:yup.object({username:yup.string().required('Username is required')})
    });

    return (
        <div className="d-flex justify-content-center admin-container m-5">
            <form onSubmit={formik.handleSubmit} className="border border-3 p-4 " style={{width:'350px'}}  >
                <h1 className="bi bi-person-fill"> Login</h1>
                <dl>
                    <dt>Username</dt>
                    <dd>
                        <input type="text" name="username" onChange={formik.handleChange} value={formik.values.username}  className="form-control"/>
                    </dd>
                    <dd className="text-danger">{formik.errors.username}</dd>
                    <dt>Password</dt>
                    <dd>
                        <input type="password" name="password" onChange={formik.handleChange} value={formik.values.password} className="form-control" />
                    </dd>
                </dl>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
    );
}
