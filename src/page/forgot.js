import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Axios from "axios"
import { mysqlapi } from '../helper/url'

class forgotpassword extends Component {
    state = { email: '' }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onbtnClick = () => {
        let email = this.state.email
        Axios.post(mysqlapi + 'kirimemail', {
            email
        }).catch((err) => {
            var error = JSON.stringify(err.response.data.message);
            console.log(err.response.data);
            alert(error)
        })
            .then((res) => {
                if (res === undefined) {
                    alert('email tidak terkirim');
                }
                else {
                    alert('email terkirim')
                }
            })
    }

    render() {
        console.log(this.state.email);
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
                        <h3>Please input email</h3>
                        <TextField id="standard-basic" label="Email" name="email" onChange={this.onChange} value={this.state.email} />
                        <br></br>
                        <Button variant="contained" color="secondary" style={{ minWidth: '185px' }} onClick={this.onbtnClick}>Forgot Password</Button>
                        <br></br><br></br>
                    </div>
                </Box >
            </ div >
        );
    }
}

export default forgotpassword;