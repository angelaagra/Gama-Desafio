import { Menu , Title} from '../Elementos/elementos'
import './contato.css'
import wave from './../waverotate.png';


export default function Contato(){
    return(
        <>
        <Menu />
        <div className="contato">
            <Title className="title"/>
            <ul>
                <li>Rua LoremIpsom</li>
                <li>Cidade-Estado </li>
                <li>(@@)@@@@@-@@@@</li>
                <li>(@@)@@@@@@-@@@@</li>
                <li>email@email.com</li>
            </ul>
        </div>
        <img src={wave} alt="wave" className="contactWave"/>
        </>
    );
}