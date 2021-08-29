import React from 'react';
import { Menu } from '../Elementos/elementos'
import './style.css';
import Switch  from 'react-switch';
import wave from './../waverotate.png'
import axios from 'axios'
import * as yup from 'yup'



class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cpf: "",
            nome:"" ,
            nasc: new Date(),
            cep:"",
            log: "",
            endNum: "",
            bairro : "",
            cidade : "",
            estado:"",
            email : "",
            prof : "",
            cel : "",
            tel : "",
            genero : "",
            rg : "",
            cnh : false,
            temCarro :false,
            viagem:false,
            disabled:true,
            cpfLabel:"CPF",
            cepDisabled:true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.schema = yup.object().shape({
            email:yup.string(),
            rg:yup.number(),
            nome:yup.string(),
            cpf:yup.number(),
            tel:yup.number(),
            cel:yup.number(),
            endNum:yup.number()
        });
        this.finalSchema = yup.object().shape({
            email:yup.string().email().required(),
            rg:yup.string().max(14).min(9),
            nome:yup.string().required(),
            cpf:yup.string().required().min(11).max(11),
            tel:yup.number().min(8),
            cel:yup.number().required().min(8),
            endNum:yup.number().required(),
            cep:yup.string().required().min(8).max(8),
            prof:yup.string().required(),
            nasc:yup.date().required()
        });
    };
    
    componentDidUpdate(prevProps,prevState){
        if (this.state.cpf !== prevState.cpf){
            if (this.state.cpf.length === 11){
                axios.post('https://gamadesafio.herokuapp.com/v1/CPF',{cpf:this.state.cpf}).then((response)=>{
                    if (response.status===200){
                        this.setState({
                            disabled:false,
                            cpfLabel:"CPF"
                        })
                    }
                }).catch((error)=>{this.setState({
                    disabled:true,
                    cpfLabel:"CPF:CPF não válido ou já Cadastrado"
                })}) 
            }
        }
        if (this.state.cep !==prevState.cep){
            if (this.state.cep.length === 8){
                axios.get(`https://viacep.com.br/ws/${this.state.cep}/json/`).then((response)=>{
                    const {logradouro , bairro, localidade, uf} = response.data;
                    this.setState({log:logradouro,bairro:bairro,cidade:localidade,estado:uf,cepDisabled:false})
                }).catch((error)=>console.log(error))
            }
        }
    }    
    async handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        const self = this;
        const validSchema = await this.schema.isValid({[name] : value});
        if (validSchema){
            self.setState({[name] : value});
        }else{
            if (value ===""){
                self.setState({[name] : value});  
            }else{
                window.alert("Entrada não válida");
            }
        }
    }

    handleSwitch(event,checked,id){
        this.setState({[id] : !this.state[id]});
    }

    async handleSubmit(){
        const isValidForm = await this.finalSchema.isValid(this.state);
        console.log(isValidForm);
        console.log(this.state);
        if (isValidForm){
            axios.post('https://gamadesafio.herokuapp.com/v1/save',this.state).then((response)=>{console.log(response);window.alert("Cadastro realizado")}).catch(
                (error)=>{
                    console.log(error);
                    window.alert("O usuário já foi cadastrado ou os dados não estão adequados")
                }
            )
        }else{
            window.alert("Campos obrigatórios não preenchidos")
        }
        
    }

    render(){
    return(
    <>
        <Menu />
        <form>
            <h2>Dados Pessoais</h2>
            <fieldset> 
                <div className="field">
                    <label htmlFor="cpf" required={true}>{this.state.cpfLabel}</label>    
                    <input type="text" name="cpf"  placeholder="Campo Obrigatório - Apenas Números" value={this.state.cpf} onChange={this.handleChange} maxLength="11" pattern="[0-9]*"/>
                </div>
                <div className="field">
                    <label htmlFor="nome">Nome</label>    
                    <input type="text"name="nome" placeholder="Nome Completo" disabled={this.state.disabled} value={this.state.nome} onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label htmlFor="rg">Identidade</label>    
                    <input type="text"name="rg" placeholder="RG - apenas números" disabled={this.state.disabled} value={this.state.rg} onChange={this.handleChange} maxLength="14"/>
                </div>
                <div className="field">                 
                    <label htmlFor="jobtitle">Cargo Pretendido</label>    
                    <input type="text" name="prof" placeholder="Campo Obrigatório" disabled={this.state.disabled} value={this.state.prof} onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label htmlFor="nasc">Data de Nascimento</label>    
                    <input type="date" name="nasc" disabled={this.state.disabled} value={this.state.nasc} onChange={this.handleChange} />
                </div>
                <div className="field">
                    <label htmlFor="gender">Gênero</label>    
                    <select value={this.state.genero} disabled={this.state.disabled} onChange={this.handleChange}>
                        <option selected value="Prefiro não declarar">Prefiro não declarar</option>
                        <option value="Mulher Cis">Mulher Cis</option>
                        <option value="Mulher trans">Mulher Trans</option>
                        <option value="Homem Cis">Homem Cis</option>
                        <option value="Homem trans">Homem Trans</option>
                        <option value="Não Binário">Não Binário</option>
                        <option value="Não Binário">Outro</option>
                    </select>
                </div>
            </fieldset>
            <h2>Informações de Contato</h2>
            <fieldset> 
                <div className="field">
                    <label htmlFor="email">E-mail</label>    
                    <input type="email" name="email" placeholder="Campo Obrigatório" disabled={this.state.disabled} value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label htmlFor="cel">Celular</label>    
                    <input type="tel" name="cel" placeholder="Campo Obrigatório" disabled={this.state.disabled} value={this.state.cel} onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label htmlFor="tel">Telefone Fixo</label>    
                    <input type="tel" name="tel" disabled={this.state.disabled} placeholder="Apenas Números" value={this.state.tel} onChange={this.handleChange}/>
                </div>
            </fieldset>
            <h2>Residência</h2>  
            <fieldset>
                <div className="field">
                    <label htmlFor="cep">CEP</label>    
                    <input type="text" disabled={this.state.disabled} placeholder="Campo Obrigatório Apenas Números" value={this.state.cep}  name="cep" onChange={this.handleChange} maxLength="8" />
                </div>
                <div className="field">
                    <label htmlFor="log">Logradouro</label>    
                    <input type="text"  value={this.state.log} disabled={true}  name="log"/>
                </div>
                <div className="field">
                    <label htmlFor="log">Numero</label>    
                    <input type="text"  value={this.state.endNum} disabled={this.state.cepDisabled} onChange={this.handleChange}  name="endNum"/>
                </div>
                <div className="field">
                    <label htmlFor="bairro">Bairro</label>    
                    <input type="text"  value={this.state.bairro} disabled={true} name="bairro"/>
                </div>
                <div className="field">
                    <label htmlFor="cidade">Cidade</label>    
                    <input type="text" value={this.state.cidade} disabled={true} name="cidade"/>
                </div>
                <div className="field">
                    <label htmlFor="estado">Estado</label>    
                    <input type="text"  value={this.state.estado} disabled={true} name="estado"/>
                </div>
            </fieldset>
            <h2>Transporte</h2>
            <fieldset>
                <div className="field field-switch">
                    <label htmlFor="car">Possui Veículo</label>    
                    <Switch className ="react-switch" onColor="#3B0057" id="temCarro" onChange={this.handleSwitch} checked={this.state.temCarro} disabled={this.state.disabled}/>
                </div>
                <div className="field field-switch">
                    <label htmlFor="cnh">Habilitação</label>    
                    <Switch className ="react-switch" onColor="#3B0057" id="cnh" onChange={this.handleSwitch} checked={this.state.cnh} disabled={this.state.disabled}  />
                </div>
                <div className="field field-switch">
                    <label htmlFor="viagem">Disponibilidade para Viajar</label>    
                    <Switch className ="react-switch" onColor="#3B0057" id="viagem" disabled={this.state.disabled} onChange={this.handleSwitch} checked={this.state.viagem}/>
                </div>
            </fieldset>
            <span className="btn" onClick={this.handleSubmit}>Enviar</span>
        </form>
        <img src={wave} alt="wave" className="wave"/>
    </>
    )}
}

export default Form;