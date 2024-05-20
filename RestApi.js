import { AnalyzeText } from "./TextAnalyzer.js";

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("simpleForm");
    const editableTexarea = document.getElementById("ETextA");
    const notEditableTextarea = document.getElementById("NETextA");
    form.addEventListener('submit',async function(){
        if(editableTexarea.value.trim()){
            notEditableTextarea.value = notEditableTextarea.value + "USER:"  + editableTexarea.value.trim() + '\n';
            const result = await AnalyzeText(editableTexarea.value.trim());
            if(!result){
                alert("Argomento Errato");
            }else{
                alert("Richiesta a ChatGPT");
            }
        }
    });
});