import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './settings.css';
import Csp from './images/csp.jpeg';
import Csp3 from './images/csp3.png';
import Csp4 from './images/csp4.png';
import D5 from './images/d5.png';
import D6 from './images/d6.png';
import D1 from './images/d1.jpeg';
import D2 from './images/d2.png';
import D3 from './images/d3.jpeg';
import D4 from './images/d4.png';
import Wee from './images/weel.png';
import b3 from './images/b3.png';/* Smaller image */
import Icon from './images/logo1.png';

function Settings() {

    const handleFormSubmit = async (event) => {
        const algoName = localStorage.getItem("algo");
        console.log("ALGO NAME: ", algoName);
        let className = "";
        let splitRatio = 0;
        let k_value = 0;
        let p_value = 0;
        let documentName = "";
        if (algoName == 'knn') {
          className = document.getElementById("KNNclassname").value;
          splitRatio = document.getElementById("KNNrangeInput").value;
          k_value = Number(document.getElementById("k_value").value);
          if (showPVal) {
            p_value = Number(document.getElementById("p_value").value);
          }
          else {
            if (selectedFormula === "manhattan") {
              p_value = 1;
            }
            else if (selectedFormula === "euclidean") {
              p_value = 2;
            }
          }
    
        }
        else if (algoName == 'dt_id3' || algoName == 'dt_c5_0' || algoName == 'gaussian') {
          className = document.getElementById("DTclassname").value;
          splitRatio = document.getElementById("DTrangeInput").value;
          console.log("Class Name: ", className);
        }
    
        else if (algoName == 'bernouli' || algoName == 'multinomial') {
          className = document.getElementById("BMclassname").value;
          splitRatio = document.getElementById("BMrangeInput").value;
          documentName = document.getElementById("documentName").value;
        }
    
    
    
        console.log("Form submitted!");
        const fileName = localStorage.getItem("dataset");
        console.log("Class Name:", className);
        console.log("Split Ratio:", splitRatio);
        const sp = Number(selectedOperator[2]);
        console.log("Selected Operator:", selectedOperator, sp);
        event.preventDefault();
        //setIsLoading(true);
    
        const data = {
          algo_name: algoName,
          testing_size: Number(splitRatio),
          class_name: className,
          file_name: fileName,
          operator_type: sp || 1,
          document_name: documentName,
          k_value: Number(k_value) || 0,
          p_value: Number(p_value) || 0
        }
    
        try {
          const response = await fetch("http://127.0.0.1:8080/runAlgo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          const result = await response.text();
          console.log("Response from server:", result);
          //setIsLoading(false);
          navigate("/initialResult", { state: { result } }); // Replace "/result" with your result page route
    
        } catch (error) {
          //setIsLoading(false);
          console.error("Error sending data:", error);
        }
      };
  const navigate1= useNavigate();

  const goToAlgo = () => {
    navigate('/algo');
  };

  
  const [algorithm, setAlgorithm] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [showPVal, setShowPVal] = useState(false);
  const [selectedFormula, setFormula] = useState("");
  const [selectedOperator, setOperatorType] = useState("");

  const handleOperatorType = (event) => {
    setOperatorType(event.target.value);
  };
  const handleFormula = (event) => {
    setFormula(event.target.value);
    if (event.target.value === "minkowski") {
      setShowPVal(true);
    } else {
      setShowPVal(false);
    }
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setIsUploaded(false); 
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      alert("File selected successfully!");
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleUploadButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsUploaded(true); 
      setShowPopup(false);
      alert("File uploaded successfully!");
    }, 5000); // Simulate upload delay
  };

  const handleClick = (algorithmName) => {
    localStorage.setItem('selectedAlgorithm', algorithmName);
    setAlgorithm(algorithmName);
    console.log(algorithm);
  };


  const handleDataset=(datasetName)=>{
    localStorage.setItem('selectedDataset', datasetName);
  }

  const showOptions = (algorithmName) => {
    setClickedButton(algorithmName === clickedButton ? null : algorithmName); // Toggle display for that button
  };


  useEffect(() => {

    const savedAlgorithm = localStorage.getItem('selectedAlgorithm');
    if (savedAlgorithm) {
      setAlgorithm(savedAlgorithm);
    }
  }, []);

  

  const navigate = useNavigate();


  const [clickedButton, setClickedButton] = useState(null);

  const styles = {
    splitScreen: {
      display: 'flex',
      flexDirection: 'row',  // Ensure content is stacked vertically
      height: '100vh',  // Make the container take up the full viewport height
    },
    uploadButton: {
        background: "linear-gradient(135deg, #00C9A7, #00A3E0)",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
      },

      topPane: {
        flexDirection: 'column',
        width: '60%', /* Adjust width as needed */
        height:'100vh',
        display: 'block',
        marginTop: '8%',
        paddingTop: '0px',
        marginLeft: '5%',
        marginRight: '2%',
        border: 'solid',
        borderWidth: '1px',
        borderRadius: '20px',
        borderColor: '#dddddd',
        backgroundColor: 'none',
        backdropFilter: 'blur(5px)',
        zIndex: '10',
        justifyContent: 'flex-start', /* Corrected 'left' to 'flex-start' */
        alignItems: 'flex-start', /* Corrected 'start' to 'flex-start' */
        overflow: 'visible', /* Ensure content is visible */
        padding: '10px', /* Add padding for better spacing */
        boxSizing: 'border-box', /* Include padding/border in dimensions */
      },
      

    boxt1:{
      //border:'solid',
      //borderWidth:'1px',
      //backdropFilter: 'blur(5px)',   
      margin:'30px',
      marginBottom:'0px',
      borderRadius:'20px',
      background:'linear-gradient(90deg, rgba(0, 255, 72, 0.24) 0%, rgba(0, 204, 255, 0.33) 100%)',
    },

    boxt2:{
    alignItems: 'center', 
    justifyContent:'center',
    display: 'flex',
    flexDirection: 'row',  // Aligns buttons vertically in a column
    },

    

   

    bottomPane: {
      width: '30%',  // Full width
      height: '180%',  // Take up 50% of the height
      display: 'flex',
      marginTop:'38.5%',
      marginLeft:'2%',
      verticalAlign:'top',
      marginRight:'4%',
      flexDirection: 'column',  /* Apply blur effect to the background */
      zIndex: '10',
      justifyContent: 'start',
      alignItems: 'center',
      },

      boxb1:{
      width: '100%',  // Full width
      height: '45%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop:'0%',
      marginLeft:'0%',
      marginRight:'0%',
      zIndex: '10',  
      justifyContent: 'center',
      alignItems: 'center', 
      //marginBottom:'56%',
      },

      boxb2:{
        width: '100%',  // Full width
        height: '0%',  // Take up 50% of the height
        //backgroundColor: '#f0f0f0',  // Optional background for visibility
        display: 'flex',
        marginTop:'5%',
        marginLeft:'0%',
        marginRight:'0%',
        border:'solid',
        borderWidth:'1px',
        borderRadius:'20px',
        borderColor:'  #dddddd',
        backgroundColor:'none',  /* Semi-transparent white background */
        backdropFilter: 'blur(5px)',  /* Apply blur effect to the background */
        zIndex: '10',  
        justifyContent: 'center',
        alignItems: 'center', 
        },
      img:{
        width:'100%',
        border:'solid',
        borderWidth:'1px',
        borderColor:'#dddddd',
        borderRadius:'20px', 
        backdropFilter: 'blur(5px)',
      },

      imgh1:{
        paddingLeft:'15px', 
        fontSize:'20px',
      },

      imgt2:{
        paddingLeft:'30px', 
        paddingRight:'30px', 
        fontSize:'17px',
        textAlign:'center',
        fontStyle: 'italic',
        fontWeight:'400',
        },

        imgt3:{
          marginLeft:'20px', 
          marginRight:'40px', 
          fontSize:'12px',
          marginBottom:'25px',
          fontStyle: 'bold',
          color:'#27292B',
          textAlign:'left',
          fontWeight:'400',
          border:'solid',
          padding:'10px',
          borderWidth:'2px',
          borderColor:'#dddddd',
          paddingLeft:'15px',
          //borderRadius:'15px',
          borderLeft: '2px solid',
          borderRight: '0px ',
          //borderLeft: '0px',
          borderTop: '0',
          borderBottom: '0',

          //borderColor: 'linear-gradient( 109.6deg,  rgba(112,246,255,0.33) 11.2%, rgba(221,108,241,0.26) 42%, rgba(229,106,253,0.71) 71.5%, rgba(123,183,253,1) 100.2% )',
          },
        
        img2:{
          width:'50%',
         
          objectFit:'cover',
          display:'block',
        },

        popupOverlay: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          },
          popupContent: {
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            maxWidth: "400px",
            width: "90%",
            fontFamily: "Poppins, sans-serif",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          },
          closeButton: {
            background: "red",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: "pointer",
            marginTop: "10px",
          },
          uploadButton: {
            background: "linear-gradient(135deg, #00C9A7, #00A3E0)",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
          },
          loader: {
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #3498db",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            animation: "spin 2s linear infinite",
            margin: "20px auto",
          },

        heading:{
            fontWeight:'600',
            fontSize:'30px',
            color:'#333333',
            marginLeft:'4.5%',
            marginTop:'20px',
            //marginTop:'-150px'
        },

        boxt1t:{
            fontSize:'17px',
            fontWeight:'500',
            color:'#262729',
            padding:'20px',
            lineHeight:'37px',
            textAlign:'left',
            textShadow:'1px',
            fontFamily:'poppins',
          },
          boxt2b:{
            background: 'linear-gradient(135deg, #00C9A7, #00A3E0)',
            color: 'white',
            padding: '20px 45px',
            border: 'none',
            borderRadius: '15px',
            fontSize: '17px',
            fontWeight: '400',
            cursor: 'pointer',
            fontFamily:'poppins',
            //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            //transition: 'all 0.3s ease-in-out',
            },

            Aoptions:{
                //display:'flex',
                marginLeft:'20px',
                paddingBottom:'40px',
                marginTop:'-20px',
                flexDirection: 'row',
                //horizontalAlign:'middle',
            },

            Icon:{
                width:'2%',
                marginRight:'5px',
            },

            additionalButtons: {
                display: 'flex',
                flexDirection: 'row',
                marginLeft: '20px',  // Add some space between the buttons
              },

            boptions:{
                display: 'flex',
                flexDirection: 'row',
            },

            coptions:{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom:'30px',
                marginLeft:'10px',
                marginTop:'-25px',
            },

            formt:{
              display:'flex',
              flexDirection:'row',
              marginLeft:'30px',
              paddingTop:'20px',
              marginRight:'20px',

            },

            formb:{
              display:'flex',
              flexDirection:'row',
              marginLeft:'30px',
              marginRight:'20px',
            },

            formth:{
              fontSize:'17px',
            fontWeight:'500',
            color:'#262729',
            //padding:'20px',
            lineHeight:'37px',
            textAlign:'left',
            textShadow:'1px',
            fontFamily:'poppins',
            },

            formbh:{
              fontSize:'17px',
            fontWeight:'500',
            color:'#262729',
            //padding:'20px',
            lineHeight:'37px',
            textAlign:'left',
            textShadow:'1px',
            fontFamily:'poppins',
            }


  };

  return (

    
    <div style={styles.splitScreen}>
           {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>Upload Your Dataset</h2>
            {!isLoading ? (
              <>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  style={styles.uploadInput}
                />
                <button
                  class="button2"
                  onClick={handleUploadButtonClick}
                >
                  Upload
                </button>
                <button style={styles.closeButton} onClick={togglePopup}>
                  Close
                </button>
              </>
            ) : (
              <div>
                <div style={styles.loader}></div>
                <p>Uploading...</p>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div style={styles.topPane}>
        <div>
        <h1 style={styles.heading}>Algorithm Selection</h1>

        <div style={styles.boxt1}>


        <div style={{display:'flex',flexDirection:'row'}}>

          <div> 
          <h1 style={styles.boxt1t}>
            Select one of the following algorithm
          </h1>
          <div style={styles.Aoptions}>

          <div style={styles.Aoption}>  
          <img style={styles.Icon} src={Icon} alt="Logo" />
          <button className="button" onClick={() => showOptions('decisionTree')}>Decision Tree</button>
          {clickedButton === 'decisionTree' && (
            <>
                  <button className="button" onClick={() => handleClick('id3')}>ID3</button>
                  <button className="button" onClick={() => handleClick('c5.0')}>C5.0</button>
                  </>
            )}
          </div>

          <div style={styles.Aoption}>  
          <img style={styles.Icon} src={Icon} alt="Logo" />
          <button className="button" onClick={() => handleClick('linearRegression')}>Linear Regression</button>
          </div>

          <div style={styles.Aoption}>  
          <img style={styles.Icon} src={Icon} alt="Logo" />
          <button className="button" onClick={() => showOptions('NaiveByes')}>Naive Byes</button>
          {clickedButton === 'NaiveByes' && (
            <>
                  <button className="button" onClick={() => handleClick('multinomial')}>Multinomial</button>
                  <button className="button"onClick={() => handleClick('bernouli')}>Bernouli</button>
                  <button className="button"onClick={() => handleClick('guassian')}>Guassian</button>
                  </>
            )}
          </div>

          <div style={styles.Aoption}>  
          <img style={styles.Icon} src={Icon} alt="Logo" />
          <button className="button" onClick={() => handleClick('knn')}>KNN</button>
          </div>

          </div>
          </div>


          <div style={{display:'flex',flexDirection:'column',justifyContent:'end',marginBottom:'40px',marginRight:'30px',width:'40%'}}>
            <h1 style={{fontSize:'15px',fontWeight:'500'}}>Selected Algorithm: {algorithm}</h1>
            <button className="button2">Next</button>
          </div>
          


          </div>
        </div>

        </div>
        
        <div>
        <h1 style={styles.heading}>Dataset Selection</h1>
        <div style={styles.boxt1}>
          <h1 style={styles.boxt1t}>
            Select from already converted dataset
          </h1>
          <div style={styles.Aoptions}>

          {/* Show different options based on the selected algorithm */}
      {algorithm === 'linearRegression' && (
        <div>
            <img style={styles.Icon} src={Icon} alt="Logo" />
          <button className="button">Option 1 for Linear Regression</button>
          <img style={styles.Icon} src={Icon} alt="Logo" />
          <button className="button">Option 2 for Linear Regression</button>
        </div>
      )}

      {algorithm === 'id3' && (
        <div>
          <img style={styles.Icon} src={Icon} alt="Logo" />
          <button className="button">Option 1 for Logistic Regression</button>
          <button className="button">Option 2 for Logistic Regression</button>
        </div>
      )}

          </div>
        </div>
        

        <div style={styles.boxt1}>
          <h1 style={styles.boxt1t}>
            Convert classical dataset into triadic dataset
          </h1>
          <div style={styles.coptions}>
          <div style={{paddingLeft:'10px'}}>
          <button className="button2" onClick={togglePopup}>Upload Classical Dataset</button>
          </div>
        {isUploaded && (
            
            <div class="checkbox-container">
        <button className="button">Convert</button>
  <label class="custom-checkbox">
    <input type="radio" name="option" value="1"/>
    <span class="checkbox-label">V1</span>
  </label>
  
  <label class="custom-checkbox">
    <input type="radio" name="option" value="2"/>
    <span class="checkbox-label">V2</span>
  </label>
  
  <label class="custom-checkbox">
    <input type="radio" name="option" value="3"/>
    <span class="checkbox-label">V3</span>
  </label>
</div>
        )}
          </div>
        </div>

        <div style={styles.boxt1}>

          <h1 style={styles.boxt1t}>
            Upload already converted triadic dataset
          </h1>
          <div style={styles.Aoptions}>
          <button className="button2" onClick={togglePopup}>Upload</button>
          </div>
          <div style={{display:'flex',flexDirection:'column',justifyContent:'end',marginBottom:'20px',marginLeft:'20px',width:'40%',paddingBottom:'30px'}}>
            <h1 style={{fontSize:'15px',fontWeight:'500'}}>Selected Algorithm: {algorithm} </h1>
            <div style={{display:'flex',flexDirection:'row',gap:'20px'}}>
            <button className="button2">Back</button>
            <button className="button2">Next</button>
            </div>
          </div>
        </div>
        

        </div>


        <div>
        <h1 style={styles.heading}>Parameter Selection</h1>

        <div style={styles.boxt1}>  
        <div style={styles.formt}>

        <div>
        <h1 style={styles.formth}>Triadic Operator</h1> 

        <div class="custom-checkbox1"> 

         <label class="custom-checkbox">
    <input type="radio" name="option" value="1"/>
    <span class="checkbox-label">Operator 1</span>
        </label>
        <label class="custom-checkbox">
    <input type="radio" name="option" value="2"/>
    <span class="checkbox-label">Operator 2</span>
        </label>
        <label class="custom-checkbox">
    <input type="radio" name="option" value="3"/>
    <span class="checkbox-label">Operator 3</span>
        </label>

        </div>
        </div>


       <div class="label2"> 
       <label style={styles.formth}
                  >
                    Enter Class Name
                  </label>
                  <input
                   type="text"
                   id="KNNclassname"
                   name="name"
                   required
                    style={{
                      fontSize: '14px',
                      width: '80%',
                      padding:'8px',
                      borderRadius: '5px',
                      border:'none',
                    }}
                  />
        </div>

        <div class="label3">  
       <label style={styles.formth}
                  >
                    Enter Split Ratio
                  </label>
                  <p class="label">Enter a value ranging from 0.1 - 1</p>
                  <input
                    type="number"
                    id="KNNrangeInput"
                    name="rangeInput"
                    min="0.1"
                    max="1"
                    step="0.01"
                    required
                    style={{
                      fontSize: '14px',
                      width: '80%',
                      padding:'8px',
                      borderRadius: '5px',
                      border:'none',
                    }}
                  />
        </div>
        </div>
        <h1 class="sa" >Algorithm Slected: {algorithm} </h1>

        <div style={styles.formb}>
        {algorithm === 'knn' && (
            <form
            >
              {/* First Column: Operators, Formula, and K Value */}
              

              <div style={{display:'flex',flexDirection: 'column',gap:'17px'}}>

              <div class="custom-checkbox2"> 
                <h1 style={styles.formbh}>Select Formula</h1>
         <label class="custom-checkbox">
    <input type="radio" name="option" value="minkowski" checked={selectedFormula === 'minkowski'} onChange={handleFormula}/>
    <span class="checkbox-label">Operator 1</span>
        </label>
        <label class="custom-checkbox">
    <input type="radio" name="option" value="2"/>
    <span class="checkbox-label">Operator 2</span>
        </label>
        <label class="custom-checkbox">
    <input type="radio" name="option" value="3"/>
    <span class="checkbox-label">Operator 3</span>
        
        </label>

               </div>

               <div style={{paddingTop:'70x'}}>
               <div className="cn">
                  <label
                    className="title"
                    htmlFor="k_value"
                    style={styles.heading}
                  >
                    Enter From 1-100
                  </label>
                  <p style={{marginTop:'0px'}}>Enter Positive integer</p>
                  <input
                    type="number"
                    id="k_value"
                    name="number"
                    min="1"
                    max="100"
                    step="1"
                    required
                    style={{
                      padding: '8px',
                      fontSize: '14px',
                      width: '80%',
                      borderRadius: '5px',
                      marginBottom:'30px',
                      border:'none',
                    }}
                  />
                </div>
              </div>

              {/* Second Column: Other Fields */}
              <div style={{paddingTop:'17px' }}>
                <div className="cn">
                  
                </div>

                {showPVal && (
                  <div className="cn">
                    <label
                      className="title"
                      htmlFor="p_value"
                      style={styles.formbh}
                    >
                      Enter P Value
                    </label>
                    <p style={{marginTop:'0px'}}>Enter Positive integer</p>
                    <input
                      type="number"
                      id="p_value"
                      name="p_value"
                      min="1"
                      step="1"
                      required
                      style={{
                        padding: '8px',
                        fontSize: '14px',
                        width: '80%',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                      }}
                    />
                  </div>
                )}
              </div>

              </div>


            </form>
          )}


        {algorithm ==='bernouli'&&(
          <div style={{paddingTop:'17px' }}>
            <div className="cn">
              <label
                className="title"
                htmlFor="p_value"
                style={styles.formbh}
              >
                Enter Document Label
              </label>
              <input
                type="text"
                id="KNNclassname"
                name="name"
                required
                style={{
                  fontSize: '14px',
                      width: '80%',
                      padding:'8px',
                      borderRadius: '5px',
                      border:'none',
                      marginBottom:'10px',
                }}
              />
            </div>
        </div>
        )}


        {algorithm ==='multinomial'&&(
          <div style={{paddingTop:'17px' }}>
            <div className="cn">
              <label
                className="title"
                htmlFor="p_value"
                style={styles.formbh}
              >
                Enter Document Label
              </label>
              <input
                type="text"
                id="KNNclassname"
                name="name"
                required
                style={{
                  fontSize: '14px',
                      width: '80%',
                      padding:'8px',
                      borderRadius: '5px',
                      border:'none',
                      marginBottom:'10px',
                }}
              />
            </div>
        </div>
        )}

        {algorithm === 'linearRegression'&&(
        <h1 style={{fontSize:'17px',padding:'0px'}}>Bins: 2</h1>
        )}
        </div>

        <div style={{display:'flex',paddingLeft:'30px',paddingBottom:'40px',paddingTop:'20px',gap:'30px'}}>
        <button
        className="button2">Back</button>
        <button
        className="button2">Run Algorithm</button>
          </div> 


         </div>
        </div>
        


      </div>
      

      <div style={styles.bottomPane}>
        <div style={styles.boxb1}>
          <div style={{flexDirection:'column',width:'100%'}}>
          <img style={styles.img} src={D5} alt="Logo" />
          <h1 style={{fontWeight:'600',
            fontSize:'30px',
            color:'#333333',
            marginLeft:'4.5%',
            marginTop:'7px',
            marginBottom:'7px'}}>Triadic Truth Table</h1>
            <h1 style={styles.imgt3}>The triadic essence of meaning: the representamen as the vessel, the object as the reality it reflects, and the interpretant as the bridge of understanding, capturing the infinite dance between perception, reality, and interpretation </h1>
            <img style={styles.img} src={D6} alt="Logo" />
            <img style={{width:'90%',marginBottom:'40px',display:'flex',justifyContent:'center',alignItems:'center',marginLeft:'30px',marginTop:'40px'}} src={Wee} alt="Logo" />
            <img style={styles.img} src={D2} alt="Logo" />
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Settings ;
