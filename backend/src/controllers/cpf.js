import User from '../models/user'

class UserCPF{

    async verify(req, res){

        console.log(req.body);
        const { cpf } = req.body;

        console.log(cpf);
        const cpfExists = await User.findOne({"cpf": cpf}).exec();
        console.log({"cpf": cpf});

        if (cpfExists){
            return res.status(400).json({
                error:'CPF já cadastrado'
            });
        };

        return res.status(200).json({
            message:'CPF disponível'
        }); 
    };
};

export default new UserCPF();