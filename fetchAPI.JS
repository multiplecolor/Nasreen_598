// function getSources(){
//     fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=4179b0aaa9b243f6a2cae4686a986c39')
//     .then(resolve=>{
//         if(!resolve.ok){
//             throw new Error("unable to retreive the sources")
//         }
//         return resolve.json();
//     })
//     .then(data=>{
//         console.log(data);
//     })
//     .catch(error=>{
//         console.log(error);
//     })
//     .finally(console.log("GET request to NewsAPI"))
//}
async function getSources(){
    try{
    const sources = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=4179b0aaa9b243f6a2cae4686a986c39');
    const data = await sources.json();
    console.log(data);
    }
    catch(error){
        console.log(error);
    }

}
getSources();

// fetch('url',{
//     method: 'OPTIONS',
    
// })
