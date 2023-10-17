import React, {  useRef, useState } from 'react';
import Router from './routes/Router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { createTheme } from "@mui/material/styles";
import { SnackbarProvider } from 'notistack';
import Zoom from '@mui/material/Zoom';
import Plannedtours from './components/pages/Tourpackages/Plannedtours';
import AdminLogin from './components/pages/Admin/AdminLogin';
const id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const goTheme = createTheme({
    palette: {
      primary: {
        main: "#003556"
      },
      // secondary: {
      //   main: "#2C2F84"
      // }
    }
  });
  // pdf is necessary
  const refer = useRef()
  const downloadPdf=async()=> {
    // Get the content of the hidden div
    const element = document.getElementById('hiddenDiv');
    const content = element.innerHTML;
    // Create a new div element with the same content as the hidden div
    const newElement = document.createElement('div');
    newElement.style.width="100%"
    newElement.innerHTML = content;
  
    // Set the style properties to position the new element off-screen
    newElement.style.position = 'absolute';
    newElement.style.top = '-9999px';
    newElement.style.left = '-9999px';
  
     // Create a new jsPDF instance
     const pdf = new jsPDF(
      'p','in', 
        [200,297]
      );
    // Add the new element to the DOM
    document.body.appendChild(newElement);
// Calculate the number of pages required to display the entire component
const componentHeight = newElement.clientHeight;
console.log(componentHeight)
const pageHeight = pdf.internal.pageSize.getHeight();
console.log(pageHeight)
const totalPages = Math.ceil(componentHeight / 1000);
       // Loop through each page and add the component image to the PDF
  for (let i = 0; i < totalPages; i++) {
    // Use html2canvas to create an image of the component for the current page
    const scrollY = i * 740;
    const canvas = await html2canvas(newElement, {
      x:0,
      y:scrollY,
      height:740,
      width: 780,
    });
    const imgData = canvas.toDataURL('image/', 1.0);
    // Add the image to the PDF and create a new page if necessary
    if (i > 0) {
      alert(i)
      pdf.addPage();
    }
    pdf.addImage(imgData, 'PNG', 0, i*10, 200, 0, null, 'FAST');
    // if (i < totalPages - 1) {
    //   pdf.addPage();
    // }
    
  }
  // document.body.removeChild(newElement);
 
  pdf.save("json.pdf")
   
   
  }


const names=["book","jump","koels","hello","kjslfjd"]
const [search,setSearch]=useState("")
const [data,setData]=useState("");
const textFieldRef=useRef(null)
const [cal,setCal]=useState(false)
const text=()=>{
  if(data===""){
    alert("empty text field")
    textFieldRef.current.style.borderColor='red';
    textFieldRef.current.focus();
  }
}
const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
};

const handleFocusChange = (focusedInput) => {

    setFocusedInput(focusedInput);
};


  return (
    <div className="App">
      {/* <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        {
          names.filter(data=>data.includes(search)).map((item)=>{
            return(
              <div>{item}</div>
            )
          })
        } */}
         <SnackbarProvider
          anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        TransitionComponent={Zoom}
        maxSnack={3}
        autoHideDuration={3000}
        preventDuplicate
      >
       {/* <Bestinplace />   */}
       {/* <SummaryPolicy /> */}
       <Router/>  
       {/* <AdminLogin /> */}
       {/* <Plannedtours /> */}
       </SnackbarProvider> 
   
      {/* <div id="hiddenDiv" ><Invoice/></div>
       <button onClick={downloadPdf}>hello</button> */}  
       {/* <button onClick={text}>group</button> */}
       {/* <div>{JSON.stringify(search,null,2)}</div> */}
    </div> 
  );
}

export default App;