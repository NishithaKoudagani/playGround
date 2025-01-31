'use client'
import React, { useEffect, useState } from "react";

export default function BoxDragDrop() {
    let left = window.innerWidth / 2;
    let top = window.innerHeight - 30;
    let waitTime = 10;

    const [box, setBox] = useState<Boxes[]>([]);

    class Boxes {
        id: number; color: string; left: number; top: number;mouseOver:boolean;
        constructor(id: number, color: string, left: number, top: number,mouseOver:boolean) {
            this.id = id;
            this.color = color;
            this.left = left;
            this.top = top;
            this.mouseOver=mouseOver;
        }
    }

    const moveBoxToRandomPosition = async (boxObj:Boxes) => {
        let randomLeftVal = Math.floor(Math.random() * ((window.innerWidth - 60) + 1)) + 60;

        if (!boxObj.mouseOver) {
            let currentBox = document.getElementById('box' + boxObj.id);

            if (currentBox) {
                if (randomLeftVal > 60 && randomLeftVal < window.innerWidth - 60) {
                    let boxCurrentPosition = Number(currentBox.style.left.replace('px', ''));

                    while (boxCurrentPosition !== randomLeftVal && !boxObj.mouseOver) {
                        if (boxCurrentPosition < randomLeftVal) {
                            boxCurrentPosition += 1;
                        } else {
                            boxCurrentPosition -= 1;
                        }
                        currentBox.style.left = boxCurrentPosition + 'px'
                        await sleep(waitTime);
                    }
                }
            }
        }
    };

    const handleDrag = (e:any, boxObj:Boxes) => {
        var x = document.getElementById('box' + boxObj.id);

        if (x) {
            if (e.clientX >= 60 && e.clientX <= window.innerWidth - 60) {
                boxObj.left = e.clientX;
            } if (e.clientY >= 60 && e.clientY <= window.innerHeight - 30) {
                boxObj.top = e.clientY;
            }
            x.style.left = boxObj.left + 'px';
            x.style.top = boxObj.top + 'px';
        }
    }

    function sleep(ms:any) {
        return new Promise(e => setTimeout(e, ms));
    }

    const handleDragEnd = async (e:any, boxObj:Boxes) => {
        var x = document.getElementById('box' + boxObj.id);

        if (x) {
            if (e.clientX >= 60 && e.clientX <= window.innerWidth - 60) {
                boxObj.left = e.clientX;
            } if (e.clientY >= 60 && e.clientY <= window.innerHeight - 30) {
                boxObj.top = e.clientY;
            }
            x.style.position = 'absolute';
            x.style.left = boxObj.left + 'px';
            while (boxObj.top !== window.innerHeight - 30) {
                boxObj.top += 1;
                x.style.top = boxObj.top + 'px';
                await sleep(waitTime);
            }
        }
    }

    const onButtonClick = () => {
        const newBox = new Boxes(box.length !== 0 ? box.length + 1 : 1, box.length % 2 === 0 ? "pink" : "blue", box.length * 40, top, false);

        setBox(prev => [...prev, newBox]);
        setInterval(() => {
            moveBoxToRandomPosition(newBox);
        }, 10000)
    }

    const captureMouseOver = (boxObj:Boxes) => {
        setBox(prev => prev.map(b => b.id === boxObj.id ? { ...b, mouseOver: true } : b));
    }

    const captureMouseOut = (boxObj:Boxes) => {
        setBox(prev => prev.map(b => b.id === boxObj.id ? { ...b, mouseOver: false } : b));
    }

    useEffect(() => {
        console.log('State updated:', box);
    }, [box]);

    return (
        <div>
            <button style={{ position: "fixed", border: "1px solid", borderRadius: 8, borderColor: "pink", right: 10, top: 10, padding: "10px" }} onClick={onButtonClick}>Add</button>
            {
                box.map((curBox) => (
                    <div id={'box' + curBox.id} key={curBox.id} draggable="true"
                        style={{ height: 30, width: 30, backgroundColor: curBox.color, position: "absolute", left: curBox.left + 'px', top: curBox.top + 'px' }}
                        onMouseOver={() => captureMouseOver(curBox)}
                        onMouseOut={() => captureMouseOut(curBox)}
                        onDragStart={(e:any) => { e.dataTransfer.setDragImage(e.target, 0, 0) }}
                        onDrag={(e:any) => handleDrag(e, curBox)} onDragEnd={(e) => handleDragEnd(e, curBox)}
                    ></div>
                ))
            }
        </div>
    )
}
