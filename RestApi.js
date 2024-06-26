import { AnalyzeText } from "./TextAnalyzer.js";
import { AskToChatGPT } from "./ChatgptReq.js";

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
                const GPTResponse = await AskToChatGPT(editableTexarea.value.trim());
                notEditableTextarea.value = notEditableTextarea.value + "AI:"  + GPTResponse.trim() + '\n';
                console.log(GPTResponse);
            }
        }
    });
});