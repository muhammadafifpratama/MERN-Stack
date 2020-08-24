import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Link, Redirect } from 'react-router-dom'
import Axios from "axios"
import { mongoapi } from '../helper/url'

class Loginpage extends Component {
    state = {
        error: false,
        edirect: false
    }

    loginUser = () => {
        let username = this.username.value
        let password = this.password.value
        console.log(username)
        console.log(password)
        if (username === '' || password === '') {
            alert('Fill in all the forms')
        } else {
            // Axios.get(mysqlapi + 'login/' + username + '/' + password)
            Axios.post(mongoapi + "login", {
                username,
                password
            })
                .catch((err) => {
                    var error = JSON.stringify(err.response.data.message);
                    console.log(err.response.data);
                    alert(error)
                })
                .then((res) => {
                    if (res === undefined) {
                        console.log('no response');
                    }
                    else {
                        alert('welcome ' + res.data[0].username)
                        console.log(res.data[0].username);
                        localStorage.setItem('username', res.data[0].username)
                        this.setState({ edirect: true })
                    }
                })
        }
    }

    render() {
        if (this.state.edirect) {
            return <Redirect to='/' />
        }
        // console.log(res.data);
        return (
            <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Box width={800} height={300} bgcolor="grey.300" p={1} my={0.5}>
                    <div style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <TextField id="standard-basic" label="Username" inputRef={(username) => this.username = username} > </TextField>
                        <br></br>
                        <TextField id="standard-password-input" label="Password" type="password" inputRef={(password) => this.password = password}> </TextField>
                        <br></br>
                        <Button variant="contained" color="secondary" style={{ minWidth: '185px' }} onClick={this.loginUser}>Login</Button>
                        <br></br><br></br>
                        <Link to="/forgot">
                            <center>Forgot Password?</center>
                        </Link>
                    </div>
                </Box >
            </ div >
        )
    }
}
export default Loginpage;