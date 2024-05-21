const MyApiKey = "6830364c58ae6dfcc3eed064b22fc5c33316e80ce4ba08fdaed8562b";
const email = "jepap11724@cgbird.com"
const psw = "7X6qV$ncfQp9!Kc"
const myserver = 'http://localhost:8080/'
const endpoint = 'https://api.textrazor.com'

/*export async function AnalyzeText(inserted_text){
    try{
        const response = await fetch(myserver+'https://api.textrazor.com',{
            method: 'POST',
            headers: {
                'x-textrazor-key': MyApiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'extractors': 'entities,entailments,topics',//topics
                'classifiers': 'textrazor_mediatopics',
                'text': inserted_text
              }).toString()
        });
        if(response.ok){
            const data = await response.json();
            console.log(data.response)
            console.log(data.response.topics)
        }else{
            console.log("Errore");
        }
    }catch(error){
        console.log(error);
    }
}*/


export async function AnalyzeText(inserted_text) {
    try {
        const response = await fetch(myserver+endpoint, {
            method: 'POST',
            headers: {
                'x-textrazor-key': MyApiKey,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'extractors': 'topics',
                'text': inserted_text
            }).toString()
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data.response);
            const label = data.response.topics[0]['label'];
            const score = data.response.topics[0]['score'];
            if(label === "Pizza" && score > 0.80){
                return true;
            }else{
                return false;
            }
        } else {
            console.log("Errore");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}