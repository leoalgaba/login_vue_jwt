import * as yup from 'yup'

yup.setLocale({
    mixed: {
        required: 'Este campo es requerido'
    },
    string: {
        email: 'Este campo debe ser un email válido',
        min: 'Este campo debe tener al menos ${min} caracteres',
    }
})

export const schema = yup.object().shape({
    
    name: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
    repeatPassword: yup.string().required().oneOf([yup.ref('password')],
        'Las contraseñas no coinciden')

})
