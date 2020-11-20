import React, { Component } from 'react';
import Axios from 'axios'
import { mongoapi } from "../helper/url"
import { connect } from "react-redux"
import Button from '@material-ui/core/Button';
import { kirimid } from '../redux/action'

class GameDetails extends Component {
    state = { data: [] }

    componentDidMount() {
        console.log(this.props.game);
        Axios.get(mongoapi + 'game/' + this.props.game)
            .then((res) => {
                this.setState({ data: res.data[0] })
            })
    }

    addtocart = async () => {
        let username = localStorage.getItem('username');
        let namagame = this.state.data.nama
        let harga = this.state.data.harga
        // let idgame = this.props.game
        try {
            let verifikasi = await Axios.get(mongoapi + 'cart/' + username)
            if(username == null){
                alert('silahkan login dulu ')
            }
            else {
                verifikasi.data.map(val => (val.namagame))
                let response = await Axios.post(mongoapi + 'cart', {
                    username,
                    namagame,
                    harga
            })
            alert('game has been added to cart ')
            console.log(verifikasi.data);
        }
        }
        catch (err) {
            console.log(err);
            console.log(username);
            console.log(namagame);
            console.log(harga);
        }
    }

    open = () => {
        { window.open('https://store.steampowered.com/app/' + this.state.data.steamid) }
    }

    render() {
        console.log(this.props.game.id);
        let { data } = this.state
        console.log(data);
        return (
            <div className='container full-height'>
                <div className='row'>
                    <div>
                        <img src={data.gambar} alt='display poster' />
                    </div>
                    <div className='col-8'>
                        <div className='vertical-spacing'>
                            <h2>
                                {data.nama}
                            </h2>
                        </div>
                        <div className='vertical-spacing'>
                            developers:
                            {data.developers}
                        </div>
                        <div className='vertical-spacing'>
                            publishers:
                            {data.publishers}
                        </div>
                        <div className='vertical-spacing'>
                            genres
                            {data.genres}
                        </div>
                        <div dangerouslySetInnerHTML={{
                            __html: `${data.description}`
                        }} />
                        <div className='vertical-spacing'>
                            Price :
                            Rp {data.harga}
                        </div>
                        <a onClick={() => { this.open() }} >
                            click here to view the game on steam
                        </a>
                        <br />
                        <Button color='danger' className='btn-custom' onClick={this.addtocart}>Add to Cart</Button>
                    </div>
                </div>
            </div >
        );
    }
}

const mapStatetoProps = ({ game }) => {
    return { game }
}

export default connect(mapStatetoProps, { kirimid })(GameDetails)