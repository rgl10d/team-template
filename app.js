const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// All inquirer questions
const newMemberQuestion = [
    {
        type: "list",
        message: "Select a type of employee to add.",
        choices: ["Manager", "Engineer", "Intern", "Finish and create team page"],
        name: "newMember"
    }
];

const employeeQuestions = [
    {
        type: "input",
        message: "What is the employee's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the employee's ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email"
    },
];

const managerQuestion = [
    {
        type: "input",
        message: "What is manager's office number?",
        name: "officeNumber"
    }
];

const engineerQuestion = [
    {
        type: "input",
        message: "What is the engineer's GitHub URL?",
        name: "github"
    }
];

const internQuestion = [
    {
        type: "input",
        message: "What school does the intern attend?",
        name: "school"
    }
];


const newMember = () => {
    // Asks question for type of employee
    inquirer.prompt(newMemberQuestion).then((answer) => {
        // Runs a specific function based on answer to previous question
        if(answer.newMember === "Manager"){
            addManager();
        } else if (answer.newMember === "Engineer"){
            addEngineer();
        } else if (answer.newMember === "Intern"){
            addIntern();
        } else {
            // Ends the loop and writes to an HTML page
            fs.writeFile(outputPath, render(employees), (err) => {
                if (err) throw err;
                console.log('Team page created!');
            });
        }
    });
}

const addManager = () => {
    // Ask general employee questions first
    inquirer.prompt(employeeQuestions).then((employeeAnswers) => {
        // Ask manager specifc question
        inquirer.prompt(managerQuestion).then((managerAnswer) => {
            // Runs answers through Manager constructor and pushes them to the employee array
            const manager = new Manager(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, managerAnswer.officeNumber);
            employees.push(manager);
            newMember();
        });
    });
}

const addEngineer = () => {
    // Ask general employee questions first
    inquirer.prompt(employeeQuestions).then((employeeAnswers) => {
        // Ask engineer specifc question
        inquirer.prompt(engineerQuestion).then((engineerAnswer) => {
            // Runs answers through Engineer constructor and pushes them to the employee array
            const engineer = new Engineer(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, engineerAnswer.github);
            employees.push(engineer);
            newMember();
        });
    });
}

const addIntern = () => {
    // Ask general employee questions first
    inquirer.prompt(employeeQuestions).then((employeeAnswers) => {
        // Ask intern specifc question
        inquirer.prompt(internQuestion).then((internAnswer) => {
            // Runs answers through Intern constructor and pushes them to the employee array
            const intern = new Intern(employeeAnswers.name, employeeAnswers.id, employeeAnswers.email, internAnswer.school);
            employees.push(intern);
            newMember();
        });
    });
}


// Starts the app
newMember();