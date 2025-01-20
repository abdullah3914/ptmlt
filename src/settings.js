import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './settings.css';
// import Csp from './images/csp.jpeg';
// import Csp3 from './images/csp3.png';
// import Csp4 from './images/csp4.png';
import D5 from './images/d5.png';
import D6 from './images/d6.png';
// import D1 from './images/d1.jpeg';
import D2 from './images/d2.png';
// import D3 from './images/d3.jpeg';
// import D4 from './images/d4.png';
import Wee from './images/weel.png';
// import b3 from './images/b3.png';/* Smaller image */
import Icon from './images/logo1.png';

function Settings() {

  const navigate = useNavigate();


  const [clickedButton, setClickedButton] = useState(null);
  const [quote, setQuote] = useState('');
  const [algorithm, setAlgorithm] = useState(null);
  const [dataset, setDataset] = useState(null);
  const [currentMenu, setCurrentMenu] = useState("Algorithm");
  const [datasetType, setDatasetType] = useState('o');
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setErrorPopup] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  // const [isUploaded, setIsUploaded] = useState(false);
  const [showPVal, setShowPVal] = useState(false);
  const [selectedFormula, setFormula] = useState("");
  const [selectedOperator, setOperatorType] = useState("");
  const [dType, setDtype] = useState("1");
  const [file, setFile] = useState(null);
  const [isClassical, setUploadType] = useState(null);
  const [selectedConversionType, setSelectedOption] = useState("");
  const motivationalQuotes = [
    '"The essence of truth lies in its resistance to being ignored" (CP 2.139, c.1902)',
    "If a man burns to learn and sets himself to comparing his ideas with experimental results in order that he may correct those ideas, every scientific man will recognize him as a brother, no matter how small his knowledg maybe.",
    '"Triadic Logic is universally true" (Peirce\'s Logical Notebook, 1909)'
  ];

  const handleFormSubmit = async (event) => {
    handleLoading(true);
    let algoName = algorithm;
    console.log("ALGO NAME: ", algoName);
    let className = document.getElementById("DatasetClass").value || "";
    let splitRatio = document.getElementById("splitRatioInput").value || 0;
    let k_value = 0;
    let p_value = 0;
    let documentName = "";
    let bins = 2;
    if (algoName === 'knn') {
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
    else if (algoName === 'bernouli' || algoName === 'multinomial') {
      documentName = document.getElementById("documentName").value;
    }



    console.log("Form submitted!");
    const fileName = dataset;
    console.log("Class Name:", className);
    console.log("Split Ratio:", splitRatio);
    const sp = Number(selectedOperator[2]);
    console.log("Selected Operator:", selectedOperator, sp);
    event.preventDefault();
    //handleLoading(true);

    const data = {
      algo_name: algoName,
      testing_size: Number(splitRatio),
      class_name: className,
      file_name: fileName,
      operator_type: sp || 1,
      document_name: documentName,
      k_value: Number(k_value) || 0,
      p_value: Number(p_value) || 0,
      bins: bins
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
      if (response.ok) {
        navigate("/initial", { state: { result } });
      }
      else {
        let parsed_result = JSON.parse(result || "{}");
        let message = `${parsed_result.error}`;
        setErrMessage(message);
        setErrorPopup(true);
      }
      handleLoading(false);

    } catch (error) {
      handleLoading(false);
      console.error("Error sending data:", error);
      let message = `${error}`;
      setErrMessage(message);
      setErrorPopup(true);
    }
  };


  const datasetNames = {
    'dt_id3': 'play_tennis.csv',
    'dt_c5_0': 'play_tennis.csv',
    'gaussian': 'play_tennis.csv',
    'multinomial': 'spam_mails.csv',
    'bernouli': 'spam_mails.csv',
    'knn': 'diagnosis.csv',
    'linearRegression': 'LR1.csv'
  }


  const handleDType = (event) => {
    setDtype(event.target.value);
  };

  const handleUploadType = (value) => {
    setUploadType(value);
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option
  };

  const handleFileChange = (event) => {
    let temp = event.target.files[0];
    if (temp && temp.type === "text/csv") {
      setFile(event.target.files[0]); // Save the selected file in state
    } else {
      alert("Please upload a valid CSV file.");
    }
  };

  const handleDatasetType = (value) => {
    setDatasetType(value);
  }

  const handleCurrentMenu = (value, isFirst) => {
    console.log("Value: ", value);
    if (!isFirst && currentMenu === 'Algorithm' && algorithm == null) {
      alert("Please select an algorithm first.");
      return;
    }
    const algo = document.getElementById('Algorithm');
    const dataset = document.getElementById('Dataset');
    const parameter = document.getElementById('Parameter');
    switch (value) {
      case "Algorithm":
        algo.style.opacity = 1;
        dataset.style.opacity = 0.5;
        parameter.style.opacity = 0.5;
        break;
      case "Dataset":
        algo.style.opacity = 0.5;
        dataset.style.opacity = 1;
        parameter.style.opacity = 0.5;
        break;
      case "Parameter":
        algo.style.opacity = 0.5;
        dataset.style.opacity = 0.5;
        parameter.style.opacity = 1;
        break;
      default:
        break;
    }
    setCurrentMenu(value);
  }

  useEffect(() => {
    console.log('Value has changed to:', currentMenu);
    const block = document.getElementById(currentMenu);
    block.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [currentMenu]);

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

  const togglePopup = (value) => {
    handleUploadType(value);
    setShowPopup(!showPopup);
    //  setIsUploaded(false);
  };


  const handleUploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("conversion_type", selectedConversionType);
    formData.append("file", file);
    const datasetName = file.name;
    const input = `http://127.0.0.1:8080/${isClassical ? "uploadClassical" : "uploadTriadic"}`;
    try {
      const response = await fetch(input, {
        method: "POST",
        body: formData, // Send the form data
      });

      if (response.ok) {
        const result = await response.json(); // Parse response if JSON
        console.log("File uploaded successfully:", result);
        localStorage.setItem("dataset", datasetName);
        setDataset(datasetName);

        setIsUploading(false);
        setShowPopup(false);
        alert("File Uploaded and Converted!");
      } else {
        setIsUploading(false);
        setShowPopup(false);

        console.error("Failed to upload file:", response.statusText);
        let message = `Failed to upload file: ${response.statusText}`;
        alert(message);
      }
    } catch (error) {
      setIsUploading(false);
      setShowPopup(false);
      console.error("Error uploading file:", error);
      let message = `Error uploading file: ${error}`;
      alert(message);
    }


  };

  const handleClick = (algorithmName) => {
    localStorage.setItem('selectedAlgorithm', algorithmName);
    setAlgorithm(algorithmName);
    console.log(algorithm);
  };


  const handleDataset = () => {
    switch (datasetType) {
      case 'o':
        const name = `triadicv${dType}_${datasetNames[algorithm]}`;
        setDataset(name);
        break;
      case 'u1':
        break;
      case 'u2':
        break;
      default:
        break;
    }
  }

  const handleLoading = (enable) => {
    setIsLoading(enable);
    if (!enable) return;
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }

  const showOptions = (algorithmName) => {
    setClickedButton(algorithmName === clickedButton ? null : algorithmName); // Toggle display for that button
  };


  useEffect(() => {
    handleCurrentMenu('Algorithm', true);
  }, []);



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
      height: '100vh',
      display: 'block',
      marginTop: '8%',
      paddingTop: '0px',
      marginLeft: '5%',
      marginRight: '2%',
      // border: 'solid',
      borderWidth: '1px',
      borderRadius: '20px',
      borderColor: '#dddddd',
      backgroundColor: 'none',
      //  backdropFilter: 'blur(5px)',
      zIndex: '10',
      justifyContent: 'flex-start', /* Corrected 'left' to 'flex-start' */
      alignItems: 'flex-start', /* Corrected 'start' to 'flex-start' */
      overflow: 'visible', /* Ensure content is visible */
      padding: '10px', /* Add padding for better spacing */
      boxSizing: 'border-box', /* Include padding/border in dimensions */
    },

    blurBackground: {
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '20px',
      borderColor: '#dddddd',
      backgroundColor: 'none',
      backdropFilter: 'blur(5px)',
      padding: '25px', /* Add padding for better spacing */
      marginTop: '20px',
    },


    boxt1: {
      //border:'solid',
      //borderWidth:'1px',
      //backdropFilter: 'blur(5px)',   
      margin: '30px',
      marginBottom: '0px',
      borderRadius: '20px',
      background: 'linear-gradient(90deg, rgba(0, 255, 72, 0.24) 0%, rgba(0, 204, 255, 0.33) 100%)',
    },

    boxt2: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',  // Aligns buttons vertically in a column
    },

    bottomPane: {
      width: '30%',  // Full width
      height: '180%',  // Take up 50% of the height
      display: 'flex',
      marginTop: '38.5%',
      marginLeft: '2%',
      verticalAlign: 'top',
      marginRight: '4%',
      flexDirection: 'column',  /* Apply blur effect to the background */
      zIndex: '10',
      justifyContent: 'start',
      alignItems: 'center',
    },

    boxb1: {
      width: '100%',  // Full width
      height: '45%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop: '0%',
      marginLeft: '0%',
      marginRight: '0%',
      zIndex: '10',
      justifyContent: 'center',
      alignItems: 'center',
      //marginBottom:'56%',
    },

    boxb2: {
      width: '100%',  // Full width
      height: '0%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop: '5%',
      marginLeft: '0%',
      marginRight: '0%',
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '20px',
      borderColor: '  #dddddd',
      backgroundColor: 'none',  /* Semi-transparent white background */
      backdropFilter: 'blur(5px)',  /* Apply blur effect to the background */
      zIndex: '10',
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: '100%',
      border: 'solid',
      borderWidth: '1px',
      borderColor: '#dddddd',
      borderRadius: '20px',
      backdropFilter: 'blur(5px)',
    },

    imgh1: {
      paddingLeft: '15px',
      fontSize: '20px',
    },

    imgt2: {
      paddingLeft: '30px',
      paddingRight: '30px',
      fontSize: '17px',
      textAlign: 'center',
      fontStyle: 'italic',
      fontWeight: '400',
    },

    imgt3: {
      marginLeft: '20px',
      marginRight: '40px',
      fontSize: '12px',
      marginBottom: '25px',
      fontStyle: 'bold',
      color: '#27292B',
      textAlign: 'left',
      fontWeight: '400',
      border: 'solid',
      padding: '10px',
      borderWidth: '2px',
      borderColor: '#dddddd',
      paddingLeft: '15px',
      //borderRadius:'15px',
      borderLeft: '2px solid',
      borderRight: '0px ',
      //borderLeft: '0px',
      borderTop: '0',
      borderBottom: '0',

      //borderColor: 'linear-gradient( 109.6deg,  rgba(112,246,255,0.33) 11.2%, rgba(221,108,241,0.26) 42%, rgba(229,106,253,0.71) 71.5%, rgba(123,183,253,1) 100.2% )',
    },

    img2: {
      width: '50%',

      objectFit: 'cover',
      display: 'block',
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

    loader: {
      border: "4px solid #f3f3f3",
      borderTop: "4px solid #3498db",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      animation: "spin 2s linear infinite",
      margin: "20px auto",
    },

    heading: {
      fontWeight: '600',
      fontSize: '30px',
      color: '#333333',
      marginLeft: '4.5%',
      marginTop: '15px',
      //marginTop:'-150px'
    },

    boxt1t: {
      fontSize: '17px',
      fontWeight: '500',
      color: '#262729',
      padding: '20px',
      lineHeight: '37px',
      textAlign: 'left',
      textShadow: '1px',
      fontFamily: 'poppins',
    },
    boxt2b: {
      background: 'linear-gradient(135deg, #00C9A7, #00A3E0)',
      color: 'white',
      padding: '20px 45px',
      border: 'none',
      borderRadius: '15px',
      fontSize: '17px',
      fontWeight: '400',
      cursor: 'pointer',
      fontFamily: 'poppins',
      //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      //transition: 'all 0.3s ease-in-out',
    },

    Aoptions: {
      //display:'flex',
      marginLeft: '20px',
      paddingBottom: '40px',
      marginTop: '-20px',
      flexDirection: 'row',
      //horizontalAlign:'middle',
    },

    Icon: {
      width: '2%',
      marginRight: '5px',
    },

    additionalButtons: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '20px',  // Add some space between the buttons
    },

    boptions: {
      display: 'flex',
      flexDirection: 'row',
    },

    coptions: {
      display: 'flex',
      flexDirection: 'row',
      paddingBottom: '30px',
      marginLeft: '10px',
      marginTop: '-25px',
    },

    formt: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '30px',
      paddingTop: '20px',
      marginRight: '20px',

    },

    formb: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '30px',
      marginRight: '20px',
    },

    formth: {
      fontSize: '17px',
      fontWeight: '500',
      color: '#262729',
      //padding:'20px',
      lineHeight: '37px',
      textAlign: 'left',
      textShadow: '1px',
      fontFamily: 'poppins',
    },

    formbh: {
      fontSize: '17px',
      fontWeight: '500',
      color: '#262729',
      //padding:'20px',
      lineHeight: '37px',
      textAlign: 'left',
      textShadow: '1px',
      fontFamily: 'poppins',
    },
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background with 50% opacity
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999, // Ensures it is on top of other elements
    },
    text: {
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px', // Adds spacing between "Loading" and the quote
    },
    quote: {
      color: 'white',
      fontSize: '18px',
      fontStyle: 'italic',
      textAlign: 'center',
      padding: '0 20px', // Adds padding for better readability
    },
  };


  return (


    <div style={styles.splitScreen}>
      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>Upload Your Dataset</h2>
            {!isUploading ? (
              <>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  style={styles.uploadInput}
                />
                <button
                  className="button2"
                  onClick={handleUploadFile}
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

{showErrorPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>Error</h2>
               <p>{errMessage}</p>
                <button style={styles.closeButton} onClick={()=> setErrorPopup(false)}>
                  Close
                </button>
          </div>
        </div>
      )}

      {
        isLoading && (
          <div style={styles.overlay}>
            <p style={styles.text}>Loading</p>
            <p style={styles.quote}>{quote}</p>
          </div>

        )
      }

      <div style={styles.topPane}>
        <div id="Algorithm" style={styles.blurBackground}>
          <h1 style={styles.heading}>Algorithm Selection</h1>

          <div style={styles.boxt1}>


            <div style={{ display: 'flex', flexDirection: 'row' }}>

              <div>
                <h1 style={styles.boxt1t}>
                  Select one of the following algorithm
                </h1>
                <div style={styles.Aoptions}>

                  <div style={styles.Aoption}>
                    <img style={styles.Icon} src={Icon} alt="Logo" />
                    <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => showOptions('decisionTree')}>Decision Tree</button>
                    {clickedButton === 'decisionTree' && (
                      <>
                        <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => handleClick('dt_id3')}>ID3</button>
                        <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => handleClick('dt_c5_0')}>C5.0</button>
                      </>
                    )}
                  </div>

                  <div style={styles.Aoption}>
                    <img style={styles.Icon} src={Icon} alt="Logo" />
                    <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => { handleClick('linearRegression'); showOptions(null) }}>Linear Regression</button>
                  </div>

                  <div style={styles.Aoption}>
                    <img style={styles.Icon} src={Icon} alt="Logo" />
                    <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => showOptions('NaiveBayes')}>Naive Bayes</button>
                    {clickedButton === 'NaiveBayes' && (
                      <>
                        <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => handleClick('multinomial')}>Multinomial</button>
                        <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => handleClick('bernouli')}>Bernouli</button>
                        <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => handleClick('gaussian')}>Gaussian</button>
                      </>
                    )}
                  </div>

                  <div style={styles.Aoption}>
                    <img style={styles.Icon} src={Icon} alt="Logo" />
                    <button className="button" disabled={!(currentMenu === 'Algorithm')} onClick={() => { handleClick('knn'); showOptions(null) }}>KNN</button>
                  </div>

                </div>
              </div>


              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', marginBottom: '40px', marginRight: '30px', width: '40%' }}>
                <h1 style={{ fontSize: '15px', fontWeight: '500' }}>Selected Algorithm: {algorithm}</h1>
                <button className="button2" disabled={!(currentMenu === 'Algorithm')} onClick={() => { handleCurrentMenu("Dataset"); }}>Next</button>
              </div>



            </div>
          </div>

        </div>

        <div id="Dataset" style={styles.blurBackground}>
          <h1 style={styles.heading}>Dataset Selection</h1>
          <div style={styles.boxt1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className="custom-checkbox" style={{ marginRight: '-15px', marginLeft: '20px' }}>
                <input type="radio" disabled={!(currentMenu === 'Dataset')} name="datasetSelection" value="o"  onChange={handleDatasetType} defaultChecked />
                <span className="checkbox-label"></span>
              </label>
              <h1 style={styles.boxt1t}>
                Select from already converted dataset
              </h1>
            </div>
            <div style={styles.Aoptions}>

              {/* Show different options based on the selected algorithm */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p>{datasetNames[algorithm]}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                  <label className="custom-checkbox">
                    <input type="radio" disabled={!(currentMenu === 'Dataset')} name="datasetOption" value="1" checked={dType === '1'} onChange={handleDType} defaultChecked />
                    <span className="checkbox-label">True</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="radio" disabled={!(currentMenu === 'Dataset')} name="datasetOption" value="2" checked={dType === '2'} onChange={handleDType} />
                    <span className="checkbox-label">True/False</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="radio" disabled={!(currentMenu === 'Dataset')} name="datasetOption" value="3" checked={dType === '3'} onChange={handleDType} />
                    <span className="checkbox-label">True/False/Limit</span>
                  </label>
                </div>
              </div>
              {/* {algorithm === 'linearRegression' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>Linear Regression</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="true" defaultChecked />
                      <span className="checkbox-label">True</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalse" />
                      <span className="checkbox-label">True/False</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalseLimit" />
                      <span className="checkbox-label">True/False/Limit</span>
                    </label>
                  </div>
                </div>
              )}

              {(algorithm === 'dt_id3' || algorithm === 'dt_c5_0' || algorithm === 'gaussian') && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{datasetNames['1']}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="true" defaultChecked />
                      <span className="checkbox-label">True</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalse" />
                      <span className="checkbox-label">True/False</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalseLimit" />
                      <span className="checkbox-label">True/False/Limit</span>
                    </label>
                  </div>
                </div>
              )}

              {(algorithm === 'bernouli' || algorithm === 'multinomial') && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{datasetNames['2']}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="true" defaultChecked />
                      <span className="checkbox-label">True</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalse" />
                      <span className="checkbox-label">True/False</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalseLimit" />
                      <span className="checkbox-label">True/False/Limit</span>
                    </label>
                  </div>
                </div>
              )}

              {algorithm === 'knn' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{datasetNames[algorithm]}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="true" />
                      <span className="checkbox-label">True</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalse" />
                      <span className="checkbox-label">True/False</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" name="datasetOption" value="trueFalseLimit" />
                      <span className="checkbox-label">True/False/Limit</span>
                    </label>
                  </div>
                </div>
              )} */}

            </div>
          </div>

          <div style={styles.boxt1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className="custom-checkbox" style={{ marginRight: '-15px', marginLeft: '20px' }}>
                <input type="radio" disabled={!(currentMenu === 'Dataset')} name="datasetSelection" value="u1"  onChange={handleDatasetType} />
                <span className="checkbox-label"></span>
              </label>
              <h1 style={styles.boxt1t}>
                Convert classical dataset into triadic dataset
              </h1>
            </div>
            <div style={styles.coptions}>
              <div style={{ paddingLeft: '10px' }}>
                <div style={{ paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <p>Conversion Type</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                    <label className="custom-checkbox">
                      <input type="radio" disabled={!(currentMenu === 'Dataset')} name="conversionOption" value="1"  onChange={handleOptionChange} defaultChecked />
                      <span className="checkbox-label">True</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" disabled={!(currentMenu === 'Dataset')} name="conversionOption" value="2"  onChange={handleOptionChange} />
                      <span className="checkbox-label">True/False</span>
                    </label>
                    <label className="custom-checkbox">
                      <input type="radio" disabled={!(currentMenu === 'Dataset')} name="conversionOption" value="3"  onChange={handleOptionChange} />
                      <span className="checkbox-label">True/False/Limit</span>
                    </label>
                  </div>
                </div>
                <button className="button2" disabled={!(currentMenu === 'Dataset')} onClick={() => togglePopup(true)}>Upload Classical Dataset</button>
              </div>
            </div>
          </div>

          <div style={styles.boxt1}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label className="custom-checkbox" style={{ marginRight: '-15px', marginLeft: '20px' }}>
                <input type="radio" disabled={!(currentMenu === 'Dataset')} name="datasetSelection" value="u2" onChange={handleDatasetType} />
                <span className="checkbox-label"></span>
              </label>
              <h1 style={styles.boxt1t}>
                Upload already converted triadic dataset
              </h1>
            </div>
            <div style={styles.Aoptions}>
              <button className="button2" disabled={!(currentMenu === 'Dataset')} onClick={() => togglePopup(false)}>Upload</button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'end', margin: '30px', marginBottom: '10px', marginTop: '10px', width: '40%', paddingBottom: '0px' }}>
            <h1 style={{ fontSize: '15px', fontWeight: '500' }}>Selected Algorithm: {algorithm} </h1>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <button className="button2" disabled={!(currentMenu === 'Dataset')} onClick={() => { handleCurrentMenu("Algorithm"); }}>Back</button>
              <button className="button2" disabled={!(currentMenu === 'Dataset')} onClick={() => { handleCurrentMenu("Parameter"); handleDataset(); }}>Next</button>
            </div>
          </div>

        </div>


        <div id="Parameter" style={styles.blurBackground}>
          <h1 style={styles.heading}>Parameter Selection</h1>

          <div style={styles.boxt1}>
            <div style={styles.formt}>

              <div>
                <h1 style={styles.formth}>Triadic Operator</h1>

                <div className="custom-checkbox1">

                  <label className="custom-checkbox">
                    <input type="radio" name="option" value="op1" disabled={!(currentMenu === 'Parameter')} checked={selectedOperator === 'op1'} onChange={handleOperatorType} />
                    <span className="checkbox-label">Operator 1</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="radio" name="option" value="op2" disabled={!(currentMenu === 'Parameter')} checked={selectedOperator === 'op2'} onChange={handleOperatorType} />
                    <span className="checkbox-label">Operator 2</span>
                  </label>
                  <label className="custom-checkbox">
                    <input type="radio" name="option" value="op3" disabled={!(currentMenu === 'Parameter')} checked={selectedOperator === 'op3'} onChange={handleOperatorType} />
                    <span className="checkbox-label">Operator 3</span>
                  </label>

                </div>
              </div>


              <div className="label2">
                <label style={styles.formth}
                >
                  Enter Class Name
                </label>
                <input
                  type="text"
                  id="DatasetClass"
                  name="name"
                  required
                  disabled={!(currentMenu === 'Parameter')}
                  style={{
                    fontSize: '14px',
                    width: '80%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
              </div>

              <div className="label3">
                <label style={styles.formth}>
                  Enter Split Ratio
                </label>
                <p className="label4">Enter a value ranging from 0.1 - 1</p>
                <input
                  type="number"
                  id="splitRatioInput"
                  name="rangeInput"
                  disabled={!(currentMenu === 'Parameter')}
                  min="0.1"
                  max="1"
                  step="0.01"
                  required
                  style={{
                    fontSize: '14px',
                    width: '80%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: 'none',
                  }}
                />
              </div>
            </div>
            <h1 className="sa" >Algorithm Slected: {algorithm} </h1>

            <div style={styles.formb}>
              {algorithm === 'knn' && (
                <form
                >
                  {/* First Column: Operators, Formula, and K Value */}


                  <div style={{ display: 'flex', flexDirection: 'column', gap: '17px' }}>

                    <div className="custom-checkbox2">
                      <h1 style={styles.formbh}>Select Formula</h1>
                      <label className="custom-checkbox">
                        <input type="radio" name="option" disabled={!(currentMenu === 'Parameter')} value="minkowski" checked={selectedFormula === 'minkowski'} onChange={handleFormula} />
                        <span className="checkbox-label">Minkowski Distance</span>
                      </label>
                      <label className="custom-checkbox">
                        <input type="radio" name="option" disabled={!(currentMenu === 'Parameter')} value="euclidean" checked={selectedFormula === 'euclidean'} onChange={handleFormula} />
                        <span className="checkbox-label">Euclidean Distance</span>
                      </label>
                      <label className="custom-checkbox">
                        <input type="radio" name="option" disabled={!(currentMenu === 'Parameter')} value="manhattan" checked={selectedFormula === 'manhattan'} onChange={handleFormula} />
                        <span className="checkbox-label">Manhattan Distance</span>

                      </label>

                    </div>

                    <div>
                      <div className="cn">
                        <label
                          className="title"
                          htmlFor="k_value"
                          style={styles.formbh}
                        >
                          Enter K Value
                        </label>
                        <p style={{ marginTop: '0px', fontSize: '12px' }}>Enter Positive integer</p>
                        <input
                          type="number"
                          id="k_value"
                          name="number"
                          disabled={!(currentMenu === 'Parameter')}
                          min="1"
                          step="1"
                          required
                          style={{
                            padding: '8px',
                            fontSize: '14px',
                            width: '80%',
                            borderRadius: '5px',
                            marginBottom: '30px',
                            border: 'none',
                          }}
                        />
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
                          <p style={{ marginTop: '0px', fontSize: '12px' }}>Enter Positive integer</p>
                          <input
                            type="number"
                            id="p_value"
                            name="p_value"
                            disabled={!(currentMenu === 'Parameter')}
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

              {(algorithm === 'multinomial' || algorithm === 'bernouli') && (
                <div style={{ paddingTop: '17px' }}>
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
                      id="documentName"
                      disabled={!(currentMenu === 'Parameter')}
                      name="name"
                      required
                      style={{
                        fontSize: '14px',
                        width: '80%',
                        padding: '8px',
                        borderRadius: '5px',
                        border: 'none',
                        marginBottom: '10px',
                      }}
                    />
                  </div>
                </div>
              )}

              {algorithm === 'linearRegression' && (
                <div className="cn">
                  <label
                    className="title"
                    htmlFor="k_value"
                    style={styles.formbh}
                  >
                    Enter number of Bins
                  </label>
                  <p style={{ marginTop: '0px', fontSize: '12px' }}>Enter Positive integer</p>
                  <input
                    type="number"
                    id="k_value"
                    name="number"
                    min="1"
                    step="1"
                    required
                    defaultValue={2}
                    disabled
                    style={{
                      padding: '8px',
                      fontSize: '14px',
                      width: '80%',
                      borderRadius: '5px',
                      marginBottom: '30px',
                      border: 'none',
                    }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', paddingLeft: '30px', paddingBottom: '40px', paddingTop: '20px', gap: '30px' }}>
              <button
                className="button2" disabled={!(currentMenu === 'Parameter')} onClick={() => { handleCurrentMenu("Dataset"); }}>Back</button>
              <button
                className="button2" disabled={!(currentMenu === 'Parameter')} onClick={handleFormSubmit}>Run Algorithm</button>
            </div>


          </div>
        </div>



      </div>


      <div style={styles.bottomPane}>
        <div style={styles.boxb1}>
          <div style={{ flexDirection: 'column', width: '100%' }}>
            <img style={styles.img} src={D5} alt="Logo" />
            <h1 style={{
              fontWeight: '600',
              fontSize: '30px',
              color: '#333333',
              marginLeft: '4.5%',
              marginTop: '7px',
              marginBottom: '7px'
            }}>Triadic Truth Table</h1>
            <h1 style={styles.imgt3}>The triadic essence of meaning: the representamen as the vessel, the object as the reality it reflects, and the interpretant as the bridge of understanding, capturing the infinite dance between perception, reality, and interpretation </h1>
            <img style={styles.img} src={D6} alt="Logo" />
            <img style={{ width: '90%', marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '30px', marginTop: '40px' }} src={Wee} alt="Logo" />
            <img style={styles.img} src={D2} alt="Logo" />
          </div>
        </div>
      </div>

    </div>
  );
}

export default Settings;
