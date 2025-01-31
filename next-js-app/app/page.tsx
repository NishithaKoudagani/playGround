'use client'
// import Image from "next/image";
export default function Home()  {
// let leftX = 0;
// let topY = 0;

// document.addEventListener("dragstart", function( event ) {
//   event.dataTransfer.setDragImage(event.target, window.outerWidth, window.outerHeight);
// }, false);

  function handleDragStart(e:any) {
    e.dataTransfer.setDragImage(e.target, 0, 0);
}
  function handleDrag(e:any) {
   
    const ele = document.getElementById('box');
    console.log(window.innerWidth,window.innerHeight,window.outerWidth, window.outerHeight,screen.availHeight,screen.availWidth	,document.body.clientHeight,document.body.clientWidth		);
    if(ele){
      console.log('ónDrag ', e.clientX ,e.clientY);
    // if ((e.clientX>=0 && e.clientX<=window.outerWidth) && (e.clientY>=0)){
      ele.style.position='absolute';
      ele.style.left=e.clientX+ 'px';
      ele.style.top=e.clientY+ 'px';
     

    // }
}
  }
function handleDragLeave(e:any) {
  const ele = document.getElementById('box');
  if(ele && (e.clientX>=0 && e.clientX<=window.outerWidth) && (e.clientY>=0 && e.clientX<=window.outerHeight)){
    ele.style.position='fixed';
    ele.style.left=e.clientX+ 'px';
    ele.style.top=e.clientY+ 'px';
    console.log("Drag Leave... X: " + e.clientX + " | Y: " + e.clientY);

  }
}
 

const handleMouseOver= () => {
  console.log('Mouse moved to div');
  
};


  return (
    <div  id='box'  draggable="true" style={{width:50,height:50,backgroundColor:"deepskyblue"}} onMouseOver={handleMouseOver} 
    onDragStart={handleDragStart}  onDrag={handleDrag}  onDragEnd={handleDragLeave}>
     
    </div>
  );
}
