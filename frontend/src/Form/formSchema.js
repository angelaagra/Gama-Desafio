import * as yup from 'yup';

let schema =yup.object().shape({
    email:yup.string().email(),
    nome:yup.string().nome(),
    cpf:yup.number(),
    tel:yup.number(),
    cel:yup.number,
    endNum:yup.number()
})

export default schema;