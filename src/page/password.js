import React, { Component } from 'react';
import Axios from "axios"
import { mysqlapi } from '../helper/url'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

class changepassword extends Component {
    state = { password: "", confirm: "" }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    resetpassword = () => {
        let str = this.props.location.search
        let res = str.split("=");
        let email = res[1]
        let password = this.state.password
        if (password !== this.state.confirm) {
            alert('pastikan password dan confirm password sama')
        }
        else {
            Axios.patch(mysqlapi + 'forgot/' + email, {
                password
            }).catch((err) => {
                var error = JSON.stringify(err.response.data.message);
                console.log(err.response.data);
                alert(error)
            })
                .then((res) => {
                    if (res === undefined) {
                        alert('change password failed');
                    }
                    else {
                        alert('password has been succesfully change')
                    }
                })
        }
    }

    render() {
        console.log(this.state.password + " " + this.state.confirm);
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
                        <TextField id="standard-password-input" label="Password" type="password" onChange={this.onChange} name="password" value={this.state.password} />
                        <br></br>
                        <TextField id="standard-password-input" label="confirm password" type="password" name="confirm" onChange={this.onChange} value={this.state.confirm} />
                        <br></br>
                        <Button variant="contained" color="secondary" style={{ minWidth: '185px' }} onClick={this.resetpassword}>reset password</Button>
                        {/* password harus memiliki angka tanda baca dan panjangnya harus 8 karakter atau lebih */}
                    </div>
                </Box >
            </ div >
        );
    }
}

export default changepassword;