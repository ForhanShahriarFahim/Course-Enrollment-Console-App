const fs = require("fs");

const scaffold = {};

scaffold.loadData = function (){
    try{
        const jsonString = fs.readFileSync("../Database/database.json");
        return JSON.parse(jsonString);
    }catch (error){
        console.log("Error: ",error);
    }
};

scaffold.saveData = function (data){
    try{
        const jsonString = JSON.stringify(data);
        fs.writeFileSync("../Database/database.json", jsonString);

    }catch (error){
        console.log("Error: ",error)
    }
};
module.exports = scaffold;
