const inquirer = require('inquirer');
const fs = require("fs");
let jQuery;
let bootstrap;
let materialize;
let fa;

const generatedHTML = (response) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ${response.css ? "<link rel='stylesheet' href='./style.css'><!-- CSS -->" : ""}
    ${jQuery === true ? "<script src='https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'></script><!-- jQuery -->" : ""}
    ${fa === true ? "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'><!-- Font Awesome -->" : ""}
    ${bootstrap === true ? "<link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'><!-- Bootstrap -->" : ""}
    ${materialize === true ? "<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.css'><!-- Materialize -->" : ""}
    <title>${response.title}</title>
  </head>
  <body>
  
    ${response.js ? "<script type='text/javascript' src='./script.js'></script><!-- JavaScript -->" : ""}
    <small>"This file was created by github.com/kemaldemirgil"</small>
  </body>
  </html>`
}
console.log("-----------------> HTML GENERATOR <-----------------");
inquirer .prompt([
  {
    type: 'input',
    message: 'Please enter the Name of the file...',
    name: 'name',
    default: "index",
  },
  {
    type: 'input',
    message: 'Please enter the Title of the file...',
    name: 'title',
    default: "My Title",
  },
  {
    type: 'confirm',
    message: 'Do you want CSS linked to it?',
    name: 'css',
  },
  {
    type: 'confirm',
    message: 'Do you want JavaScript linked to it?',
    name: 'js',
  },
  {
    type: 'checkbox',
    message: 'Please select the libraries & frameworks for the file:',
    name: 'links',
    choices: [
    "JQuery", 
    "Bootstrap", 
    "Materialize", 
    "Font Awesome"]
  },
])

.then((response) => {
  if (response.css) {fs.writeFile("./generated-files/" + "style.css", "", (err) => err ? console.log(err) : console.log(`\nCSS Generated`));}
  if (response.js) {fs.writeFile("./generated-files/" + "script.js", "", (err) => err ? console.log(err) : console.log('JS Generated'));}
  if (response.links.includes("JQuery")) { jQuery = true;}
  if (response.links.includes("Bootstrap")) { bootstrap = true;}
  if (response.links.includes("Materialize")) { materialize = true;}
  if (response.links.includes("Font Awesome")) { fa = true;}
  const filename = `${response.name.toLowerCase().split(' ').join('')}.html`;
  const template = generatedHTML(response);
  fs.writeFile("./generated-files/" + filename, template, (err) => err ? console.log(err) : console.log(`HTML Generated \n\n\nThanks for using the HTML GENERATOR created by github.com/kemaldemirgil`));
});