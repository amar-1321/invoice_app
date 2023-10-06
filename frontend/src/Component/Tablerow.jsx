import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Tablerow({ index, custType, rowData, updatedRowData, updateTotalValue, updateQtyColumnTotal, }) {
  const cellRefs = useRef([]);
  const totalCells = 500;
  const [code, setCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');

  const [error, setError] = useState(null);

  const [inputQtyText, setInputQtyText] = useState();


  const totalValue = rowData ? rowData.totalValue : 0;



  useEffect(() => {

    if (totalValue !== 0) {

      const updateRowData = {
        code,
        itemName,
        price,
        inputQtyText,
        totalValue
      }
      updatedRowData(index, updateRowData);

    }

  }, [code, index, inputQtyText, itemName, price, totalValue, updatedRowData])



  // console.log(custType);
  const handleKeyPress = (event, currentIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();


      const nextIndex = currentIndex + 1;


      if (nextIndex < totalCells && cellRefs.current[nextIndex]) {
        cellRefs.current[nextIndex].focus();

      }
    }


  };


  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [suggestionIndex, setSuggestionIndex] = useState(0);


  const handleChange = (e) => {
    const query = e.target.value.toLowerCase();
    setValue(query);
    if (query.length > 0) {
      // Make an API request to get suggestions
      axios.get(`http://localhost:4001/api/suggestions?q=${query}`)
        .then((response) => {
          const filteredSuggestions = response.data.filter((suggestion) =>
            suggestion.toLowerCase().startsWith(query.charAt(0))
          );
          setSuggestions(filteredSuggestions);
          setSuggestionsActive(true);
        })
        .catch((error) => {
          console.error('Error fetching suggestions:', error);
          setError(error)
        });
    } else {
      setSuggestions([]);
      setSuggestionsActive(false);
    }
  };

  const handleClick = (value) => {
    console.log('Clicked Item:', value);

    if (custType && custType.cust_type) {
      const custPrice = custType.cust_type;
      const PriceProp = custPrice;
      axios.get(`http://localhost:4001/fetchItemData/${value}`)
        .then((response) => {
          // Handle the response data as needed
          const itemData = response.data;
          console.log('Item Data:', itemData);
          setCode(itemData.code);
          setPrice(itemData[PriceProp])

        })
        .catch((error) => {
          console.error('Error fetching item data:', error);
        });

    } else {
      const MySwal = withReactContent(Swal)
      MySwal.fire({
        title: <strong>Customer not Select</strong>,
        html: <i>Please Select Customer</i>,
        icon: 'info'
      });

    }
    // Make an Axios GET request to fetch item data
    setValue(value);
    setItemName(value)
    setSuggestions([]);
    setSuggestionsActive(false);
  };


  const handleKeyDown = (e) => {
    if (e.keyCode === 38) {
      // UP ARROW
      if (suggestionIndex > 0) {
        setSuggestionIndex(suggestionIndex - 1);
      }
    } else if (e.keyCode === 40) {
      // DOWN ARROW
      if (suggestionIndex < suggestions.length - 1) {
        setSuggestionIndex(suggestionIndex + 1);
      }
    } else if (e.keyCode === 13) {

      e.preventDefault();
      // ENTER
      if (suggestions[suggestionIndex]) {
        const selectedSuggestion = suggestions[suggestionIndex];
        setValue(selectedSuggestion);
        setItemName(selectedSuggestion)
        setSuggestions([]);
        setSuggestionsActive(false);

        if (custType && custType.cust_type) {
          const custPrice = custType.cust_type;
          const PriceProp = custPrice;
          axios.get(`http://localhost:4001/fetchItemData/${selectedSuggestion} `)
            .then((response) => {
              // Handle the response data as needed
              const itemData = response.data;
              console.log('Item Data:', itemData);
              setCode(itemData.code);
              setPrice(itemData[PriceProp])
              setItemName(itemData.itemName);
            })
            .catch((error) => {
              console.error('Error fetching item data:', error);
            });

        } else {
          const MySwal = withReactContent(Swal)
          MySwal.fire({
            title: <strong>Customer not Select</strong>,
            html: <i>Please Select Customer</i>,
            icon: 'info'
          });

        }
      }
    }
  };




  useEffect(() => {

    const numericPrice = parseFloat(price) || 0;
    const numericQty = parseFloat(inputQtyText) || 0;
    const newTotalValue = numericPrice * numericQty;

    updateTotalValue(index, newTotalValue);

  }, [rowData.price, inputQtyText, price, updateTotalValue, index]);

  useEffect(() => {

    // console.log("Total Value", totalValue);
  }, [totalValue])

  useEffect(() => {

    const numericQty = parseFloat(inputQtyText) || 0;
    updateQtyColumnTotal(index, numericQty);



  }, [index, inputQtyText, updateQtyColumnTotal]);




  if (error) {
    return <div>Error: {error}</div>;
  }

  // Qty Get





  return (
    <tr>

      <td data-toggle="class form-group" style={{ margin: "0px", width: "80px", borderRadius: "0px", height: "26px", }}>
        <div className="">
          <div className="input-group input-group-unstyled">

            <input
              type="text"
              name={`code${index}`}
              id="icode1"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="form-control "
              ref={el => (cellRefs.current[index] = el)}
              onKeyDown={e => handleKeyPress(e, index)}

              style={{ width: "80px", margin: "0px", borderRadius: "0px", height: "26px", border: "none" }}
            />



          </div>
        </div>
      </td>

      <td data-toggle="class form-group"
        style={{ width: "350px", margin: "0px", borderRadius: "0px", height: "26px"}}>
        <div className="autocomplete" >
          <input
            type="text"
            className="form-control"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{ height: "26px", margin: "0px", width: "99%", borderRadius: "0px", border: "none" }}
            name="itemName"
            id="itemName"

          />

        </div>
        <div style={{ marginRight: "350px" }}>
          {suggestionsActive && (
            <div className="suggestions" style={{
              position: "absolute",
              listStyleType: 'none',
              padding: '0',
              margin: '0',
              border: '1px solid #ccc',

              borderRadius: '0 0 4px 4px',
              width: '350px',
              display: "inline-block"
            }}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={index === suggestionIndex ? 'active' : ''}
                  onClick={() => handleClick(suggestion)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',

                    backgroundColor: index === suggestionIndex ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>


      </td>



      <td data-toggle="class"
        style={{ width: "83px", margin: "0px", height: "26px", borderRadius: "0px", }}
      >
        <input
          type="text"
          name={`qty${index}`}
          id="qty1"
          value={inputQtyText}
          onChange={e => setInputQtyText(e.target.value)}
          ref={el => (cellRefs.current[index + 1] = el)}
          onKeyDown={e => handleKeyPress(e, index + 1)}
          tabIndex={index + 2} // Each input field gets a unique tabIndex

          className=" form-control  qty number_only  "
          style={{
            width: "100%",
            margin: "0px",
            height: "26px",
            borderRadius: "0px",
            border: "none"
          }} />
      </td>

      <td data-toggle="class" style={{ margin: "0px", width: "90Px", height: "26px", borderRadius: "0px", }}>
        <input
          type="text"
          name="uqc1"
          id="uqc1"
          value={""}
          ref={el => (cellRefs.current[index + 2] = el)}
          onKeyDown={e => handleKeyPress(e, index + 2)}
          tabIndex={index + 3}

          className="form-control   "
          style={{ margin: "0px", width: "100%", height: "26px", borderRadius: "0px", border: "none" }} />
      </td>

      <td data-toggle="class"
        style={{ margin: "0px", height: "26px", width: "90px", borderRadius: "0px", }}
      >


        <input
          type="text"
          className="form-control"
          size="58"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          ref={el => (cellRefs.current[index + 3] = el)}
          onKeyDown={e => handleKeyPress(e, index + 3)}
          tabIndex={index + 4} // Each input field gets a unique tabIndex

          style={{ margin: "0px", height: "26px", width: "100%", borderRadius: "0px", border: "none" }}
          name={`price${index}`}
          id="price" />





      </td>


      <td data-toggle="class"
        style={{ margin: "0px", height: "26px", width: "100px", borderRadius: "0px", }}
      >



        <input
          type="text"
          className="form-control"
          size="58"
          Value={totalValue}
          ref={el => (cellRefs.current[index + 4] = el)}
          onKeyDown={e => handleKeyPress(e, index + 4)}
          tabIndex={index + 5} // Each input field gets a unique tabIndex

          style={{ margin: "0px", height: "26px", width: "100%", borderRadius: "0px", border: "none" }}
          name={`totalprice${index}`}
          id="totalprice" />

      </td>




      <td data-toggle="class" style={{ margin: "0px", width: "30px" }}>

        <a href="##" style={{ textAlign: "center", margin: "0px", height: "26px", fontSize: "14px" }} className="btn btn-default hidelink"
          type="button" value="Delete">X</a>
      </td>


    </tr>
  )
}

export default Tablerow