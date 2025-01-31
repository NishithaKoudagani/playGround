'use client'
import React, { useCallback, useEffect, useRef, useState } from "react";
export default function BoxDragDrop(){
let left=window.innerWidth/2;
let top=window.innerHeight-30;
let waitTime = 10;
let mouseOver=false;
// let [randomLeftVal,setLeftVal]=useState(Math.floor(Math.random()*((window.innerWidth-60)+1))+60);
let randomLeftVal=Math.floor(Math.random()*((window.innerWidth-60)+1))+60;
useEffect(
    ()=>{
        // moveBoxToRandomPosition();
      setInterval(()=>
    {
    moveBoxToRandomPosition();
    },20000)
},[mouseOver])

const moveBoxToRandomPosition = async()=>{

      if(!mouseOver){
        let box=document.getElementById('box');
        console.log('random left ',randomLeftVal,'window ',window.innerWidth-60);
        if(box)
            {
           if(randomLeftVal>60 && randomLeftVal<window.innerWidth-60)
            {
         
         let boxCurrentPosition=Number((box.style.left).substring(0,(box.style.left).indexOf('p')));
          console.log(box.style.left,' ',boxCurrentPosition)
          while((boxCurrentPosition!=randomLeftVal) && (!mouseOver)){
            if(boxCurrentPosition<randomLeftVal){
                // console.log('less than box',curLeft);
                boxCurrentPosition=boxCurrentPosition+1;
                box.style.left=boxCurrentPosition+'px';
                await sleep(waitTime);
                }
            
            if(boxCurrentPosition>randomLeftVal){
                // console.log('bgreater thanox',curLeft);
                boxCurrentPosition=boxCurrentPosition-1;
                box.style.left=boxCurrentPosition+'px';
                await  sleep(waitTime);
                
            }
            
        
        }
    }
 
        
        }
    }
randomLeftVal=Math.floor(Math.random()*((window.innerWidth-60)+1))+60;
   
 

    };



    const handleDrag=(e:any)=>{
        var x=document.getElementById('box');
        console.log('width ',window.innerWidth,'height ',window.innerHeight)
        if(x){
              if (e.clientX>=60 && e.clientX<=window.innerWidth-60){
                left=e.clientX;
           } if (e.clientY>=60 && e.clientY<=window.innerHeight-30){
               top=e.clientY;
           }

        x.style.position='absolute'; 
        x.style.left=left+'px';
        x.style.top=top+'px';
        console.log('drag_left ',left,'drga_top ',top)
    }
}
function sleep(ms:number) {
    return new Promise(e => setTimeout(e, ms));
}
const  handleDragEnd=async (e:any)=>{
    var x=document.getElementById('box'); 
    
    if(x)
     {  if (e.clientX>=60 && e.clientX<=window.innerWidth-60){
          left=e.clientX;
     } if (e.clientY>=60 && e.clientY<=window.innerHeight-30){
         top=e.clientY;
     }
    x.style.position='absolute'; 
    x.style.left=left+'px';
    while (top!=window.innerHeight-30) {

        console.log('top',top);
        top=top+1;
        x.style.top=top+'px';
        await sleep(waitTime);
    }
    // if(top!=window.innerHeight-30){
    //     top=window.innerHeight-30;
    //     x.style.top=top+'px';
    // }
  
    console.log('left ',left,'top ',top)
}
}
const moveBox=()=>{
    console.log('d');
}


    return(
       <div>
        <div id='box' draggable="true" style={{height:30,width:30,backgroundColor:"pink",position:"absolute",left:left+'px',top:top+'px'}} 
         onMouseOver={()=>{mouseOver=true;console.log(mouseOver)}} 
         onMouseOut={()=>{mouseOver=false;console.log(mouseOver)}}
        // onMouseOver={()=>{console.log('On Mouse Over')}}
        onDragStart={(e:any)=>{e.dataTransfer.setDragImage(e.target,0,0)}}
        onDrag={handleDrag} onDragEnd={handleDragEnd}
        > </div>
            &nbsp;
        <button style={{position:"fixed",border:"1px solid",borderRadius:8,borderColor:"pink",right:10,top:10,padding:"10px"}}>Add</button>
 

       
        </div>
    )

    
}