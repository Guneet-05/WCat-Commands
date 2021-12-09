/*****************************************WCAT COMMANDS****************************************/

/* This project implements some commands that helps to read, write and modify some files.
Command 1: (wcat <filePath>) This commands displays the content of the file on the console
Command 2: (wcat <filePath1> <filePath2>....) This command displays the contents of all the given files one after the other. The contents of different files are seperated by a new line
Command 3: (wcat -s <filePath>) This command converts big line breaks into a single line break
Command 4: (wcat -n <filePath>) This command gives numbering to all the lines
Command 5: (wcat -b <filePath>) This command gives numbering only to the non-empty lines
Command 6: (wcat file1Path > file2Path) Overrides the content of the filePath2 and replaces it with the contents of filePath1 if filePath2 already exists otherwise it creates filePath2 and copies the content from filePath1
Command 9: (wcat filePath1 >> filePath2) appends al the content of filePath1 to filePath2 and creates filePath2 if it does not already exists
Miscellaneous Commands: These are a combination of two or more than 2 of the above commands
  -> For instance: wcat -s filePath 1 > filePath2 
     This command will remove the big line breaks from filePath1 and then copy it to filePath 2
     
     ** Important ** = The order in which the commands are given does not matter.
     For instance: wcat -s -n <filePath> or wcat -n -s <filePath> pr wcat <filePath> -s -n will perform the same task. 
    
     The -n and -b commands cannot be run together.
*/

const fs = require('fs')
let inputArr = process.argv.slice(2)

//seperate commands and files

let commandsArr = [] 
let filesArr = []

//commands start with a hyphen (-)
for(let i=0;i<inputArr.length;i++) {
    if(inputArr[i].startsWith("-")) {
        commandsArr.push(inputArr[i])
    } else {
        filesArr.push(inputArr[i])
    }
}

//check whether all the filePaths entered are valid or not

for(let i=0;i<filesArr.length;i++) {
   let fileExists = fs.existsSync(filesArr[i])
   if(fileExists == false) {
       console.log('The file ' + filesArr[i] +' does not exist. Please enter a valid file path')
       return
   }
}

//both -b and -n cannot be present together
let areBothPresent = commandsArr.includes('-b') && commandsArr.includes('-n') 

if(areBothPresent) {
   console.log('Both the commands -n and -b should not be present. Enter another command with either one of them')
   return; 
}

//Implementing the reading commands

let content = ""
for(let i=0;i<filesArr.length;i++) {
    let bufferContent = fs.readFileSync(filesArr[i])
    content += bufferContent + "\r\n"
}

//Implementing the -s command
let contentArr = content.split("\r\n")

let doesSExist = commandsArr.includes("-s")

if(doesSExist) {
    for(let i=1;i<contentArr.length;i++) {
        if(contentArr[i] == "" && contentArr[i-1] == "") {
             contentArr[i] = null
        } else if(contentArr[i] == "" && contentArr[i-1] == null) {
            contentArr[i] = null
        }
    }

    let sContentArr = []

    for(let i=0;i<contentArr.length;i++) {
        if(contentArr[i] !== null) {
            sContentArr.push(contentArr[i])
        }
    }

    contentArr = sContentArr
}

console.log(contentArr.join('\n'))






