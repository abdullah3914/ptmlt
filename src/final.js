import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import './final.css'

function Final() {
     const [showErrorPopup, setErrorPopup] = useState(false);
           const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state || {};
  let parsed_result = {};
  try {
    parsed_result = JSON.parse(result.data || "{}");
  } catch (error) {
    console.error("Error parsing result:", error);
    let msg = `Error parsing result: ${error}`;
    alert(msg);
  }
  console.log("Final Screen: ", parsed_result);

  const oldResult = JSON.parse(parsed_result.initial || "{}");
  const newResult = JSON.parse(parsed_result.final || "{}");


  const init_accuracy = (oldResult.accuracy * 100).toFixed(2) || 0;
  const init_precision = (oldResult.precision * 100).toFixed(2) || 0;
  const init_recall = (oldResult.recall * 100).toFixed(2) || 0;
  const init_rate_of_learning = (oldResult.rate_of_learning * 100).toFixed(2) || 0;
  const init_semi_accuracy = (oldResult.semi_accuracy * 100).toFixed(2) || 0;
  const init_semi_precision = (oldResult.semi_precision * 100).toFixed(2) || 0;
  const init_semi_recall = (oldResult.semi_recall * 100).toFixed(2) || 0;

  // const init_labels_obj = oldResult.labels || {};
  const init_matrix = oldResult.matrix || [];
  // const init_actual = oldResult.actual || [];
  // const init_predicted = oldResult.predicted || [];
  // const init_labels = Object.entries(init_labels_obj).reduce((acc, [key, value]) => {
  //   acc[value] = key;
  //   return acc;
  // }, []);

  const accuracy = (newResult.accuracy * 100).toFixed(2) || 0;
  const precision = (newResult.precision * 100).toFixed(2) || 0;
  const recall = (newResult.recall * 100).toFixed(2) || 0;
  const rate_of_learning = (newResult.rate_of_learning * 100).toFixed(2) || 0;
  const semi_accuracy = (newResult.semi_accuracy * 100).toFixed(2) || 0;
  const semi_precision = (newResult.semi_precision * 100).toFixed(2)|| 0;
  const semi_recall = (newResult.semi_recall * 100).toFixed(2) || 0;


  const labels_obj = newResult.labels || {};
  const matrix = newResult.matrix || [];
  // const actual = newResult.actual || [];
  // const predicted = newResult.predicted || [];
  const labels = Object.entries(labels_obj).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, []);

  // const labels = ['fdajsjfdal', 'fadijkgadsf'];

  const goToAlgo = () => {
    navigate('/');
  }

  const handleDownloadPDF = async () => {
    try {
      // Create a temporary container for the specific divs
      const tempDiv = document.createElement("div");
      tempDiv.style.position = "absolute";
      tempDiv.style.top = "-9999px"; // Move it out of the viewport
      tempDiv.style.left = "-9999px";
      tempDiv.style.background = "white";
      tempDiv.style.zIndex = "-1";
      tempDiv.style.width = "100%";
  
      const div1 = document.getElementById("confusionMatrix")?.cloneNode(true);
      const div2 = document.getElementById("SemiTriadicResults")?.cloneNode(true);
      const div3 = document.getElementById("FullyTriadicResults")?.cloneNode(true);
  
      if (div1) tempDiv.appendChild(div1);
      if (div2) tempDiv.appendChild(div2);
      if (div3) tempDiv.appendChild(div3);
  
      document.body.appendChild(tempDiv);
  
      const canvas = await html2canvas(tempDiv, {
        scale: 2,  
        useCORS: true, 
        windowWidth: tempDiv.scrollWidth,
        windowHeight: tempDiv.scrollHeight,
        backgroundColor: 'transparent'
      });
  
      // Remove the temporary container
      document.body.removeChild(tempDiv);
 
      // Generate PDF
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
  
      // Check if content overflows and add pages
      let yOffset = 0; // Start at the top of the first page
      while (yOffset < canvas.height) {
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = Math.min(canvas.height - yOffset, canvas.width * 1.414); // A4 aspect ratio
  
        const pageCtx = pageCanvas.getContext("2d");
        pageCtx.drawImage(canvas, 0, -yOffset, canvas.width, canvas.height);
  
        const pageData = pageCanvas.toDataURL("image/png");
  
        if (yOffset > 0) pdf.addPage(); // Add a new page for overflow
        pdf.addImage(pageData, "PNG", 0, 0, pdfWidth, (pageCanvas.height * pdfWidth) / canvas.width);
  
        yOffset += pageCanvas.height;
      }
  
      // Save the PDF
      pdf.save("result.pdf");
    } catch (error) {
      setErrorPopup(true);
      let msg = `Error capturing and generating PDF: ${error}`;
      setErrMessage(msg);
    }
  };
  


  const styles = {
    splitScreen: {
      display: 'flex',
      flexDirection: 'column',  // Ensure content is stacked vertically
      height: '100vh',  // Make the container take up the full viewport height
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

    topPane: {
      flexDirection: 'column',
      width: '100%',  // Full width
      height: '60%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop: '8%',
      backgroundImage: '{b3}',
      marginRight: '5%',
      marginLeft: '5%',
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '20px',
      borderColor: '  #dddddd',
      backgroundColor: 'none',
      backdropFilter: 'blur(5px)',
      zIndex: '10',
      justifyContent: 'center',
      alignItems: 'start',
    },



    boxt1: {
      //border:'solid',
      //borderWidth:'1px',
      //backdropFilter: 'blur(5px)',   
      margin: '40px',
      marginTop: '0px',
      width: '60%',
      borderRadius: '20px',
      background: 'linear-gradient(90deg, rgba(0, 255, 72, 0.24) 0%, rgba(0, 204, 255, 0.33) 100%)',
    },

    boxt2: {
      margin: '40px',
      marginTop: '0px',
      width: '60%',
      borderRadius: '20px',
      background: 'linear-gradient(90deg, rgba(0, 255, 72, 0.24) 0%, rgba(0, 204, 255, 0.33) 100%)',
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
      margin: '30px',
      fontFamily: 'poppins',
      //boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      //transition: 'all 0.3s ease-in-out',
    },

    boxt1t: {
      fontSize: '22px',
      fontWeight: '500',
      color: '#262729',
      padding: '20px',
      lineHeight: '37px',
      textAlign: 'center',
      textShadow: '1px',
      fontFamily: 'poppins',
    },

    bottomPane: {
      width: '30%',  // Full width
      height: '80%',  // Take up 50% of the height
      display: 'flex',
      marginTop: '8%',
      marginLeft: '2%',
      marginRight: '4%',
      flexDirection: 'column',
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

    boxb1: {
      width: '50%',  // Full width
      height: '5%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop: '0%',
      marginLeft: '8%',
      marginRight: '0%',
      zIndex: '10',
      justifyContent: 'center',
      alignItems: 'center',
      //marginBottom:'56%',
    },

    img: {
      width: '50%',
      border: 'solid',
      marginTop: '20px',
      borderWidth: '1px',
      borderColor: '#dddddd',
      borderRadius: '320px',
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

    // img2: {
    //   width: '50%',
    //   objectFit: 'cover',
    //   display: 'block',
    // },
    // img2: {
    //   fontSize: '20px',
    //   width: '100%',
    //   border: '1px solid black',
    //   padding: '20px',
    // },

    heading: {
      fontWeight: '600',
      fontSize: '30px',
      color: '#333333',
      //marginLeft:'3%',
      //marginTop:'55px',
      marginBottom: '25px',
      borderLeft: '3px solid black',
      paddingLeft: '10px',
      //marginTop:'-150px'
    },

    Box1: {
      flexDirection: 'column',
      width: 'auto',  // Full width
      height: '65%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop: '8%',
      marginRight: '5%',
      marginLeft: '5%',
      paddingTop: '10px',
      paddingBottom: '40px',
      paddingLeft: '20px',
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '20px',
      borderColor: '  #dddddd',
      backgroundColor: 'none',
      backdropFilter: 'blur(5px)',
      zIndex: '10',
      justifyContent: 'center',
      alignItems: 'start',
    },

    img1: {
      fontSize: '20px',
      width: '90%',
    },

    img1h: {
      fontWeight: '500',
      fontSize: '20px',
      color: '#333333',
      paddingBottom: '3px',
      textDecoration: 'underline',
      //marginLeft:'3%',
      //marginTop:'55px',
      marginBottom: '5px',
    },

    Box2: {
      flexDirection: 'column',
      width: 'auto',  // Full width
      height: '65%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop: '4%',
      marginRight: '5%',
      marginLeft: '5%',
      paddingTop: '40px',
      paddingBottom: '40px',
      paddingLeft: '40px',
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '20px',
      borderColor: '  #dddddd',
      backgroundColor: 'none',
      backdropFilter: 'blur(5px)',
      zIndex: '10',
      justifyContent: 'center',
      alignItems: 'start',
    },

    Box21: {
      borderRadius: '20px',
      width: '90%',
      paddingLeft: '30px',
      border: '1px solid',
      background: 'linear-gradient(135deg,rgba(0, 201, 167, 0.38),rgba(0, 164, 224, 0.37))',
    },

    results: {

    },
    Box3: {
      flexDirection: 'row',
      width: 'auto',  // Full width
      height: '65%',  // Take up 50% of the height
      //backgroundColor: '#f0f0f0',  // Optional background for visibility
      display: 'flex',
      marginTop: '4%',
      marginRight: '5%',
      marginLeft: '5%',
      paddingTop: '40px',
      paddingBottom: '30px',
      paddingLeft: '40px',
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '20px',
      borderColor: '  #dddddd',
      backgroundColor: 'none',
      backdropFilter: 'blur(5px)',
      zIndex: '10',
      justifyContent: 'left',
      alignItems: 'start',
    },

    img3: {
      width: '90%',
      marginTop: '0px',
    }
  };

  return (
    <>
      <div style={styles.splitScreen}>

        <div id="confusionMatrix" style={styles.Box1}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: '16%', width: '100%' }}>

            <div>
              <h1 style={styles.heading}>Initial Confusion Matrix</h1>
              <table className="confusion-matrix">
                <thead>
                  <tr>
                    <th rowSpan="2">Actual</th>
                    <th colSpan="6">Predicted</th>
                  </tr>
                  <tr>
                    <th>{labels[0]}/T</th>
                    <th>{labels[0]}/F</th>
                    <th>{labels[0]}/L</th>
                    <th>{labels[1]}/T</th>
                    <th>{labels[1]}/F</th>
                    <th>{labels[1]}/L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{labels[0]}/T</th>
                    <td>{init_matrix?.[0]?.[0] || 0}</td>
                    <td>{init_matrix?.[0]?.[1] || 0}</td>
                    <td>{init_matrix?.[0]?.[2] || 0}</td>
                    <td>{init_matrix?.[0]?.[3] || 0}</td>
                    <td>{init_matrix?.[0]?.[4] || 0}</td>
                    <td>{init_matrix?.[0]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[0]}/F</th>
                    <td>{init_matrix?.[1]?.[0] || 0}</td>
                    <td>{init_matrix?.[1]?.[1] || 0}</td>
                    <td>{init_matrix?.[1]?.[2] || 0}</td>
                    <td>{init_matrix?.[1]?.[3] || 0}</td>
                    <td>{init_matrix?.[1]?.[4] || 0}</td>
                    <td>{init_matrix?.[1]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[0]}/L</th>
                    <td>{init_matrix?.[2]?.[0] || 0}</td>
                    <td>{init_matrix?.[2]?.[1] || 0}</td>
                    <td>{init_matrix?.[2]?.[2] || 0}</td>
                    <td>{init_matrix?.[2]?.[3] || 0}</td>
                    <td>{init_matrix?.[2]?.[4] || 0}</td>
                    <td>{init_matrix?.[2]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[1]}/T</th>
                    <td>{init_matrix?.[3]?.[0] || 0}</td>
                    <td>{init_matrix?.[3]?.[1] || 0}</td>
                    <td>{init_matrix?.[3]?.[2] || 0}</td>
                    <td>{init_matrix?.[3]?.[3] || 0}</td>
                    <td>{init_matrix?.[3]?.[4] || 0}</td>
                    <td>{init_matrix?.[3]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[1]}/F</th>
                    <td>{init_matrix?.[4]?.[0] || 0}</td>
                    <td>{init_matrix?.[4]?.[1] || 0}</td>
                    <td>{init_matrix?.[4]?.[2] || 0}</td>
                    <td>{init_matrix?.[4]?.[3] || 0}</td>
                    <td>{init_matrix?.[4]?.[4] || 0}</td>
                    <td>{init_matrix?.[4]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[1]}/L</th>
                    <td>{init_matrix?.[5]?.[0] || 0}</td>
                    <td>{init_matrix?.[5]?.[1] || 0}</td>
                    <td>{init_matrix?.[5]?.[2] || 0}</td>
                    <td>{init_matrix?.[5]?.[3] || 0}</td>
                    <td>{init_matrix?.[5]?.[4] || 0}</td>
                    <td>{init_matrix?.[5]?.[5] || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h1 style={styles.heading}>Final Confusion Matrix</h1>
              <table className="confusion-matrix">
                <thead>
                  <tr>
                    <th rowSpan="2">Actual</th>
                    <th colSpan="6">Predicted</th>
                  </tr>
                  <tr>
                    <th>{labels[0]}/T</th>
                    <th>{labels[0]}/F</th>
                    <th>{labels[0]}/L</th>
                    <th>{labels[1]}/T</th>
                    <th>{labels[1]}/F</th>
                    <th>{labels[1]}/L</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{labels[0]}/T</th>
                    <td>{matrix?.[0]?.[0] || 0}</td>
                    <td>{matrix?.[0]?.[1] || 0}</td>
                    <td>{matrix?.[0]?.[2] || 0}</td>
                    <td>{matrix?.[0]?.[3] || 0}</td>
                    <td>{matrix?.[0]?.[4] || 0}</td>
                    <td>{matrix?.[0]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[0]}/F</th>
                    <td>{matrix?.[1]?.[0] || 0}</td>
                    <td>{matrix?.[1]?.[1] || 0}</td>
                    <td>{matrix?.[1]?.[2] || 0}</td>
                    <td>{matrix?.[1]?.[3] || 0}</td>
                    <td>{matrix?.[1]?.[4] || 0}</td>
                    <td>{matrix?.[1]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[0]}/L</th>
                    <td>{matrix?.[2]?.[0] || 0}</td>
                    <td>{matrix?.[2]?.[1] || 0}</td>
                    <td>{matrix?.[2]?.[2] || 0}</td>
                    <td>{matrix?.[2]?.[3] || 0}</td>
                    <td>{matrix?.[2]?.[4] || 0}</td>
                    <td>{matrix?.[2]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[1]}/T</th>
                    <td>{matrix?.[3]?.[0] || 0}</td>
                    <td>{matrix?.[3]?.[1] || 0}</td>
                    <td>{matrix?.[3]?.[2] || 0}</td>
                    <td>{matrix?.[3]?.[3] || 0}</td>
                    <td>{matrix?.[3]?.[4] || 0}</td>
                    <td>{matrix?.[3]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[1]}/F</th>
                    <td>{matrix?.[4]?.[0] || 0}</td>
                    <td>{matrix?.[4]?.[1] || 0}</td>
                    <td>{matrix?.[4]?.[2] || 0}</td>
                    <td>{matrix?.[4]?.[3] || 0}</td>
                    <td>{matrix?.[4]?.[4] || 0}</td>
                    <td>{matrix?.[4]?.[5] || 0}</td>
                  </tr>
                  <tr>
                    <th>{labels[1]}/L</th>
                    <td>{matrix?.[5]?.[0] || 0}</td>
                    <td>{matrix?.[5]?.[1] || 0}</td>
                    <td>{matrix?.[5]?.[2] || 0}</td>
                    <td>{matrix?.[5]?.[3] || 0}</td>
                    <td>{matrix?.[5]?.[4] || 0}</td>
                    <td>{matrix?.[5]?.[5] || 0}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

        <div id="SemiTriadicResults" style={styles.Box2}>

          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

              <h1 style={styles.heading}>Semi Triadic Results (Initial)</h1>
              <div style={styles.Box21}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                  <div>
                    <h1 className="buttonn">Accuracy: {init_semi_accuracy}%</h1>
                    <h1 className="buttonn">Precision: {init_semi_precision}%</h1>
                  </div>
                  <div style={{ borderLeft: '1px solid' }}>
                    <h1 className="buttonn11">Recall: {init_semi_recall}%</h1>
                    <h1 className="buttonn11">Rate Of Learning: {init_rate_of_learning}%</h1>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

              <h1 style={styles.heading}>Semi Triadic Results (Final)</h1>
              <div style={styles.Box21}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                  <div>
                    <h1 className="buttonn">Accuracy: {semi_accuracy}%</h1>
                    <h1 className="buttonn">Precision: {semi_precision}%</h1>
                  </div>
                  <div style={{ borderLeft: '1px solid' }}>
                    <h1 className="buttonn11">Recall: {semi_recall}%</h1>
                    <h1 className="buttonn11">Rate Of Learning: {rate_of_learning}%</h1>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div id="FullyTriadicResults" style={styles.Box2}>

          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

              <h1 style={styles.heading}>Fully Triadic Results (Initial)</h1>
              <div style={styles.Box21}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                  <div>
                    <h1 className="buttonn">Accuracy: {init_accuracy}%</h1>
                    <h1 className="buttonn">Precision: {init_precision}%</h1>
                  </div>
                  <div style={{ borderLeft: '1px solid' }}>
                    <h1 className="buttonn11">Recall: {init_recall}%</h1>
                    <h1 className="buttonn11">Rate Of Learning: {init_rate_of_learning}%</h1>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

              <h1 style={styles.heading}>Fully Triadic Results (Final)</h1>
              <div style={styles.Box21}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                  <div>
                    <h1 className="buttonn">Accuracy: {accuracy}%</h1>
                    <h1 className="buttonn">Precision: {precision}%</h1>
                  </div>
                  <div style={{ borderLeft: '1px solid' }}>
                    <h1 className="buttonn11">Recall: {recall}%</h1>
                    <h1 className="buttonn11">Rate Of Learning: {rate_of_learning}%</h1>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div style={{ marginBottom: '9%', display: 'flex', justifyContent: 'center', zIndex: '100' }}>
          <button className="RunA" onClick={goToAlgo}>Run Algorithm Again</button>
          <button className="RunA" onClick={handleDownloadPDF} style={{ marginLeft: '10px' }}  >    Download  </button>
        </div>


      </div>

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
    </>
  );
}

export default Final;
