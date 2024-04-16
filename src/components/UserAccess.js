import axios from 'axios';
import React, { useEffect, useState } from 'react'
import md5 from "md5";



function UserAccess() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accountData, setAccountData] = useState([]);
    const [error, setError] = useState();
    const [isLogIn, setIsLogin] = useState(false);
    const [accessMessage, setAccessMessage] = useState("")

    useEffect(() => {
        if (password && accountData) {
            verifyAccess();
        }
    }, [accountData]);
    function handleEmail(e) {
        e.preventDefault();
        setEmail(e.target.value);

    }
    function handlePassword(e) {
        e.preventDefault();
        setPassword(e.target.value);

    }

    async function getAccount(e) {
        e.preventDefault();
        try {
            let response = await axios.get(`http://localhost:8000/api/user/${email}`);
            console.log(response);
            if (response.data.data) {
                setAccountData(response.data.data);
                console.log(accountData);
            } else {
                setError("User not found");
            }

        } catch (error) {
            setError("There is a problem retriving the data");
        }

    }
    function verifyAccess() {
        console.log(password);
        const hash = md5(password);
        console.log(hash);
        console.log(accountData.password);

        if (accountData.password === hash) {
            console.log("Log in succsesfully");
            setAccessMessage("welcome back " + accountData.name);
            setIsLogin(true);
            setError("");
        } else {
            console.log("not match");
            setAccessMessage("Eamil address or password not matching");
            setIsLogin(false);

        }
    }

    if (isLogIn) {
        return (
            <div>
                <h3>{accessMessage}</h3>
                <button>Continue to checkout</button>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Log In</h3>
                <h4>{error}</h4>
                <form>
                    <label>User name:</label>
                    <input type="text" value={email} placeholder='Enter email' onChange={handleEmail} />
                    <input type="password" value={password} placeholder='Password' onChange={handlePassword} />
                    <button onClick={getAccount}  >
                        Submit
                    </button>
                </form>
            </div>
        )
    }

}
export default UserAccess;