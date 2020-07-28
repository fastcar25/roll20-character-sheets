//includes
let nunjucks = require('nunjucks');
let sass = require('node-sass');
let fs = require('fs');
// env variables
let outHTML = "pathfinder2_gag.html";
let outCSS = "pathfinder2_gag.css";
let local = false;
let args = process.argv.slice(2);
const classRegexString = /(?<=class="[0-z\- _]*)\b(?!(attr_|roll_|repeating_|(?<!( |\")))[0-z\-]*)[0-z\-]+/gm;
const assetRegex = /img src=\"assets\//gm;
function classReplaceFunction(match){
  console.log(match);
  return `sheet-${match}`;
}
//We'll do something with this later
for(let arg of args){
  //console.log(arg);
  switch(arg){
    case "-?":
    case "-h":
    case "--help":
      console.log(`Usage: node compile_html.js [OPTION]
Compiles nunjucks and SASS into HTML and CSS for Roll20.

  -l, --local       Compile the code for local testing
                    Adds additional HTML and Roll20 like post processing.
  -h, --help        Displays this help text.
  -?                Alias for --help`);
      return;
    case "-l":
    case "--local":
      local = true;
      outHTML = "pathfinder2_gag_local.html";
      outCSS = "pathfinder2_gag_local.css";
      break;
    default:
      console.log(`Unrecognized flag "${arg}"`);
  }

}

//some regec I'm working on
//(?<=class="[0-z\- _]*)\b(?!(attr_|roll_|repeating_|(?<!( |\")))[0-z\-]*)[0-z\-]+

//nunjucks compile
let html = '';
if (local){
  html+="<!DOCTYPE html><html><head><link href=\"pathfinder2_gag_local.css\" rel=\"stylesheet\"></head><body>";
}
//nunjucks configuration. documentation found here https://mozilla.github.io/nunjucks/api.html
nunjucks.configure({
    autoexcape: true,
    trimBlocks: true,
    lstripBlocks: true,
    //may include watch:true later if I feel like putting more effort into this so.
});
html += nunjucks.render('src/PF2E.html');
if (local){
  html+="</body></html>";
  html=html.replace(classRegexString, classReplaceFunction);
}
else{
  html=html.replace(assetRegex, "img src=\"http://www.broadsidehd.com/paur/");
}

//reqork this to shwo erros maybe? someday...
fs.writeFile(outHTML, html,()=>{console.log('HTML compile complete.')});

//sass compile
let css = '';

css = sass.renderSync({
    file: "src/PF2E.scss"
  }).css;
  console.log(css);
fs.writeFile(outCSS, css,()=>{console.log('SASS compile complete.')});