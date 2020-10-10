import React, { Component } from 'react';
import Kartu from "../component/contoh"
import Axios from 'axios'
import { mongoapi } from '../helper/url'
import Kartudulu from "../component/card"
import Grid from '@material-ui/core/Grid';
import { Button, ThemeProvider } from '@material-ui/core';

let top = []
let middle = []
let bottom = []
class home extends Component {
    state = { dari: 0, toprow: [], middlerow: [], bottomrow: [] }

    componentDidMount() {
        this.tes(this.state.dari)
    }

    componentDidUpdate() {
        // this.tes(this.state.dari)
    }

    tes = () => {
        let ofset = this.state.dari
        Axios.get(mongoapi, {
            ofset
        })
            .then((res) => {
                if (res === undefined) {
                    console.log('no response');
                }
                else {
                    console.log(ofset);
                    console.log(res.data);
                    for (var i = 0; i < 3; i++) {
                        top.push(res.data[i])
                    }
                    for (var i = 3; i < 6; i++) {
                        middle.push(res.data[i])
                    }
                    for (var i = 6; i < 9; i++) {
                        bottom.push(res.data[i])
                    }
                    this.setState({ toprow: top, middlerow: middle, bottomrow: bottom })
                }
            })
    }

    next = () => {
        this.setState({ dari: this.state.dari + 9 })
        console.log(this.state.dari);
    }

    prev = () => {
        let ofset = this.state.dari
        if (ofset < 1) {
            console.log("halaman pertama");
        }
        else {
            this.setState({ dari: ofset - 9 })
        }
    }

    // renderpage = (ofset) => {
    //     console.log("bener " + ofset);
    // }

    // nextpage = (mulai) => {
    //     var ofset = "kenapaaa"
    //     this.renderpage(ofset)
    // }

    rendertoprow = () => {
        return this.state.toprow.map((val) => {
            return (
                <Kartudulu nama={val.nama} image={val.gambar} harga={val.harga} />
            )
        })
    }
    rendermiddlerow = () => {
        return this.state.middlerow.map((val) => {
            return (
                <Kartudulu nama={val.nama} image={val.gambar} harga={val.harga} />
            )
        })
    }
    renderbottomrow = () => {
        return this.state.bottomrow.map((val) => {
            return (
                <Kartudulu nama={val.nama} image={val.gambar} harga={val.harga} />
            )
        })
    }

    render() {
        var username = localStorage.getItem('username');
        var { top, mid, bot } = this.state
        console.log(top + mid + bot);
        return (
            <div style={{ padding: 100, paddingTop: 25 }}>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        {this.rendertoprow()}
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        {this.rendermiddlerow()}
                    </Grid>
                    <Grid container item xs={12} spacing={3}>
                        {this.renderbottomrow()}
                    </Grid>
                </Grid>
                <div style={{ paddingTop: 50 }}>
                    <center>
                        <Button onClick={() => { this.prev() }}>
                            previous page
                        </Button>
                        <Button onClick={() => { this.next() }}>
                            next page
                        </Button>
                    </center>
                </div>
            </div>
        );
    }
}



export default home;