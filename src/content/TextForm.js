import React, {useState} from 'react'


export default function TextForm(props) {
    const handleOnChange = (event)=>{
        setText(event.target.value);
    }
    const handleUpClick = ()=>{
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("All letters are Uppercased", "success");
    }
    const clearText = ()=> {
        let newText = "" ;
        setText(newText);
        props.showAlert("Text is cleared", "success");
    }
    const copyText = ()=> {
        // let text = document.getElementById("myBox") ;
        // text.select();
        // navigator.clipboard.writeText(text.value);
        // document.getSelection().removeAllRanges();
        navigator.clipboard.writeText(text);
        props.showAlert("Text is copied", "success");
    }
    const removeExtraSpace = ()=> {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces are removed", "success");
    }


    const [text, setText] = useState("");
  return (
    <>
    <h1>{props.heading}</h1>
    <div className="mb-3">
    <textarea className="form-control" value={text} style={{backgroundColor: props.mode === "light" ? "white" : "#262e8e", color: props.mode === "light" ? "black" : "white"}} onChange={handleOnChange} id="myBox" rows="8" placeholder='Type something to Enable the buttons.....'></textarea>
    </div>
    <div className="container">
        <button disabled={text.length === 0} type="button" onClick={handleUpClick} className="btn btn-primary mx-1 my-1">Convert to uppercase</button>
        <button disabled={text.length === 0} type="button" onClick={clearText} className="btn btn-success mx-1 my-1">Clear All</button>
        <button disabled={text.length === 0} type="button" onClick={copyText} className="btn btn-info mx-1 my-1">Copy Text</button>
        <button disabled={text.length === 0} type="button" onClick={removeExtraSpace} className="btn btn-secondary mx-1 my-1">Remove Extra Spaces</button>
        </div>
        <div className="container my-3">
            <h2>Your text summary</h2>
            <p>{text.split(/\s+/).filter((elem)=>{return elem.length !==0}).length} words and {text.length} characters</p>
            <p>{0.008 * text.split(" ").filter((elem)=>{return elem.length !==0}).length } Minutes to read</p>
            <h2>Preview</h2>
            <p>{text.length>0 ?text : "Nothing to preview"}</p>

        </div>
    
    </>
  )
}
