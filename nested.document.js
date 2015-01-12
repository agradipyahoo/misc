/**
 * Created by agradip.sarkar on 12/01/15.
 */

function findDocumentWrite(str){
    var regex = /^(document\.write\()([\s\S\w]*)(\);|\))$/gm;
    var matched = regex.exec(str),scriptText='',documentText = '';
    if(Array.isArray(matched)){
        documentText = matched[2];
        if(isScriptExist(documentText)){
            scriptText = checkScript(documentText);
            if(scriptText.valid){
                return findDocumentWrite(scriptText.text);
            }
            else{
                return {valid:false};
            }
        }
        else{ // check excute the string
            //document.write(documentText);
            return {valid:true,text:documentText};
        }
    }
    else{
        return {valid:false}
    }

}

function isScriptExist(str){
    var scriptRegex = /^(\'?\"*<script\b[^>]*>)/;
    return scriptRegex.test(str);
}

function checkScript(str){
    var regex = /<script\b[^>]*>([\s\S\w]*)<\/script>/gm;
    var matched = regex.exec(str);
    if(Array.isArray(matched)){
        return {valid:true,text:matched[1]};
    }
    return {valid:false};
}

function checkValidInput(value){
    var validation={},valid, regex = /^(document\.write\()[\s\S]*\)$/gm;
    if(typeof value !=='string'){
        validation = {valid:false};
    }
    else{
        valid = regex.test(value); // top level document write is must
        validation = {valid:valid};
        if(valid){
            validation = findDocumentWrite(value);
        }
    }

    return validation;
}
