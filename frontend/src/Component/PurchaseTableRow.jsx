
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'


function PurchaseTableRow({ index, PurchaserowData, updatedRowData, data, updateTotalValue, updateQtyColumnTotal }) {
  const cellRefs = useRef([]);
  const totalCells = 500;


  // const [suggestions, setSuggestions] = useState([]);


  const [code, setCode] = useState('');
  const [itemName, setItemName] = useState('');


  const [error, setError] = useState(null);

  const [inputQtyText, setInputQtyText] = useState('');
  const [inputPriceText, setInputPriceText] = useState("");
  const [Transportcost, setTransportCost] = useState('');
  const [discount, setDiscount] = useState('');


  const totalValue = PurchaserowData ? PurchaserowData.totalValue : 0;


  useEffect(() => {
    if (totalValue !== 0) {
      const updateRowData = {
        code,
        itemName,
        inputPriceText,
        inputQtyText,
        discount,
        Transportcost,
        totalValue,
       
      };

      updatedRowData(index, updateRowData);
    }
  }, [Transportcost, code, discount, index, inputPriceText, inputQtyText, itemName, totalValue, updatedRowData]);


  const handleKeyPress = (event, currentIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const nextIndex = currentIndex + 1;

      if (nextIndex < totalCells && cellRefs.current[nextIndex]) {
        cellRefs.current[nextIndex].focus();
     
      }
    }


  };



  // useEffect(() => {


  //   if (query) {
  //     axios.get(`http://localhost:4001/api/suggestions?q=${query}`)
  //       .then(response => {
  //         setSuggestions(response.data);
  //       })
  //       .catch(error => {
  //         console.error('API error: ', error);
  //       });
  //   } else {
  //     setSuggestions([]);
  //   }

  //   const handleClick = (event) => {
  //     if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
  //         setIsDropdownOpen(false)
  //     }
  // };
  //  document.addEventListener("click", handleClick);
  // return () => {
  //     document.removeEventListener("click", handleClick)
  // }


  // }, [query]);

  // const handleSuggestionClick = (itemName) => {
  //   // console.log("click event:", itemName);

  //   axios.get(`http://localhost:4001/fetchItemData/${itemName}`)
  //     .then(response => {
  //       setSelectedItemData(response.data);
  //       setCode(response.data.code);
  //       setItemName(response.data.itemName);
  //       setCategory(response.data.category);
  //       setQuery(itemName);

  //       setIsDropdownOpen(false);
  //       console.log(response.data)
  //     })
  //     .catch(error => {
  //       console.error('API error: ', error);
  //     });


  // };

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
        });
    } else {
      setSuggestions([]);
      setSuggestionsActive(false);
    }
  };

  const handleClick = (value) => {
    console.log('Clicked Item:', value);

    // Make an Axios GET request to fetch item data
    axios.get(`http://localhost:4001/fetchItemData/${value}`)
      .then((response) => {
        // Handle the response data as needed
        const itemData = response.data;
        console.log('Item Data:', itemData);
        setCode(itemData.code);

      })
      .catch((error) => {
        console.error('Error fetching item data:', error);
        setError(error);
      });

    setValue(value);
    setItemName(value);
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

        setSuggestions([]);
        setSuggestionsActive(false);
        axios.get(`http://localhost:4001/fetchItemData/${selectedSuggestion}`)
          .then((response) => {
            // Handle the response data as needed
            const itemData = response.data;
            console.log('Item Data:', itemData);

            setItemName(itemData.itemName);
            setCode(itemData.code)
          })
          .catch((error) => {
            console.error('Error fetching item data:', error);
          });
      }
    }
  };




  // ********* Total Value ********

  useEffect(() => {

    const numericPrice = parseFloat(inputPriceText) || 0;
    const numericQty = parseFloat(inputQtyText) || 0;
    const numericDisc = parseFloat(discount) || 0;
    const numericTransCost = parseFloat(Transportcost) || 0;
    const newTotalValue = numericPrice * numericQty;
    const discountedTotalPrice = newTotalValue - numericDisc;
    const newRowTotalPrice = discountedTotalPrice + numericTransCost;

    updateTotalValue(index, newRowTotalPrice);


  }, [PurchaserowData.inputPriceText, Transportcost, discount, index, inputPriceText, inputQtyText, updateTotalValue]);



  useEffect(() => {
    // Calculate the total count for the quantity column
    const numericQty = parseFloat(inputQtyText) || 0;
    updateQtyColumnTotal(index, numericQty);




  }, [index, inputQtyText, updateQtyColumnTotal]);






  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleQtyChange = (e) => {
    setInputQtyText(e.target.value);
  };

  const handlePriceChange = (e) => {
    setInputPriceText(e.target.value);
  };

  const handleTransportCost = (e) => {
    setTransportCost(e.target.value);
  }
  const handleDiscount = (e) => {
    setDiscount(e.target.value);
  }


  return (
    <tr>


      <td data-toggle="class form-group" style={{ width: "80px", borderRadius: "0px", height: "26px", }}>
        <div className="">
          <div className="input-group input-group-unstyled">

            <input
              type="text"
              name={`code${index}`}
              id="icode1"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="form-control "
              ref={el => (cellRefs.current[0] = el)}
              onKeyDown={e => handleKeyPress(e, 0)}
              style={{ width: "80px", borderRadius: "0px", height: "26px", margin: "0px", border: "none" }}
            />


          </div>
        </div>
      </td>

      <td data-toggle="class form-group"
        style={{ width: "290px", margin: "0px", borderRadius: "0px", height: "26px", boxSizing: "border-box" }}>
        <div className="autocomplete" >


          <input
            type="text"
            className="form-control"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{ height: "26px", margin: "0px", width: "99%", borderRadius: "0px", border: "none" }}
            name="inameEmpty"
            id="inameEmpty"

          />

        </div>
        <div style={{ marginRight: "300px" }}>
          {suggestionsActive && (
            <div className="suggestions" style={{
              position: "absolute",
              listStyleType: 'none',
              padding: '0',
              margin: '0',
              border: '1px solid #ccc',

              borderRadius: '0 0 4px 4px',
              width: '300px',
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


      <td data-toggle="class" style={{ height: "26px", margin: "0px", width: "80px", borderRadius: "0px", }}>


        <input
          type="text"
          className="price only form-control"
          size="58"
          value={inputPriceText}
          onChange={handlePriceChange}
          ref={el => (cellRefs.current[4] = el)}
          onKeyDown={e => handleKeyPress(e, 4)}
          style={{ height: "26px", width: "80px", margin: "0px", borderRadius: "0px", border: "none" }}
          name={`price${index}`}
          id="price" />




      </td>



      <td data-toggle="class" style={{ width: "83px", margin: "0px", height: "26px", borderRadius: "0px", }}>
        <input
          type="text"
          name={`qty${index}`}
          id="qty"
          size="58"
          value={inputQtyText}
          onChange={handleQtyChange}
          ref={el => (cellRefs.current[2] = el)}
          onKeyDown={e => handleKeyPress(e, 2)}
          className="qty number_only form-control   "
          style={{ width: "83px", margin: "0px", height: "26px", borderRadius: "0px", border: "none" }} />
      </td>





      <td data-toggle="class" style={{ width: "80Px", margin: "0px", height: "26px", borderRadius: "0px", }} >
        <input
          type="text"
          name={`disc${index}`}
          id="disc"
          value={discount}
          onChange={handleDiscount}
          ref={el => (cellRefs.current[5] = el)}
          onKeyDown={e => handleKeyPress(e, 5)}
          className="form-control   "
          style={{ width: "80Px", margin: "0px", height: "26px", borderRadius: "0px", border: "none" }} />
      </td>

      <td data-toggle="class" style={{ width: "90Px", margin: "0px", height: "26px", borderRadius: "0px" }}>
        <input
          type="text"
          name={`transportcost${index}`}
          id="transportcost"
          value={Transportcost}
          onChange={handleTransportCost}
          ref={el => (cellRefs.current[5] = el)}
          onKeyDown={e => handleKeyPress(e, 5)}
          className="form-control   "
          style={{ width: "90Px", margin: "0px", height: "26px", borderRadius: "0px", border: "none" }} />
      </td>


      <td data-toggle="class" style={{ height: "26px", margin: "0px", width: "80px", borderRadius: "0px", }}>

        <input
          type="text"
          className="form-control"
          size="58"
          Value={totalValue.toFixed(2)}
          ref={el => (cellRefs.current[5] = el)}
          onKeyDown={e => handleKeyPress(e, 5)}
          style={{ height: "26px", margin: "0px", width: "80px", borderRadius: "0px", border: "none" }}
          name={`totalprice${index}`}
          id="totalprice" />

      </td>



      <td data-toggle="class" style={{ width: '30px', margin: "0px", textAlign: "center", height: "26px" }}>

        <a href="##"
          style={{ width: '40px', margin: "0px", textAlign: "center", height: "26px", fontSize: "14px" }}
          className="btn btn-default hidelink"
          type="button" value="Delete"

        >X</a>
      </td>


    </tr>
  )
}

export default PurchaseTableRow