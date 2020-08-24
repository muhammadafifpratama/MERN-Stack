import React, { Component } from 'react';
import Kartu from "../component/contoh"
import Axios from 'axios'
import { mongoapi } from '../helper/url'
import Kartudulu from "../component/card"
import Grid from '@material-ui/core/Grid';

class home extends Component {
    state = { dari: 0, toprow: [], middlerow: [], bottomrow: [] }

    componentDidMount() {
        let mulai = this.state.dari
        let top = []
        let middle = []
        let bottom = []
        Axios.get(mongoapi, {
            mulai
        })
            .then((res) => {
                if (res === undefined) {
                    console.log('no response');
                }
                else {
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
        console.log(this.state.toprow);
        return (
            <div style={{ padding: 100 }}>
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
                {/* halo {username} */}
            </div>
        );
    }
}



export default home;