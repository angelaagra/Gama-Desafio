import React  from "react";
import { Link } from "react-router-dom";
// import styled from "styled-components";
import './style.css';
import wave from './../wave.png'


class Menu extends React.Component{
    
    constructor(props){
        super(props);
        this.state ={status:true};
        this.handleClick = this.handleClick.bind(this);
    };

    handleClick(){
        this.setState({status:!this.state.status});
    };
    render(){
        let menu;
        if (this.state.status){
            menu=(<div className="ExternalMenu">
            <Title />
            <div onClick={this.handleClick}><MenuIcon status={this.state.status}/></div>
            </div>);
            document.body.style.overflow = "scroll";

        }else{
            menu=<>
            <img className="waveMenu" src={wave} alt='wave'/> 
            <div className="InternalMenu">         
            <Title />
            <div className="itens">       
            <MenuItens status={this.state.status}/>
            <div onClick={this.handleClick}><CloseIcon status={this.state.status}/></div>        
            </div>
            </div> 
            </>
            window.scrollTo(0, 0);
            if (window.matchMedia("(min-width: 800px)").matches) {
                /* a viewport tem pelo menos 400 pixels de largura */
                document.body.style.overflow = "scroll";
            }else{
                document.body.style.overflow = "hidden";
            }
        }
        return(
            menu
    );};
};

function MenuItens(props){
    const menuItensDisplay = (
        <nav>
        <ul className="Ul">
            <li><Link to="/">Home</Link></li>
            <li><Link to ="/bancodecurriculos" >Vagas Disponíveis</Link></li>
            <li><Link to="/contato">Contato</Link></li>
        </ul>
        </nav>
    );
    
    if (props.status){
        return null;
    };

    return(menuItensDisplay);
};
function Title(props){
    
    const ptitle = <h1 className='title'>
        <span>Jobs</span>
        <span style={{color:"#FFFFFF"}}>Net</span>
        </h1>;

    return(
       ptitle
    );
};
function Button(props){
    return(<Link to="/bancodecurriculos" className="btn">{props.value}</Link>);
};

function MenuIcon(props){
    const menu = <span  className="material-icons">menu</span>
    if (props.status){
        return menu;
    }
    return null;
};
function CloseIcon(props){
    const xIcon = <span  className="material-icons">close</span>
    if (!props.status){
        return xIcon;
    }
    return null;
};

export {Button, Menu , Title}



