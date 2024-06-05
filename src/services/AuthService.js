export default class AuthService {
    constructor() {
        this.users = [
            {
                "email": 'cucharoth@cucha.com',
                "password": '123456',
                "userName": 'Cucharoth'
            },
            {
                "email": 'elnico@nico.com',
                "password": '123456',
                "userName": 'Elnico'
            }
        ]
    }

    checkUserValido(email, password) {
        var currentUser = this.users.filter(user => user.email === email && user.password === password);
        if (currentUser.length === 0) {
            return null;
        }
        return new CurrentUser(currentUser[0].userName);
    }
}
export class CurrentUser {
    constructor(userName) {
        this.userName = userName;
    }
}


