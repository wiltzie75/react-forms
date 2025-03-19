import { useState } from "react";

const SignUpForm = ({ setToken }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            });
            const result = await response.json();
            setToken(result.token);
            console.log(result.token);
            resetForm();
        } catch (error) {
            setError(error.message);
        }
    }

    function resetForm () {
        setUsername("");
        setPassword("");
    }

    return ( 
        <>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input 
                        type="text" 
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        />
                </label>
                <br />
                <label>
                    Password: <input 
                        type="password" 
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)}}
                        pattern="(?=.*[a-z])(?=.*[A-Z]).{6,}"
                        title="Must contain at least one uppercase and lowercase letter, and at least 6 or more characters"
                        required
                        />

                </label>
                <br />
                <label>
                    <button>Submit</button>
                </label>
            </form>
        </>
     );
}
 
export default SignUpForm;

// onClick={resetForm}