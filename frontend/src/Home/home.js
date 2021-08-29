import React from 'react';
import { Menu , Button, Title} from '../Elementos/elementos'
import './style.css';
import wave from './../waverotate.png';


function Home(){


    return(
        <div className="home">
        <Menu />
        <div className="homeContent">
            <Title name="Menu"/>
            <h2 className="Slogan">Candidate-se a nossas vagas</h2>
            <Button value="Banco de Currículos"/>
        </div>
        <img src={wave} alt="wave" className="homeWave"/>
        </div>
    );
};

export default Home;