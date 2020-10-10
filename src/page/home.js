import React, { Component } from 'react';
import Kartu from "../component/card"
import Axios from 'axios'
import { mongoapi } from "../helper/url"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './home.css';

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};
class Home extends Component {
    state = { under45: [], under90: [], notgame: [] }
    async componentDidMount() {
        const under45 = await Axios.get(mongoapi + "murah")
        const under90 = await Axios.get(mongoapi + "mahal")
        const notgame = await Axios.get(mongoapi + "tipe")
        this.setState({ under45: under45.data, under90: under90.data, notgame: notgame.data })
        console.log(under45.data);
    }

    renderunder45 = () => {
        return this.state.under45.map((val) => {
            return (
                <Kartu nama={val.nama} image={val.gambar} harga={val.harga} kucing={val.id}>  </Kartu>
            )
        })
    }

    renderunder90 = () => {
        return this.state.under90.map((val) => {
            return (
                <Kartu nama={val.nama} image={val.gambar} harga={val.harga} kucing={val.id}> </Kartu>
            )
        })
    }

    notgamerender = () => {
        return this.state.notgame.map((val) => {
            return (
                <Kartu nama={val.nama} image={val.gambar} harga={val.harga} kucing={val.id}> </Kartu>
            )
        })
    }

    render() {
        console.log(this.state.under45);
        return (
            <div>
                <div style={{ padding: 20 }}>
                    <p id="text">GAMES UNDER RP 45 000</p>
                    <Carousel responsive={responsive}>
                        {this.renderunder45()}
                    </Carousel>
                </div>
                <div style={{ paddingLeft: 20 }}>
                    <p id="text">GAMES UNDER RP 90 000</p>
                    <Carousel responsive={responsive}>
                        {this.renderunder90()}
                    </Carousel>
                </div>
                <div style={{ paddingLeft: 20 }}>
                    <p id="text">downloadable content</p>
                    <Carousel responsive={responsive}>
                        {this.notgamerender()}
                    </Carousel>
                </div>
            </div>
        );
    }
}

export default Home;