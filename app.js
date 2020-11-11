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
            console.log(employees);
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
            // Merges the two answer sets into one object
            Object.assign(employeeAnswers, managerAnswer)
            employees.push(employeeAnswers);
            newMember();
        });
    });
}

const addEngineer = () => {
    // Ask general employee questions first
    inquirer.prompt(employeeQuestions).then((employeeAnswers) => {
        // Ask engineer specifc question
        inquirer.prompt(engineerQuestion).then((engineerAnswer) => {
            // Merges the two answer sets into one object
            Object.assign(employeeAnswers, engineerAnswer)
            employees.push(employeeAnswers);
            newMember();
        });
    });
}

const addIntern = () => {
    // Ask general employee questions first
    inquirer.prompt(employeeQuestions).then((employeeAnswers) => {
        // Ask intern specifc question
        inquirer.prompt(internQuestion).then((internAnswer) => {
            // Merges the two answer sets into one object
            Object.assign(employeeAnswers, internAnswer)
            employees.push(employeeAnswers);
            newMember();
        });
    });
}


// Starts the app
newMember();