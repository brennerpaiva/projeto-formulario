class Form {
    method = 'GET';
    items = [];

    constructor(container, method, action) {
        this.container = document.querySelector(container)
        this.method = method;
        this.action = action;
    }

    addItem(item) {
        this.items.push(item);
    }
    
    render() {
        let formElement =  document.createElement('form')
        formElement.setAttribute('method', this.method);
        formElement.setAttribute('action', this.action);

        for(let i in this.items) {
            this.items[i].render(formElement);
        }

        this.container.appendChild(formElement)
    }

}

class Input {
    
    _type = "text"
    required = false; 

    constructor(name, label) {
        this.name = name;
        this.label = label;
    }

    get type() {
        return this._type;
    }

    set type(t) {
        if(['text', 'password','email', 'submit'].includes(t)) {
            this._type = t;
        } else {
            throw new Error(`Input "${t}" doesnt exist.`)
        }
    }

    render(formElement) {
        let el = document.createElement('Input');
        el.type = this.type;
        el.name = this.name;
        el.placeholder = this.label;
        el.required = this.required;
        formElement.appendChild(el);
    }
}

class Button extends Input {
    constructor(label) {
        super('', label);
        this.type = 'submit';
    }

    render(formElement) {
        let el = document.createElement('input');
        el.type = this.type;
        el.value = this.label;
        formElement.appendChild(el);
    }
}

//Implementação

//Formulario
let form =  new Form('.formArea', 'POST', 'hhtps://google.com.br')

//Email
let email = new Input("email", "digite seu email")
email.type = 'email';
email.required = true;
form.addItem(email)

//Senha 
let password =  new Input("password", "digite sua senha")
password.type = "password";
form.addItem(password)

//Botão
let button =  new Button("enviar")
form.addItem(button)

console.log(form.items)

form.render()