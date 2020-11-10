// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email;
    };

    getName() {
        if(this.name === ""){
            console.log("Please enter a name.");
        } else {
            return this.name;
        }
    };

    getId() {
        if(this.id === ""){
            console.log("Please enter an ID.");
        } else {
            return this.id;
        }
    };

    getEmail() {
        if(this.email === ""){
            console.log("Please enter an email address.");
        } else {
            return this.email;
        }
    };

    getRole(){
        return "Employee";
    };
}

module.exports = Employee;