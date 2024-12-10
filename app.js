// on clicking open the file to upload image
let innerUploadImage=document.querySelector(".inner-image");
let input=innerUploadImage.querySelector("input")
let image=document.querySelector("#image")
let loading=document.querySelector("#loading")
let btn=document.querySelector("button")
let text=document.querySelector("#text")
let output=document.querySelector(".output")


//using google gemini api to generate text from image
const Api_key="https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDtZJb3uAe_B57tHm6jgSq_QqNEqxdYaqs"

//adding files of input image
 let fileDetails={
    mime_type:null,
    data:null
 }
 //fetching api data
 async function generateResponse() {
    const RequestOption={
       method:"POST",
       header:{"Content-type":"application/json"},
       body:JSON.stringify({ 
        "contents": [{
        "parts":[
          {"text": "Solve the mathematical problem with proper steps of solution"},
          {
            "inline_data": {
              "mime_type":fileDetails.mime_type,
              "data": fileDetails.data
            }
          }
        ]
      }
    ]
}
)
            
        
    }
//try block is basically used when our API response good 
    try{
         // create funtion for api request
     let response=await fetch(Api_key,RequestOption)
     let data=await response.json()
   //   console.log(data)
   let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
   // console.log(apiResponse);
    text.innerHTML=apiResponse
    output.style.display="block"
   
    }
// catch is basically is used when our API is not responding
    catch(e){
        console.log(e);
        }
        finally{
           loading.style.display="none"
        }
   
    

}








//adding eventlistner for changing the event after clicking 
input.addEventListener("change",(e)=>{
    // console.log(e)
    const file=input.files[0];
    // console.log(file);


    // reading file by onload method
     if(!file)return
     let reader=new FileReader()
     reader.onload=(e)=>{
        // console.log(e);
        let base64data=e.target.result.split(",")[1];
        fileDetails.mime_type=file.type;
        fileDetails.data=base64data;
innerUploadImage.querySelector("span").style.display="none" 
innerUploadImage.querySelector("#icon").style.display="none"      
image.style.display="block"
image.src=`data:${fileDetails.mime_type};base64,${fileDetails.data}` 
output.style.display="none";       
     
     }

       
     

    reader.readAsDataURL(file)
})
btn.addEventListener("click",()=>{
    loading.style.display="block"
    generateResponse()
})




innerUploadImage.addEventListener("click",() =>{
    input.click()
});
// adding the backend url