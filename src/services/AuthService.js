export default class AuthService {
    constructor() {
        this.users = [
            {
                "email": 'cucharoth@cucha.com',
                "password": '123456'
            },
            {
                "email": 'elnico@nico.com',
                "password": '123456'
            }
        ]
    }

    checkUserValido(email, password) {
        var valid = this.users.some(user => user.email === email && user.password === password);
        return valid;
    }
}


