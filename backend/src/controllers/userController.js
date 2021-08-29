import User from '../models/user'

class UserController{
    
    async store(req,res){
        
        const user = new User();
        user.cpf = req.body.cpf;
        user.nome  = req.body.nome;
        user.nasc = req.body.nasc;
        user.cep = req.body.cep;
        user.log = req.body.log;
        user.endNum = req.body.endNum;
        user.bairro = req.body.bairro;
        user.cidade = req.body.cidade;
        user.estado = req.body.estado;
        user.pais = req.body.pais;
        user.email = req.body.email;
        user.prof = req.body.prof;
        user.cel = req.body.cel;
        user.tel = req.body.tel;
        user.genero = req.body.genero;
        user.rg = req.body.rg;
        user.cnh = req.body.cnh;
        user.temCarro = req.body.temCarro;
        user.viagem=req.body.viagem;
        
        user.save((er)=>{
            if (er){
                return res.status(500).json({
                    error:'Dados não adequados'
                }); 
            };
            return (res.status(200).json({
                message: "Usuário Cadastrado"
            }));
        });
    };
};

export default new UserController();

