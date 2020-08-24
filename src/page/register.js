import React, { Component } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Axios from "axios"
import { mongoapi } from '../helper/url'
import { Redirect } from "react-router-dom";
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            confirm: "",
            char: false,
            num: false,
            border: false,
            cart: [],
            edirect: false,
            spec: false,
            huruf: false,
            gede: false,
            aaa: false
        }
    }

    onChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    cekpassword = (event) => {
        let pass = event.target.value
        let gede = /[A-Z]/
        let num = /[0-9]/
        let spec = /[!@#$%^&*;]/

        this.setState({
            [event.target.name]: event.target.value,
            num: num.test(pass),
            spec: spec.test(pass),
            char: pass.length > 8,
            border: (num.test(pass) && (pass.length > 8)),
            huruf: gede.test(pass),
        },
            console.log(event.target.value)
        )
    }

    tes = (event) => {
        let pass = event.target.value
        let at = /[@]/
        let dot = /[.]/
        this.setState({
            [event.target.name]: event.target.value,
            aaa: (at.test(pass) && dot.test(pass))
        })
    }

    registerUser = () => {
        let { char, num, username, password, confirm, email, spec, border, huruf, aaa } = this.state
        console.log(aaa);
        if (password !== confirm) {
            alert('pastikan password dan confirm password sama')
        }
        else if (username === '' || password === '' || confirm === '' || email === '') {
            alert('please Fill in all the forms')
        }
        else if (char === false) {
            alert('panjang password minimal 8')
        }
        else if (border === false) {
            alert('panjang password minimal 8 dan harus memiliki angka')
        }
        else if (spec === false) {
            alert('password butuh non alphanumeric')
        }
        else if (huruf === false) {
            alert('password harus ada huruf besar')
        }
        else if (aaa === false) {
            alert('wrong email format')
        }
        else {
            Axios.post(mongoapi + 'register', {
                username,
                email,
                password
            }).catch((err) => {
                var error = JSON.stringify(err.response.data.message);
                console.log(err.response.data);
                alert(error)
            })
                .then((res) => {
                    if (res === undefined) {
                        console.log('no response');
                    }
                    else {
                        alert('registration sucessful')
                        this.setState({ edirect: true })
                    }
                })
        }
    }

    render() {
        if (this.state.edirect) {
            return <Redirect to='/login' />
        }
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
                        <TextField id="standard-basic" label="Username" name="username" onChange={this.onChange} value={this.state.username} />
                        <br></br>
                        <TextField id="standard-basic" label="Email" name="email" onChange={this.tes} value={this.state.email} />
                        <br></br>
                        <TextField id="standard-password-input" label="Password" type="password" onChange={this.cekpassword} name="password" value={this.state.password} />
                        <br></br>
                        <TextField id="standard-password-input" label="confirm password" type="password" name="confirm" onChange={this.onChange} value={this.state.confirm} />
                        <br></br>
                        <Button variant="contained" color="secondary" style={{ minWidth: '185px' }} onClick={this.registerUser}>Register</Button>
                        {/* password harus memiliki angka tanda baca dan panjangnya harus 8 karakter atau lebih */}
                    </div>
                </Box >
            </ div >
        )
    }
}

export default Register