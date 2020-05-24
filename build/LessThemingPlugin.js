const { execSync } = require('child_process');
const path = require('path');

class LessThemingPlugin {
  
  constructor(config){

    if(typeof config === "undefined"){
      throw new Error("config not present");
    }
    
    if(typeof config.src !== "string" || config.src.trim() == ""){
      throw new Error("src should be a string and should not be empty");
    }

    if(typeof config.dist !== "string" || config.dist.trim() == ""){
      throw new Error("dist should be a string and should not be empty");
    }

    if(typeof config.exclude !== "undefined" && !Array.isArray(config.exclude)){
      throw new Error("exclude should be an array of strings");
    }
    
    let theme_list = execSync(`ls ${config.src}`);

    theme_list = theme_list.toString().trim().split('\n');
    if(typeof config.exclude !== "undefined" && config.exclude.length > 0){
      theme_list = theme_list.filter((theme) => config.exclude.includes(theme) ? false: true);
    }

    theme_list = theme_list.map((theme) => {
      return  {
        src: path.join(config.src,theme,'main.less'),
        dist: path.join(config.dist,theme,'main.css'),
      }
    });

    console.log(theme_list);

    this.themes = theme_list;
  }

  apply(compiler) {
    let theme_list = this.themes;
    compiler.hooks.done.tap('Compile Themes',(stats) => {
      for(let theme of theme_list){
        let lessCompile = execSync(`lessc ${theme.src} ${theme.dist}`);
      }
      return true;
    })
  }

}

module.exports = {LessThemingPlugin};