import React, { Component } from 'react';
import Axios from 'axios'
import { mongoapi } from "../helper/url"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Button } from '@material-ui/core';


class cart extends Component {
    state = { data: [], totalharga: 0, redirect: false }
    componentDidMount() {
        let username = localStorage.getItem('username');
        Axios.get(mongoapi + 'cart/' + username)
            .then((res) => {
                var i = 0;
                var j = 0
                for (i = 0; i < res.data.length; i++) {
                    j += res.data[i].harga;
                }
                this.setState({ data: res.data, totalharga: j })
                console.log(j);
            })
    }

    deletecart = () => {
        console.log(this.state.data[0]._id);
    }

    render() {
        console.log(this.state.data);
        return (
            < div >
                <TableContainer component={Paper}>
                    <Table aria-label="spanning table">
                        <TableBody>
                            {this.state.data.map(row => (
                                <TableRow key={row.idcart}>
                                    <TableCell>{row.namagame}</TableCell>
                                    <TableCell align="right">Rp. {row.harga.toLocaleString()}</TableCell>
                                    <IconButton aria-label="delete" onClick={() => { this.deletecart(row.idcart) }}> <DeleteIcon /></IconButton>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell >Subtotal </TableCell>
                                <Button onClick={() => { this.inventory() }}>
                                    confirm purchases
                        </Button>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div >
        );
    }
}

export default cart;