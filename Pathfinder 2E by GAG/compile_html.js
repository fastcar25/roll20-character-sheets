let nunjucks = require('nunjucks');
let sass = require('node-sass');
let fs = require('fs');

//nunjucks compile
let html = '';
//nunjucks configuration. documentation found here https://mozilla.github.io/nunjucks/api.html
nunjucks.configure({
    autoexcape: true,
    trimBlocks: true,
    lstripBlocks: true,
    //may include watch:true later if I feel like putting more effort into this so.
});
html = nunjucks.render('src/PF2E.html');

//reqork this to shwo erros maybe? someday...
fs.writeFile('pathfinder2_gag.html', html,()=>{console.log('HTML compile complete.')});

//sass compile
let css = '';

css = sass.renderSync({
    file: "src/PF2E.scss"
  }).css;
  console.log(css);
fs.writeFile('pathfinder2_gag.css', css,()=>{console.log('SASS compile complete.')});