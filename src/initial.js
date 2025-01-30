import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './initial.css'
// import Csp from './images/csp.jpeg';
// import Csp3 from './images/csp3.png';
// import Csp4 from './images/csp4.png';
// import D1 from './images/d1.jpeg';
// import D2 from './images/d2.png';
// import D3 from './images/d3.jpeg';
// import D4 from './images/d4.png';
import D7 from './images/d7.png';
// import D8 from './images/d8.png';
import D9 from './images/d9.png';
import A1 from './images/a1.png';
import A2 from './images/a2.png';
// import Wee from './images/weel.png';
// import b3 from './images/b3.png';/* Smaller image */

function Initial() {

  const navigate = useNavigate();
  const location = useLocation();
  const [showErrorPopup, setErrorPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [quote, setQuote] = useState('');
  const [selectedOperator, setOperatorType] = useState("op1");
  const motivationalQuotes = [
    '"The essence of truth lies in its resistance to being ignored" (CP 2.139, c.1902)',
    "If a man burns to learn and sets himself to comparing his ideas with experimental results in order that he may correct those ideas, every scientific man will recognize him as a brother, no matter how small his knowledg maybe.",
    '"Triadic Logic is universally true" (Peirce\'s Logical Notebook, 1909)'
  ];

  const handleOperatorType = (e) => {
    setOperatorType(e.target.value);
  }

  const { result } = location.state || {};
  let parsed_result = {};
  try {
    parsed_result = JSON.parse(result || "{}");
  } catch (error) {
    console.error("Error parsing result:", error);
    let msg = `Error parsing result: ${error}`;
    alert(msg);
  }

  console.log("Initital Result: ", parsed_result);


  const accuracy = (parsed_result.accuracy * 100).toFixed(2) || 0;
  const precision = (parsed_result.precision * 100).toFixed(2) || 0;
  const recall = (parsed_result.recall * 100).toFixed(2) || 0;
  const rate_of_learning = (parsed_result.rate_of_learning * 100).toFixed(2) || 0;
  const semi_accuracy = (parsed_result.semi_accuracy * 100).toFixed(2) || 0;
  const semi_precision = (parsed_result.semi_precision * 100).toFixed(2) || 0;
  const semi_recall = (parsed_result.semi_recall * 100).toFixed(2) || 0;

  const labels_obj = parsed_result.labels || {};
  const matrix = parsed_result.matrix || [];
  const actual = parsed_result.actual || [];
  const predicted = parsed_result.predicted || [];
  const labels = Object.entries(labels_obj).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, []);

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
      marginTop: '9%',
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

    img2: {
      width: '100%',
      fontSize: '20px',
      objectFit: 'cover',
      border: '1px solid black',
      display: 'block',
      padding: '20px',
    },

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

  const resolveLimit = async () => {
    handleLoading(true);
    const auto = true;
    const percentage = Number(document.getElementById("percentageInput").value) / 100;
    const sp = Number(selectedOperator[2]);
    const data = {
      actual: actual,
      predicted: predicted,
      percentage: percentage,
      auto: auto,
      op_type: sp || 1
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/resolveLimit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.text();
      console.log("Response from server:", result);
      if (response.ok) {
        localStorage.setItem("initResult", JSON.stringify(parsed_result));
        const res = {
          'initial': JSON.stringify(parsed_result),
          'final': result
        }
        const data = JSON.stringify(res);
        console.log("Initial Screen: ", data);
        navigate("/final", { state: { data } });
      }
      else {
        let parsed_result = JSON.parse(result || "{}");
        let message = `${parsed_result.error}`;
        setErrMessage(message);
        setErrorPopup(true);
      }
      handleLoading(false);
    } catch (error) {
      console.error("Error sending data:", error);
      handleLoading(false);
    }
  };

  const handleLoading = (enable) => {
    setIsLoading(enable);
    if (!enable) return;
    const randomQuote =
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setQuote(randomQuote);
  }

  return (
    <>
      <div style={styles.splitScreen}>

        <div style={styles.Box1}>

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

            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '3.6%', marginLeft: '0%' }}>
              <h1 style={styles.img1h}>Triadic confusion metrix for binary classes: </h1>
              <img style={styles.img1} src={D7} alt="Logo" />
            </div>


          </div>

        </div>

        <div style={styles.Box2}>

          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

              <h1 style={styles.heading}>Semi Triadic Results</h1>
              <div style={styles.Box21}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                  <div>
                    <h1 className="buttonn">Accuracy: {semi_accuracy}%</h1>
                    <h1 className="buttonn">Precision: {semi_precision}%</h1>
                  </div>
                  <div style={{ borderLeft: '1px solid' }}>
                    <h1 className="buttonn1">Recall: {semi_recall}%</h1>
                    <h1 className="buttonn1">Rate Of Learning: {rate_of_learning}%</h1>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '2%', marginRight: '05%' }}>
              <h1 style={styles.img1h}>Semi Triadic Formulae: </h1>
              <img style={styles.img2} src={A1} alt="Logo" />
            </div>

          </div>

        </div>

        <div style={styles.Box2}>

          <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>

            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>

              <h1 style={styles.heading}>Fully Triadic Results</h1>
              <div style={styles.Box21}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%' }}>
                  <div>
                    <h1 className="buttonn">Accuracy: {accuracy}%</h1>
                    <h1 className="buttonn">Precision: {precision}%</h1>
                  </div>
                  <div style={{ borderLeft: '1px solid' }}>
                    <h1 className="buttonn1">Recall: {recall}%</h1>
                    <h1 className="buttonn1">Rate Of Learning: {rate_of_learning}%</h1>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '2%', marginRight: '05%' }}>
              <h1 style={styles.img1h}>Fully Triadic Formulae: </h1>
              <img style={styles.img2} src={A2} alt="Logo" />
            </div>

          </div>

        </div>

        <div style={styles.Box3}>

          <div>
            <h1 style={styles.heading}>Resolve Limit</h1>
            <p style={{ marginTop: '-14px', marginBottom: '4px' }}>Slect one of the following method t resolve the limit</p>
            <div class="checkbox-containerr">
              <h1 className="button22">Resolve(With Triadic Operators)</h1>
              <label class="custom-checkboxx">
                <input type="radio" name="option" value="op1" defaultChecked onChange={handleOperatorType} />
                <span class="checkbox-labell">V1</span>
              </label>

              <label class="custom-checkboxx">
                <input type="radio" name="option" value="op2" onChange={handleOperatorType} />
                <span class="checkbox-labell">V2</span>
              </label>

              <label class="custom-checkboxx">
                <input type="radio" name="option" value="op3" onChange={handleOperatorType} />
                <span class="checkbox-labell">V3</span>
              </label>
            </div>
          </div>

          <div style={{ marginLeft: '53px', marginRight: '50px', marginTop: '145px' }}>
            <label
              htmlFor="k_value"
              className="button22"
            >
              Domain Expert
            </label>
            <p style={{ marginTop: '15px' }}>Enter Positive integer (Enter Value from 1-100)</p>
            <input
              type="number"
              id="percentageInput"
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
                marginBottom: '30px',
                border: '1px solid black ',
              }} />
          </div>

          <div>
            <h1 style={styles.img1h}>Triadic Treatment of Doubt with Limit degree:</h1>
            <img style={styles.img3} src={D9} alt="Logo" />
          </div>


        </div>
        <div style={{ marginBottom: '9%', display: 'flex', justifyContent: 'center', zIndex: '100' }}>
          <button className="RunA" onClick={resolveLimit}>Next</button>
        </div>

      </div>

      {showErrorPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupContent}>
            <h2>Error</h2>
            <p>{errMessage}</p>
            <button style={styles.closeButton} onClick={() => setErrorPopup(false)}>
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
    </>
  );
}

export default Initial;
