import React from 'react'
import arrowIcon from './icon/icons8-arrow-28.png';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from './config/config';



function MachineEntry() {

    const [cabinet, setCabinet] = useState('');
    const [cabinetPrice, setCabinetPrice] = useState(0);
    const [cabinetQty, setCabinetQty] = useState(0);

    const [pumpElbow, setPumpElbow] = useState('');
    const [pumpElbowPrice, setPumpElbowPrice] = useState(0);
    const [pumpElbowQty, setPumpElbowQty] = useState(0);

    const [pumpPlate, setPumpPlate] = useState('');
    const [pumpPlatePrice, setPumpPlatePrice] = useState(0);
    const [pumpPlateQty, setPumpPlateQty] = useState(0);

    const [sv, setSv] = useState('');
    const [svPrice, setSvPrice] = useState(0);
    const [svQty, setSvQty] = useState(0);

    const [svElbow, setSvElbow] = useState('');
    const [svElbowPrice, setSvElbowPrice] = useState(0);
    const [svElbowQty, setSvElbowQty] = useState(0);

    const [smps, setSmps] = useState('');
    const [smpsPrice, setSmpsPrice] = useState(0);
    const [smpsQty, setSmpsQty] = useState(0);

    const [preCarbon, setPreCarbon] = useState('');
    const [preCarbonPrice, setPreCarbonPrice] = useState(0);
    const [preCarbonQty, setPreCarbonQty] = useState(0);

    const [sediment, setSediment] = useState('');
    const [sedimentPrice, setSedimentPrice] = useState(0);
    const [sedimentQty, setSedimentQty] = useState(0);

    const [postCarbon, setPostCarbon] = useState('');
    const [postCarbonPrice, setPostCarbonPrice] = useState(0);
    const [postCarbonQty, setPostCarbonQty] = useState(0);

    const [copper, setCopper] = useState('');
    const [copperPrice, setCopperPrice] = useState(0);
    const [copperQty, setCopperQty] = useState(0);

    const [uv, setUv] = useState('');
    const [uvPrice, setUvPrice] = useState(0);
    const [uvQty, setUvQty] = useState(0);

    const [uf, setUf] = useState('');
    const [ufPrice, setUfPrice] = useState(0);
    const [ufQty, setUfQty] = useState(0);

    const [alkaline, setAlkaline] = useState('');
    const [alkalinePrice, setAlkalinePrice] = useState(0);
    const [alkalineQty, setAlkalineQty] = useState(0);

    const [doublePushElbow, setDoublePushElbow] = useState('');
    const [doublePushElbowPrice, setDoublePushElbowPrice] = useState(0);
    const [doublePushElbowQty, setDoublePushElbowQty] = useState(0);

    const [membraneHousing, setMembraneHousing] = useState('');
    const [membraneHousingPrice, setMembraneHousingPrice] = useState(0);
    const [membraneHousingQty, setMembraneHousingQty] = useState(0);

    const [membraneElbow, setMembraneElbow] = useState('');
    const [membraneElbowPrice, setMembraneElbowPrice] = useState(0);
    const [membraneElbowQty, setMembraneElbowQty] = useState(0);

    const [fr, setFr] = useState('');
    const [frPrice, setFrPrice] = useState(0);
    const [frQty, setFrQty] = useState(0);

    const [dolphinFloat, setDolphinFloat] = useState('');
    const [dolphinFloatPrice, setDolphinFloatPrice] = useState(0);
    const [dolphinFloatQty, setDolphinFloatQty] = useState(0);

    const [dolphin, setDolphin] = useState('');
    const [dolphinPrice, setDolphinPrice] = useState(0);
    const [dolphinQty, setDolphinQty] = useState(0);

    const [bulkit, setBulkit] = useState('');
    const [bulkitPrice, setBulkitPrice] = useState(0);
    const [bulkitQty, setBulkitQty] = useState(0);

    const [tap, setTap] = useState('');
    const [tapPrice, setTapPrice] = useState(0);
    const [tapQty, setTapQty] = useState(0);

    const [taflon, setTaflon] = useState('');
    const [taflonPrice, setTaflonPrice] = useState(0);
    const [taflonQty, setTaflonQty] = useState(0);

    const [tube, setTube] = useState('');
    const [tubePrice, setTubePrice] = useState(0);
    const [tubeQty, setTubeQty] = useState(0);

    const [cupLink, setCuplink] = useState('');
    const [cupLinkPrice, setCuplinkPrice] = useState(0);
    const [cupLinkQty, setCuplinkQty] = useState(0);

    const [onof, setOnOf] = useState('');
    const [onofPrice, setOnOfPrice] = useState(0);
    const [onofQty, setOnOfQty] = useState(0);

    const [wire, setWire] = useState('');
    const [wirePrice, setWirePrice] = useState(0);
    const [wireQty, setWireQty] = useState(0);

    const [clamp, setClamp] = useState('');
    const [clampPrice, setClampPrice] = useState(0);
    const [clampQty, setClampQty] = useState(0);

    const [pump, setPump] = useState('');
    const [pumpPrice, setPumpPrice] = useState(0);
    const [pumpQty, setPumpQty] = useState(0);

    const [category, setCategory] = useState('');
    const [machinePrice, setMachinePrice] = useState(0);
    const [machineQty, setMachineQty]= useState(0);

      const QtyInput = {    
        borderRadius:"5px",
        border: '1px solid #ccc',
        fontSize:"16px",
        outline:"none",
        padding: '2px',
        width:"150px",
      };
      const NameInput = {
        borderRadius:"5px",
        border: '1px solid #ccc',
        fontSize:"16px",
        outline:"none",
        padding: '2px',
        width:"300px"
      };
      const gridContainerStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '2px',
        backgroundColor: '#f0f0f0',
        padding: '4px',
      };
      const footerStyleGrid = {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '1px',
        backgroundColor: '#f0f0f0',
        padding: '15px',
        alignItems:"center",
      };

      const footerStyle = {
        height:'40px',
        width:"100px",
        marginLeft:"2px",
       
      };
      const footerStyle1 = {
        height:'40px',
        width:"100px",
        marginRight:"10px",
       
      };
      const footerStyle2 = {
        width:"130px",
        height:'40px',
        marginLeft:"40px"
    
      };
      const footerStyle3 = {
        width:"200px",
        height:'40px',
        marginRight:"50px"
      };
      const footerStyle4 = {
        width:"300px",
        height:'40px',
        marginRight:"10px"
      };
      const gridItemStyle = {
        height:'40px',
        width:"200px",
        marginLeft:"10px"
       
       
      };
      const gridItemStyle1 = {
        height:'40px',
        width:"300px",
      };
      const gridItemStyle2 = {
        width:"50px",
        height:'40px',
        marginRight:"40px"
    
      };
      const gridItemStyle3 = {
        width:"200px",
        height:'40px',
      };

      
      const fetchCategoryData = () => {
        axios.get(`${API_URL}/fetchcategory`)
          .then(response => {
            setCategory(response.data);
          })
          .catch(error => {
            console.error('Error fetching data: ' + error);
          });
      };

       console.log(category)
      useEffect(() => {
        fetchCategoryData();
      }, []);

   useEffect(() => {
    const machin_price = parseFloat(machinePrice);
    const cabinet_price = parseFloat(cabinetPrice);
    const cabinet_qty = parseFloat(cabinetQty);
    const pump_price = parseFloat(pumpPrice);
    const pump_qty = parseFloat(pumpQty);
    const pumpelbo_Price = parseFloat(pumpElbowPrice);
    const pumpelbo_qty = parseFloat(pumpElbowQty);
    const pumpplate_price = parseFloat(pumpPlatePrice);
    const pumpplate_qty =  parseFloat(pumpPlateQty);
    const sv_price =  parseFloat(svPrice);
    const sv_qty =  parseFloat(svQty);
    const svelbo_price =  parseFloat(svElbowPrice);
    const svelbo_qty =  parseFloat(svElbowQty);
    const smps_price =  parseFloat(smpsPrice);
    const smps_qty =  parseFloat(smpsQty);
    const preCarb_price =  parseFloat(preCarbonPrice);
    const preCarb_qty =  parseFloat(preCarbonQty);
    const sediment_price =  parseFloat(sedimentPrice);
    const sediment_qty =  parseFloat(sedimentQty);
    const postCarb_price =  parseFloat(postCarbonPrice);
    const postCarb_qty =  parseFloat(postCarbonQty);
    const coper_price =  parseFloat(copperPrice);
    const coper_qty =  parseFloat(copperQty);
    const uv_price =  parseFloat(uvPrice);
    const uv_qty =  parseFloat(uvQty);
    const uf_price =  parseFloat(ufPrice);
    const uf_qty =  parseFloat(ufQty);
    const alkine_price =  parseFloat(alkalinePrice);
    const alkine_qty =  parseFloat(alkalineQty);
    const doublepueslbo_price =  parseFloat(doublePushElbowPrice);
    const doublepuselbo_qty =  parseFloat(doublePushElbowQty);
    const membraH_price = parseFloat(membraneHousingPrice);
    const membraH_qty =  parseFloat(membraneHousingQty);
    const membraElbo_price =  parseFloat(membraneElbowPrice);
    const membraElbo_qty =  parseFloat(membraneElbowQty);
    const fr_price =  parseFloat(frPrice);
    const fr_qty =  parseFloat(frQty);
    const dolphinF_price =  parseFloat(dolphinFloatPrice);
    const dolphinF_qty =  parseFloat(dolphinFloatQty);
    const dolphin_price =  parseFloat(dolphinPrice);
    const dolphin_qty =  parseFloat(dolphinQty);
    const bulkit_price =  parseFloat(bulkitPrice);
    const bulkit_qty =  parseFloat(bulkitQty);
    const tap_price =  parseFloat(tapPrice);
    const tap_qty =  parseFloat(tapQty);
    const taflon_price =  parseFloat(taflonPrice);
    const taflon_qty =  parseFloat(taflonQty);
    const tube_price =  parseFloat(tubePrice);
    const tube_qty =  parseFloat(tubeQty);
    const cupLink_price =  parseFloat(cupLinkPrice);
    const cupLink_qty =  parseFloat(cupLinkQty);
    const onof_price =  parseFloat(onofPrice);
    const onof_qty =  parseFloat(onofQty);
    const wire_price =  parseFloat(wirePrice);
    const wire_qty =  parseFloat(wireQty);
    const clamp_price =  parseFloat(clampPrice);
    const clamp_qty =  parseFloat(clampQty);
    const machine_qty = parseFloat(machineQty);

 
    
    

    if (machin_price !== '') {

    const cabinetP = cabinet_price * cabinet_qty;
    const cabinet_tqty = cabinet_qty * machine_qty;

    const pumpP = pump_price * pump_qty;
    const pump_tqty = pump_qty * machine_qty;

    const pumpElboP = pumpelbo_Price * pumpelbo_qty;
    const pumpElbow_tqty = pumpelbo_qty * machine_qty;

    const pumpplateP = pumpplate_price * pumpplate_qty;
    const pumpPlate_tqty = pumpplate_qty * machine_qty;

    const svP = sv_price * sv_qty;
    const sv_tqty = sv_qty * machine_qty;

    const svElboP = svelbo_price * svelbo_qty;
    const svElbo_tqty = svelbo_qty * machine_qty;

    const smpsP = smps_price * smps_qty;
    const smps_tqty = smps_qty * machine_qty;

    const precarbP = preCarb_price * preCarb_qty;
    const precarb_tqty = preCarb_qty * machine_qty;

    const sedimentP = sediment_price * sediment_qty;
    const sediment_tqty = sediment_qty * machine_qty;

    const postCarbP = postCarb_price * postCarb_qty;
    const postCarbo_tqty = postCarb_qty * machine_qty;

    const coperP = coper_price * coper_qty;
    const coper_tqty = coper_qty * machine_qty;

    const uvP = uv_price * uv_qty;
    const uv_tqty = uv_qty * machine_qty;

    const ufP = uf_price * uf_qty;
    const uf_tqty = uf_qty * machine_qty;

    const alkineP = alkine_price * alkine_qty;
    const alkine_tqty = alkine_qty * machine_qty;

    const doublepushElboP = doublepueslbo_price * doublepuselbo_qty;
    const doublepuselbo_tqty = doublepuselbo_qty * machine_qty;

    const membranH = membraH_price * membraH_qty;
    const membranH_tqty = membraH_qty * machine_qty;

    const membranElbo = membraElbo_price * membraElbo_qty;
    const membraElbo_tqty = membraElbo_qty * machine_qty;

    const frP = fr_price * fr_qty;
    const fr_tqty = fr_qty * machine_qty;

    const dolphinFP = dolphinF_price * dolphinF_qty;
    const dolphinF_tqty = dolphinF_qty * machine_qty

    const dolphinP = dolphin_price * dolphin_qty;
    const dolphin_tqty = dolphin_qty * machine_qty;

    const bulkitP = bulkit_price * bulkit_qty;
    const bulkit_tqty = bulkit_qty * machine_qty;

    const tapP = tap_price * tap_qty;
    const tap_tqty = tap_qty * machine_qty;

    const taflonP = taflon_price * taflon_qty;
    const taflon_tqty = taflon_qty * machine_qty;

    const tubeP = tube_price * tube_qty;
    const tube_tqty = tube_qty * machine_qty;

    const cupLinkP = cupLink_price * cupLink_qty;
    const cupLink_tqty = cupLink_qty * machine_qty;

    const onofP = onof_price * onof_qty;
    const onof_tqty = onof_qty * machine_qty;

    const wireP = wire_price * wire_qty;
    const wire_tqty = wire_qty * machine_qty;

    const clampP = clamp_price * clamp_qty;
    const clamp_tqty = clamp_qty * machine_qty;
    
    const machineTotal = cabinetP + pumpP + pumpElboP + pumpplateP + svP + svElboP + smpsP + precarbP + sedimentP + postCarbP + coperP + uvP + ufP + alkineP + doublepushElboP + membranH + membranElbo + frP + dolphinFP + dolphinP + bulkitP + tapP + taflonP + tubeP + cupLinkP + onofP + wireP + clampP;
    setMachinePrice(machineTotal)
   
    setCabinetData((prevMachineData) => ({
      ...prevMachineData,
      cabinet_qty: cabinet_tqty,
    }));

    setPumpdata((prevMachineData) => ({
      ...prevMachineData,
      pump_qty: pump_tqty,
    }));

    setPumpElbowData((prevMachineData) => ({
      ...prevMachineData,
     pump_elbow_qty: pumpElbow_tqty,
    }));
    setPumpPlateData((prevMachineData) => ({
      ...prevMachineData,
      pumpPlate_qty: pumpPlate_tqty,
    }));
    setSvData((prevMachineData) => ({
      ...prevMachineData,
      sv_qty: sv_tqty,
    }));
    setSvElbowData((prevMachineData) => ({
      ...prevMachineData,
      svElbow_qty: svElbo_tqty,
    }));
    
    setSmpsData((prevMachineData) => ({
      ...prevMachineData,
      smps_qty: smps_tqty,
    }));
    setPreCarbData((prevMachineData) => ({
      ...prevMachineData,
      preCarbon_qty: precarb_tqty,
    }));
    setSedimentData((prevMachineData) => ({
      ...prevMachineData,
      sediment_qty: sediment_tqty,
    }));
    setPostCarbData((prevMachineData) => ({
      ...prevMachineData,
      postCarbon_qty: postCarbo_tqty,
    }));
    setCopperData((prevMachineData) => ({
      ...prevMachineData,
      copper_qty: coper_tqty,
    }));
    setUvData((prevMachineData) => ({
      ...prevMachineData,
      uv_qty: uv_tqty,
    }));
    setUfData((prevMachineData) => ({
      ...prevMachineData,
      uf_qty: uf_tqty,
    }));
    setAlkalineData((prevMachineData) => ({
      ...prevMachineData,
      alkline_qty: alkine_tqty,
    }));
    setDoublePushElbowData((prevMachineData) => ({
      ...prevMachineData,
      doublePushElbow_qty: doublepuselbo_tqty,
    }));
    setMembraneHData((prevMachineData) => ({
      ...prevMachineData,
      membraneHousing_qty: membranH_tqty,
    }));
    setMembraneElbowData((prevMachineData) => ({
      ...prevMachineData,
      membraneElbow_qty: membraElbo_tqty,
    }));
    setFrData((prevMachineData) => ({
      ...prevMachineData,
      fr_qty: fr_tqty,
    }));
    setDolphinFloatData((prevMachineData) => ({
      ...prevMachineData,
      dolphinFloat_qty: dolphinF_tqty,
    }));
    setDolphinData((prevMachineData) => ({
      ...prevMachineData,
      dolphin_qty: dolphin_tqty,
    }));
    setBulkitData((prevMachineData) => ({
      ...prevMachineData,
      bulkit_qty: bulkit_tqty,
    }));
    setTapData((prevMachineData) => ({
      ...prevMachineData,
      tap_qty: tap_tqty,
    }));
    setTaflonData((prevMachineData) => ({
      ...prevMachineData,
      taflon_qty: taflon_tqty,
    }));
    setTubeData((prevMachineData) => ({
      ...prevMachineData,
      tube_qty: tube_tqty,
    }));
    setCuplinkData((prevMachineData) => ({
      ...prevMachineData,
      cupLink_qty: cupLink_tqty,
    }));
    setOnOfData((prevMachineData) => ({
      ...prevMachineData,
      onof_qty: onof_tqty,
    }));
    setWireData((prevMachineData) => ({
      ...prevMachineData,
      wire_qty: wire_tqty,
    }));
    setClampData((prevMachineData) => ({
      ...prevMachineData,
      clamp_qty: clamp_tqty,
    }));
    // console.log("cabPrice", machineTotal);
    }
   
   }, [alkalinePrice, alkalineQty, bulkitPrice, bulkitQty, cabinetPrice, cabinetQty, clampPrice, clampQty, copperPrice, copperQty, cupLinkPrice, cupLinkQty, dolphinFloatPrice, dolphinFloatQty, dolphinPrice, dolphinQty, doublePushElbowPrice, doublePushElbowQty, frPrice, frQty, machinePrice, machineQty, membraneElbowPrice, membraneElbowQty, membraneHousingPrice, membraneHousingQty, onofPrice, onofQty, postCarbonPrice, postCarbonQty, preCarbonPrice, preCarbonQty, pumpElbowPrice, pumpElbowQty, pumpPlatePrice, pumpPlateQty, pumpPrice, pumpQty, sedimentPrice, sedimentQty, smpsPrice, smpsQty, svElbowPrice, svElbowQty, svPrice, svQty, taflonPrice, taflonQty, tapPrice, tapQty, tubePrice, tubeQty, ufPrice, ufQty, uvPrice, uvQty, wirePrice, wireQty]);

 

       const [cabinetData, setCabinetData]= useState({
        cabinet_code:'',
        cabinet_name:'',
        cabinet_qty:'',
       });

       const [pumpData, setPumpdata]= useState({
        pump_code:'',
        pump_name:'',
        pump_qty:'',
       });
      const [pumpElbowData, setPumpElbowData] = useState({
        pumpElbow_code:'',
        pump_elbow:'',
        pump_elbow_qty:'',
      });
      const [pumpPlate_data, setPumpPlateData] = useState({
        pumpPlate_code:'',
        pumpPlate_name:'',
        pumpPlate_qty:'',
      });
      const [svData, setSvData] = useState({
        sv_code:'',
        sv_name:'',
        sv_qty:'',
      });
      const [svElbowData, setSvElbowData] = useState({
        svElbow_code:'',
        svElbow_name:'',
        svElbow_qty:'',
      });
      const [smpsData, setSmpsData] = useState({
        smps_code:'',
        smps_name:'',
        smps_qty:'',
      });
      const [preCarbData, setPreCarbData] = useState({
        preCarbon_code:'',
        preCarbon_name:'',
        preCarbon_qty:'',
      });
      const [sedimentData, setSedimentData] = useState({
        sediment_code:'',
        sediment_name:'',
        sediment_qty:'',
      });
      const [postCarbData, setPostCarbData] = useState({
        postCarbon_code:'',
        postCarbon_name:'',
        postCarbon_qty:'',

      });
      const [copperData, setCopperData] = useState({
        copper_code:'',
        copper_name:'',
        copper_qty:'',
      });
      const [uvData, setUvData] = useState({
        uv_code:'',
        uv_name:'',
        uv_qty:'',
      });
      const [ufData, setUfData] = useState({
        uf_code:'',
        uf_name:'',
        uf_qty:'',
      });
      const [alkalineData, setAlkalineData] = useState({
        alkline_code:'',
        alkline_name:'',
        alkline_qty:'',
      });
      const [doublePushElbowData, setDoublePushElbowData] = useState({
        doublePushElbow_code:'',
        doublePushElbow_name:'',
        doublePushElbow_qty:'',
      });
      const [membraneHData, setMembraneHData] = useState({
        membraneHousing_code:'',
        membraneHousing_name:'',
        membraneHousing_qty:'',
      });
      const [membraneElbowData, setMembraneElbowData] = useState({
        membraneElbow_code:'',
        membraneElbow_name:'',
        membraneElbow_qty:'',
      });
      const [frData, setFrData] = useState({
        fr_code:'',
        fr_name:'',
        fr_qty:'',
      });
      const [dolphinFloatData, setDolphinFloatData] = useState({
        dolphinFloat_code:'',
        dolphinFloat_name:'',
        dolphinFloat_qty:'',
      });
     const [dolphinData, setDolphinData] = useState({
      dolphin_code:'',
      dolphin_name:'',
      dolphin_qty:'',
     });
    const [bulkitData, setBulkitData] = useState({
      bulkit_code:'',
      bulkit_name:'',
      bulkit_qty:'',
    });
    const [tapData, setTapData] = useState({
      tap_code:'',
      tap_name:'',
      tap_qty:'',
    });
    const [taflonData, setTaflonData] = useState({
      taflon_code:'',
      taflon_name:'',
      taflon_qty:'',
    });
    const [tubeData, setTubeData]= useState({
      tube_code:'',
      tube_name:'',
      tube_qty:'',
    });
    const [cupLinkData, setCuplinkData] =useState({
      cupLink_code:'',
      cupLink_name:'',
      cupLink_qty:'',
    });
    const [onOffData, setOnOfData] = useState({
      onof_code:'',
      onof_name:'',
      onof_qty:'',
    });
    const [WireData, setWireData] = useState({
      wire_code:'',
      wire_name:'',
      wire_qty:'',
    });
    const [clampData, setClampData] = useState({
      clamp_code:'',
      clamp_name:'',
      clamp_qty:''
     });

   
    const machineData =[
      cabinetData,
      pumpData,
      pumpPlate_data,
      pumpElbowData,
      svData,
      svElbowData,
      smpsData,
      preCarbData,
      sedimentData,
      postCarbData,
      copperData,
      uvData,
      ufData,
      alkalineData,
      doublePushElbowData,
      membraneHData,
      membraneElbowData,
      frData,
      dolphinFloatData,
      dolphinData,
      bulkitData,
      tapData,
      taflonData,
      tubeData,
      cupLinkData,
      onOffData,
      WireData,
      clampData
    ];
    console.log(machineData);

    const handleSubmit = () =>{
      console.log(machineData);
      axios.put(`${API_URL}/updateMachineStock`,{
        data: machineData,
        ...machinDate
      })
     .then((response) =>{
      console.log("data send success full", response.data)

     })
     .catch((error) => {
       console.log("data is not send", error)
     })


    }

    const [machinDate, setMachineDate] = useState({
       date:'',
       time:''
    })
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  

      setMachineDate((prevPurchaseData) => ({
        ...prevPurchaseData,
        time: formattedTime,
      }));

     

    }, 1000); // Update the current time every second
    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    

        setMachineDate((prevPurchaseData) => ({
        ...prevPurchaseData,
        date: formattedDate,
      }));
    }, 1000); // Update the current date every second

    return () => {
      clearInterval(intervalId); // Cleanup the interval when the component unmounts
    };
  }, []);

 
    // cabinet
      const [suggestions1, setSuggestions1] = useState([]);
      const [suggestionsActive1, setSuggestionsActive1] = useState(false);
      const handleChange1 = (e) => {
        const query = e.target.value.toLowerCase();
        setCabinet(query);

        if (Array.isArray(category)) {
          const desiredRow = category.find(item => item.id === 4 && item.category_name);
          // Rest of your code
          if (desiredRow) {
            const categoryName = desiredRow.category_name;
           

            if (query.length > 0) {
              // Make an API request to get suggestions
              axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
                .then((response) => {
                 
                  setSuggestions1(response.data);
                  console.log(response.data)
                  setSuggestionsActive1(true);
                })
                .catch((error) => {
                  console.error('Error fetching suggestions:', error);
                 
                });
            } else {
              setSuggestions1([]);
              setSuggestionsActive1(false);
            }
           
        } else {
            console.log('Row not found');
        }
        } else {
          console.error('category is not an array');
        }
      };

      const handleClick1 = (cabinets) => {
        setCabinet(cabinets);
        setCabinetData((prevMachineData) => ({
          ...prevMachineData,
          cabinet_name: cabinets,
        }));
  
        axios.get(`${API_URL}/machinePrice`, {params:{itemName:cabinets}})
        .then((response) => {

          setCabinetPrice(response.data[0].dealer);
          setCabinetData((prevMachineData) => ({
            ...prevMachineData,
            cabinet_code: response.data[0].code,
          }));
        })
        .catch((error) => {
          console.log("data not fetch",error)
        })
        
        setSuggestions1([]);
        setSuggestionsActive1(false);
      };

      // pump


      const [suggestions2, setSuggestions2] = useState([]);
      const [suggestionsActive2, setSuggestionsActive2] = useState(false);
      const handleChange2 = (e) => {
        const query = e.target.value.toLowerCase();
        setPump(query);

        if (Array.isArray(category)) {
          const desiredRow = category.find(item => item.id === 18 && item.category_name);
          // Rest of your code
          if (desiredRow) {
            const categoryName = desiredRow.category_name;
            

            if (query.length > 0) {
              // Make an API request to get suggestions
              axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
                .then((response) => {
                  setSuggestions2(response.data);
                  setSuggestionsActive2(true);
                })
                .catch((error) => {
                  console.error('Error fetching suggestions:', error);
                 
                });
            } else {
              setSuggestions2([]);
              setSuggestionsActive2(false);
            }
           
        } else {
            console.log('Row not found');
        }
        } else {
          console.error('category is not an array');
        }
      };
      const handleClick2 = (pump) => {
        setPump(pump);

        setPumpdata((prevMachineData) => ({
          ...prevMachineData,
          pump_name: pump,
        }));

        axios.get(`${API_URL}/machinePrice`, {params:{itemName:pump}})
        .then((response) => {

          setPumpPrice(response.data[0].dealer );
         
          setPumpdata((prevMachineData) => ({
            ...prevMachineData,
            pump_code:response.data[0].code,
          }));
  
          console.log("Price",response.data)
        })
        .catch((error) => {
          console.log("data not fetch",error)
        })
        setSuggestions2([]);
        setSuggestionsActive2(false);
      };


      // pumpelbo

      const [suggestions3, setSuggestions3] = useState([]);
      const [suggestionsActive3, setSuggestionsActive3] = useState(false);
      const handleChange3 = (e) => {
        const query = e.target.value.toLowerCase();
        setPumpElbow(query);

        if (Array.isArray(category)) {
          const desiredRow = category.find(item => item.id === 5 && item.category_name);
          // Rest of your code
          if (desiredRow) {
            const categoryName = desiredRow.category_name;
           

            if (query.length > 0) {
              // Make an API request to get suggestions
              axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
                .then((response) => {
                 
                  setSuggestions3(response.data);
                  setSuggestionsActive3(true);
                })
                .catch((error) => {
                  console.error('Error fetching suggestions:', error);
                 
                });
            } else {
              setSuggestions3([]);
              setSuggestionsActive3(false);
            }
           
        } else {
            console.log('Row not found');
        }
        } else {
          console.error('category is not an array');
        }
      };
	    const handleClick3 = (pumpElbow) => {
        setPumpElbow(pumpElbow);
        setPumpElbowData((prevMachineData) => ({
          ...prevMachineData,
          pump_elbow: pumpElbow,
        }));
        
      
        axios.get(`${API_URL}/machinePrice`, {params:{itemName:pumpElbow}})
        .then((response) => {

          setPumpElbowPrice(response.data[0].dealer);
          setPumpElbowData((prevMachineData) => ({
            ...prevMachineData,
            pumpElbow_code: response.data[0].code,
          }));
          
          console.log("Price",response.data)
        })
        .catch((error) => {
          console.log("data not fetch",error)
        })
        setSuggestions3([]);
        setSuggestionsActive3(false);
      };

//  pump Plate
      
      const [suggestions4, setSuggestions4] = useState([]);
      const [suggestionsActive4, setSuggestionsActive4] = useState(false);
     
      const handleChange4 = (e) => {
        const query = e.target.value.toLowerCase();
        setPumpPlate(query);


        if (Array.isArray(category)) {
          const desiredRow = category.find(item => item.id === 6 && item.category_name);
          // Rest of your code
          if (desiredRow) {
            const categoryName = desiredRow.category_name;
           

            if (query.length > 0) {
              // Make an API request to get suggestions
              axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
                .then((response) => {
                 
                  setSuggestions4(response.data);
                  setSuggestionsActive4(true);
                })
                .catch((error) => {
                  console.error('Error fetching suggestions:', error);
                 
                });
            } else {
              setSuggestions4([]);
              setSuggestionsActive4(false);
            }
           
        } else {
            console.log('Row not found');
        }
        } else {
          console.error('category is not an array');
        }
      };

      const handleClick4 = (pumpPlate) => {
        console.log('Clicked Item:', pumpPlate);
        setPumpPlate(pumpPlate);

        setPumpPlateData((prevMachineData) => ({
          ...prevMachineData,
          pumpPlate_name: pumpPlate,
        }));
        
        axios.get(`${API_URL}/machinePrice`, {params:{itemName:pumpPlate}})
        .then((response) => {

          setPumpPlatePrice(response.data[0].dealer);
          setPumpPlateData((prevMachineData) => ({
            ...prevMachineData,
            pumpPlate_code:response.data[0].code ,
          }));
          
          console.log("Price",response.data)
        })
        .catch((error) => {
          console.log("data not fetch",error)
        })
        setSuggestions4([]);
        setSuggestionsActive4(false);
      };

      // SV

      const [suggestions5, setSuggestions5] = useState([]);
      const [suggestionsActive5, setSuggestionsActive5] = useState(false);
     
      const handleChange5 = (e) => {
        const query = e.target.value.toLowerCase();
        setSv(query);


        if (Array.isArray(category)) {
          const desiredRow = category.find(item => item.id === 7 && item.category_name);
          // Rest of your code
          if (desiredRow) {
            const categoryName = desiredRow.category_name;
          

            if (query.length > 0) {
              // Make an API request to get suggestions
              axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
                .then((response) => {
                 
                  setSuggestions5(response.data);
                  setSuggestionsActive5(true);
                })
                .catch((error) => {
                  console.error('Error fetching suggestions:', error);
                 
                });
            } else {
              setSuggestions5([]);
              setSuggestionsActive5(false);
            }
            
        } else {
            console.log('Row not found');
        }
        } else {
          console.error('category is not an array');
        }
      };

      const handleClick5 = (sv) => {
        setSv(sv);
        setSvData((prevMachineData) => ({
          ...prevMachineData,
          sv_name: sv,
        }));
        
        axios.get(`${API_URL}/machinePrice`, {params:{itemName:sv}})
        .then((response) => {

          setSvPrice(response.data[0].dealer);
          setSvData((prevMachineData) => ({
            ...prevMachineData,
            sv_code: response.data[0].code,
          }));
          
          console.log("Price",response.data)
        })
        .catch((error) => {
          console.log("data not fetch",error)
        })
        setSuggestions5([]);
        setSuggestionsActive5(false);
      };

      // Sv Elbow

      const [suggestions6, setSuggestions6] = useState([]);
      const [suggestionsActive6, setSuggestionsActive6] = useState(false);
     
      const handleChange6 = (e) => {
        const query = e.target.value.toLowerCase();
        setSvElbow(query);


        if (Array.isArray(category)) {
          const desiredRow = category.find(item => item.id === 5 && item.category_name);
          // Rest of your code
          if (desiredRow) {
            const categoryName = desiredRow.category_name;
            

            if (query.length > 0) {
              // Make an API request to get suggestions
              axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
                .then((response) => {
                 
                  setSuggestions6(response.data);
                  setSuggestionsActive6(true);
                })
                .catch((error) => {
                  console.error('Error fetching suggestions:', error);
                 
                });
            } else {
              setSuggestions6([]);
              setSuggestionsActive6(false);
            }
            
        } else {
            console.log('Row not found');
        }
        } else {
          console.error('category is not an array');
        }
      };

      const handleClick6 = (svElbow) => {
        setSvElbow(svElbow);
        setSvElbowData((prevMachineData) => ({
          ...prevMachineData,
          svElbow_name: svElbow,
        }));
        
        axios.get(`${API_URL}/machinePrice`, {params:{itemName:svElbow}})
        .then((response) => {

          setSvElbowPrice(response.data[0].dealer);
          setSvElbowData((prevMachineData) => ({
            ...prevMachineData,
            svElbow_code:response.data[0].code,
          }));
          console.log("Price",response.data)
        })
        .catch((error) => {
          console.log("data not fetch",error)
        })
        setSuggestions6([]);
        setSuggestionsActive6(false);
      };


    // SMPS

    
    const [suggestions7, setSuggestions7] = useState([]);
    const [suggestionsActive7, setSuggestionsActive7] = useState(false);
   
    const handleChange7 = (e) => {
      const query = e.target.value.toLowerCase();
      setSmps(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 8 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
         

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions7(response.data);
                setSuggestionsActive7(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions7([]);
            setSuggestionsActive7(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick7 = (smps) => {
      setSmps(smps);
      setSmpsData((prevMachineData) => ({
        ...prevMachineData,
        smps_name: smps,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:smps}})
      .then((response) => {
         const data = response.data
        setSmpsPrice(response.data[0].dealer);
        setSmpsData((prevMachineData) => ({
          ...prevMachineData,
          smps_code: response.data[0].code,
        }));
        
        console.log("Price",data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions7([]);
      setSuggestionsActive7(false);
    };

// pre carbon

    const [suggestions8, setSuggestions8] = useState([]);
    const [suggestionsActive8, setSuggestionsActive8] = useState(false);
   
    const handleChange8 = (e) => {
      const query = e.target.value.toLowerCase();
      setPreCarbon(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 9 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
       

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions8(response.data);
                setSuggestionsActive8(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions8([]);
            setSuggestionsActive8(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick8 = (preCarbon) => {
      setPreCarbon(preCarbon);
      setPreCarbData((prevMachineData) => ({
        ...prevMachineData,
        preCarbon_name: preCarbon,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:preCarbon}})
      .then((response) => {

        setPreCarbonPrice(response.data[0].dealer);
        setPreCarbData((prevMachineData) => ({
          ...prevMachineData,
          preCarbon_code: response.data[0].code,
        }));
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions8([]);
      setSuggestionsActive8(false);
    };
    
    // sediment

    const [suggestions9, setSuggestions9] = useState([]);
    const [suggestionsActive9, setSuggestionsActive9] = useState(false);
   
    const handleChange9 = (e) => {
      const query = e.target.value.toLowerCase();
      setSediment(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 9 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
        

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions9(response.data);
                setSuggestionsActive9(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions9([]);
            setSuggestionsActive9(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick9 = (sediment) => {
      setSediment(sediment);
      setSedimentData((prevMachineData) => ({
        ...prevMachineData,
        sediment_name: sediment,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:sediment}})
      .then((response) => {

        setSedimentPrice(response.data[0].dealer);
        setSedimentData((prevMachineData) => ({
          ...prevMachineData,
          sediment_code: response.data[0].code,
        }));
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions9([]);
      setSuggestionsActive9(false);
    };

    // Post Carbon

    const [suggestions10, setSuggestions10] = useState([]);
    const [suggestionsActive10, setSuggestionsActive10] = useState(false);
   
    const handleChange10 = (e) => {
      const query = e.target.value.toLowerCase();
      setPostCarbon(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 9 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
          

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions10(response.data);
                setSuggestionsActive10(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions10([]);
            setSuggestionsActive10(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick10 = (postCarbon) => {
      setPostCarbon(postCarbon);
      setPostCarbData((prevMachineData) => ({
        ...prevMachineData,
        postCarbon_name: postCarbon,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:postCarbon}})
      .then((response) => {

        setPostCarbonPrice(response.data[0].dealer);
        setPostCarbData((prevMachineData) => ({
          ...prevMachineData,
          postCarbon_code: response.data[0].code,
        }));
        
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions10([]);
      setSuggestionsActive10(false);
    };
    
    // copper

    const [suggestions11, setSuggestions11] = useState([]);
    const [suggestionsActive11, setSuggestionsActive11] = useState(false);
   
    const handleChange11 = (e) => {
      const query = e.target.value.toLowerCase();
      setCopper(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 20 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
          

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions11(response.data);
                setSuggestionsActive11(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions11([]);
            setSuggestionsActive11(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick11 = (copper) => {
      setCopper(copper);
      setCopperData((prevMachineData) => ({
        ...prevMachineData,
        copper_name: copper,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:copper}})
      .then((response) => {

        setCopperPrice(response.data[0].dealer);
        setCopperData((prevMachineData) => ({
          ...prevMachineData,
          copper_code: response.data[0].code,
        }));
        
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions11([]);
      setSuggestionsActive11(false);
    };

    // UV

    const [suggestions12, setSuggestions12] = useState([]);
    const [suggestionsActive12, setSuggestionsActive12] = useState(false);
   
    const handleChange12 = (e) => {
      const query = e.target.value.toLowerCase();
      setUv(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 20 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
          

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions12(response.data);
                setSuggestionsActive12(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions12([]);
            setSuggestionsActive12(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick12 = (uv) => {
      setUv(uv);
      setUvData((prevMachineData) => ({
        ...prevMachineData,
        uv_name: uv,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:uv}})
      .then((response) => {

        setUvPrice(response.data[0].dealer);
        setUvData((prevMachineData) => ({
          ...prevMachineData,
          uv_code: response.data[0].code,
        }));
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions12([]);
      setSuggestionsActive12(false);
    };

    // UF

    const [suggestions13, setSuggestions13] = useState([]);
    const [suggestionsActive13, setSuggestionsActive13] = useState(false);
   
    const handleChange13 = (e) => {
      const query = e.target.value.toLowerCase();
      setUf(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 20 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
         

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions13(response.data);
                setSuggestionsActive13(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions13([]);
            setSuggestionsActive13(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick13 = (uf) => {
      setUf(uf);
      setUfData((prevMachineData) => ({
        ...prevMachineData,
        uf_name: uf,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:uf}})
      .then((response) => {

        setUfPrice(response.data[0].dealer);
        setUfData((prevMachineData) => ({
          ...prevMachineData,
          uf_code: response.data[0].code,
        }));
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions13([]);
      setSuggestionsActive13(false);
    };

    // Alkaline

    const [suggestions14, setSuggestions14] = useState([]);
    const [suggestionsActive14, setSuggestionsActive14] = useState(false);
   
    const handleChange14 = (e) => {
      const query = e.target.value.toLowerCase();
      setAlkaline(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 20 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
          

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions14(response.data);
                setSuggestionsActive14(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions14([]);
            setSuggestionsActive14(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick14 = (alkaline) => {
      setAlkaline(alkaline);
      setAlkalineData((prevMachineData) => ({
        ...prevMachineData,
        alkline_name: alkaline,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:alkaline}})
      .then((response) => {

        setAlkalinePrice(response.data[0].dealer);
        setAlkalineData((prevMachineData) => ({
          ...prevMachineData,
          alkline_code: response.data[0].code,
        }));
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions14([]);
      setSuggestionsActive14(false);
    };

    // Double Push Elbow

    const [suggestions15, setSuggestions15] = useState([]);
    const [suggestionsActive15, setSuggestionsActive15] = useState(false);
   
    const handleChange15 = (e) => {
      const query = e.target.value.toLowerCase();
      setDoublePushElbow(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 5 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
       

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions15(response.data);
                setSuggestionsActive15(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions15([]);
            setSuggestionsActive15(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick15 = (doublePushElbow) => {
      setDoublePushElbow(doublePushElbow);
      setDoublePushElbowData((prevMachineData) => ({
        ...prevMachineData,
        doublePushElbow_name: doublePushElbow,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:doublePushElbow}})
      .then((response) => {

        setDoublePushElbowPrice(response.data[0].dealer);
        setDoublePushElbowData((prevMachineData) => ({
          ...prevMachineData,
          doublePushElbow_code: response.data[0].code,
        }));
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions15([]);
      setSuggestionsActive15(false);
    };

    // Membrane Housing

    const [suggestions16, setSuggestions16] = useState([]);
    const [suggestionsActive16, setSuggestionsActive16] = useState(false);
   
    const handleChange16 = (e) => {
      const query = e.target.value.toLowerCase();
      setMembraneHousing(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 10 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
          

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions16(response.data);
                setSuggestionsActive16(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions16([]);
            setSuggestionsActive16(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick16 = (membraneHousing) => {
      setMembraneHousing(membraneHousing);

      setMembraneHData((prevMachineData) => ({
        ...prevMachineData,
        membraneHousing_name: membraneHousing,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:membraneHousing}})
      .then((response) => {

        setMembraneHousingPrice(response.data[0].dealer);
        
      setMembraneHData((prevMachineData) => ({
        ...prevMachineData,
        membraneHousing_code: response.data[0].code,
      }));
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions16([]);
      setSuggestionsActive16(false);
    };

    // membrane Elbow

    const [suggestions17, setSuggestions17] = useState([]);
    const [suggestionsActive17, setSuggestionsActive17] = useState(false);
   
    const handleChange17 = (e) => {
      const query = e.target.value.toLowerCase();
      setMembraneElbow(query);


      if (Array.isArray(category)) {
        const desiredRow = category.find(item => item.id === 5 && item.category_name);
        // Rest of your code
        if (desiredRow) {
          const categoryName = desiredRow.category_name;
          

          if (query.length > 0) {
            // Make an API request to get suggestions
            axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
              .then((response) => {
               
                setSuggestions17(response.data);
                setSuggestionsActive17(true);
              })
              .catch((error) => {
                console.error('Error fetching suggestions:', error);
               
              });
          } else {
            setSuggestions17([]);
            setSuggestionsActive17(false);
          }
          
      } else {
          console.log('Row not found');
      }
      } else {
        console.error('category is not an array');
      }
    };

    const handleClick17 = (membraneElbow) => {
      setMembraneElbow(membraneElbow);
      setMembraneElbowData((prevMachineData) => ({
        ...prevMachineData,
        membraneElbow_name: membraneElbow,
      }));
      
      axios.get(`${API_URL}/machinePrice`, {params:{itemName:membraneElbow}})
      .then((response) => {

      setMembraneElbowPrice(response.data[0].dealer);
      setMembraneElbowData((prevMachineData) => ({
        ...prevMachineData,
        membraneElbow_code: response.data[0].code,
      }));
      
        console.log("Price",response.data)
      })
      .catch((error) => {
        console.log("data not fetch",error)
      })
      setSuggestions17([]);
      setSuggestionsActive17(false);
    };
// FR

const [suggestions18, setSuggestions18] = useState([]);
const [suggestionsActive18, setSuggestionsActive18] = useState(false);

const handleChange18 = (e) => {
  const query = e.target.value.toLowerCase();
  setFr(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 11 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
      

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions18(response.data);
            setSuggestionsActive18(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions18([]);
        setSuggestionsActive18(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick18 = (fr) => {
  setFr(fr);
  setFrData((prevMachineData) => ({
    ...prevMachineData,
    fr_name: fr,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:fr}})
  .then((response) => {

    setFrPrice(response.data[0].dealer);
    setFrData((prevMachineData) => ({
      ...prevMachineData,
      fr_code: response.data[0].code,
    }));
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions18([]);
  setSuggestionsActive18(false);
};

// Dolphin Float
const [suggestions19, setSuggestions19] = useState([]);
const [suggestionsActive19, setSuggestionsActive19] = useState(false);

const handleChange19 = (e) => {
  const query = e.target.value.toLowerCase();
  setDolphinFloat(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 12 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
      

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions19(response.data);
            setSuggestionsActive19(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions19([]);
        setSuggestionsActive19(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick19 = (dolphinFloats) => {
  setDolphinFloat(dolphinFloats);
  setDolphinFloatData((prevMachineData) => ({
    ...prevMachineData,
    dolphinFloat_name: dolphinFloats,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:dolphinFloats}})
  .then((response) => {

    setDolphinFloatPrice(response.data[0].dealer);
    setDolphinFloatData((prevMachineData) => ({
      ...prevMachineData,
      dolphinFloat_code: response.data[0].code,
    }));
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions19([]);
  setSuggestionsActive19(false);
};

// Dolphin

const [suggestions20, setSuggestions20] = useState([]);
const [suggestionsActive20, setSuggestionsActive20] = useState(false);

const handleChange20 = (e) => {
  const query = e.target.value.toLowerCase();
  setDolphin(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 6 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
     

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions20(response.data);
            setSuggestionsActive20(true);
            console.log(response.data)
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions20([]);
        setSuggestionsActive20(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick20 = (dolphin) => {
  setDolphin(dolphin);
  setDolphinData((prevMachineData) => ({
    ...prevMachineData,
    dolphin_name: dolphin,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:dolphin}})
  .then((response) => {

    setDolphinPrice(response.data[0].dealer);
    setDolphinData((prevMachineData) => ({
      ...prevMachineData,
      dolphin_code: response.data[0].code,
    }));
    
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions20([]);
  setSuggestionsActive20(false);
};

// BullKit

const [suggestions21, setSuggestions21] = useState([]);
const [suggestionsActive21, setSuggestionsActive21] = useState(false);

const handleChange21 = (e) => {
  const query = e.target.value.toLowerCase();
  setBulkit(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 5 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
     

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions21(response.data);
            setSuggestionsActive21(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions21([]);
        setSuggestionsActive21(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick21 = (bulkit) => {
  setBulkit(bulkit);
  setBulkitData((prevMachineData) => ({
    ...prevMachineData,
    bulkit_name: bulkit,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:bulkit}})
  .then((response) => {

    setBulkitPrice(response.data[0].dealer);
    setBulkitData((prevMachineData) => ({
      ...prevMachineData,
      bulkit_code: response.data[0].code,
    }));
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions21([]);
  setSuggestionsActive21(false);
};

const [suggestions22, setSuggestions22] = useState([]);
const [suggestionsActive22, setSuggestionsActive22] = useState(false);

const handleChange22 = (e) => {
  const query = e.target.value.toLowerCase();
  setTap(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 13 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
     

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions22(response.data);
            setSuggestionsActive22(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions22([]);
        setSuggestionsActive22(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick22 = (tap) => {
  setTap(tap);
  setTapData((prevMachineData) => ({
    ...prevMachineData,
    tap_name: tap,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:tap}})
  .then((response) => {

    setTapPrice(response.data[0].dealer);
    setTapData((prevMachineData) => ({
      ...prevMachineData,
      tap_code: response.data[0].code,
    }));
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions22([]);
  setSuggestionsActive22(false);
};

// Taflon

const [suggestions23, setSuggestions23] = useState([]);
const [suggestionsActive23, setSuggestionsActive23] = useState(false);

const handleChange23 = (e) => {
  const query = e.target.value.toLowerCase();
  setTaflon(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 14 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
     

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions23(response.data);
            setSuggestionsActive23(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions23([]);
        setSuggestionsActive23(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick23 = (taflon) => {
  setTaflon(taflon);
  setTaflonData((prevMachineData) => ({
    ...prevMachineData,
    taflon_name: taflon,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:taflon}})
  .then((response) => {

    setTaflonPrice(response.data[0].dealer);
    console.log("Price",response.data)
    setTaflonData((prevMachineData) => ({
      ...prevMachineData,
      taflon_code: response.data[0].code,
    }));
    
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions23([]);
  setSuggestionsActive23(false);
};

// Tube
const [suggestions24, setSuggestions24] = useState([]);
const [suggestionsActive24, setSuggestionsActive24] = useState(false);

const handleChange24 = (e) => {
  const query = e.target.value.toLowerCase();
  setTube(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 15 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
    

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions24(response.data);
            setSuggestionsActive24(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions24([]);
        setSuggestionsActive24(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick24 = (tube) => {
  setTube(tube);
  setTubeData((prevMachineData) => ({
    ...prevMachineData,
    tube_name: tube,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:tube}})
  .then((response) => {

    setTubePrice(response.data[0].dealer);
    setTubeData((prevMachineData) => ({
      ...prevMachineData,
      tube_code: response.data[0].code,
    }));
    
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions24([]);
  setSuggestionsActive24(false);
};

// cuplink

const [suggestions25, setSuggestions25] = useState([]);
const [suggestionsActive25, setSuggestionsActive25] = useState(false);

const handleChange25 = (e) => {
  const query = e.target.value.toLowerCase();
  setCuplink(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 17 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;
     

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions25(response.data);
            setSuggestionsActive25(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions25([]);
        setSuggestionsActive25(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick25 = (cupLink) => {
  setCuplink(cupLink);
  setCuplinkData((prevMachineData) => ({
    ...prevMachineData,
    cupLink_name: cupLink,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:cupLink}})
  .then((response) => {

    setCuplinkPrice(response.data[0].dealer);
    setCuplinkData((prevMachineData) => ({
      ...prevMachineData,
      cupLink_code: response.data[0].code,
    }));
    
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions25([]);
  setSuggestionsActive25(false);
};

// onOff
const [suggestions26, setSuggestions26] = useState([]);
const [suggestionsActive26, setSuggestionsActive26] = useState(false);

const handleChange26 = (e) => {
  const query = e.target.value.toLowerCase();
  setOnOf(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 16 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions26(response.data);
            setSuggestionsActive26(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions26([]);
        setSuggestionsActive26(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick26 = (onOff) => {
  setOnOf(onOff);
  setOnOfData((prevMachineData) => ({
    ...prevMachineData,
    onof_name: onOff,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:onOff}})
  .then((response) => {

    setOnOfPrice(response.data[0].dealer);
    setOnOfData((prevMachineData) => ({
      ...prevMachineData,
      onof_code: response.data[0].code,
    }));
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions26([]);
  setSuggestionsActive26(false);
};

// Wire
const [suggestions27, setSuggestions27] = useState([]);
const [suggestionsActive27, setSuggestionsActive27] = useState(false);

const handleChange27 = (e) => {
  const query = e.target.value.toLowerCase();
  setWire(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 6 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions27(response.data);
            setSuggestionsActive27(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions27([]);
        setSuggestionsActive27(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick27 = (wire) => {
  setWire(wire);
  setWireData((prevMachineData) => ({
    ...prevMachineData,
    wire_name: wire,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:wire}})
  .then((response) => {

    setWirePrice(response.data[0].dealer);
    setWireData((prevMachineData) => ({
      ...prevMachineData,
      wire_code: response.data[0].code,
    }));
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions27([]);
  setSuggestionsActive27(false);
};

// Clamp
const [suggestions28, setSuggestions28] = useState([]);
const [suggestionsActive28, setSuggestionsActive28] = useState(false);

const handleChange28 = (e) => {
  const query = e.target.value.toLowerCase();
  setClamp(query);


  if (Array.isArray(category)) {
    const desiredRow = category.find(item => item.id === 19 && item.category_name);
    // Rest of your code
    if (desiredRow) {
      const categoryName = desiredRow.category_name;

      if (query.length > 0) {
        // Make an API request to get suggestions
        axios.get(`${API_URL}/api/search?category=${categoryName}&itemName=${query}`)
          .then((response) => {
           
            setSuggestions28(response.data);
            setSuggestionsActive28(true);
          })
          .catch((error) => {
            console.error('Error fetching suggestions:', error);
           
          });
      } else {
        setSuggestions28([]);
        setSuggestionsActive28(false);
      }
      
  } else {
      console.log('Row not found');
  }
  } else {
    console.error('category is not an array');
  }
};

const handleClick28 = (clamp) => {
  setClamp(clamp);
  setClampData((prevMachineData) => ({
    ...prevMachineData,
    clamp_name: clamp,
  }));
  
  axios.get(`${API_URL}/machinePrice`, {params:{itemName:clamp}})
  .then((response) => {

    setClampPrice(response.data[0].dealer);
    setClampData((prevMachineData) => ({
      ...prevMachineData,
      clamp_code: response.data[0].code,
    }));
    
    console.log("Price",response.data)
  })
  .catch((error) => {
    console.log("data not fetch",error)
  })
  setSuggestions28([]);
  setSuggestionsActive28(false);
};


  return (
    <div>
          <div className='heading_bill' >
          <span className='head-text'><img src={arrowIcon} alt="" /> Machine Entry</span>
        </div>
        <div style={{width:"850px",marginTop:"10px", background:"#e3e3e3",paddingBottom:"2px", margin:"auto"}}>
          <div>
            <p style={{fontSize:'20px', fontWeight:"700",marginTop:"5px", marginLeft:"40px",alignItems:"center"}}>Machine Entry</p>
         </div>  
        
         <div style={{maxHeight:"600px",width:"850px",marginTop:"-1px", overflowY:"auto", position:'absolute'}} >

 <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Cabinets</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={cabinet} onChange={handleChange1} placeholder='cabinets'style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive1 && (
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
              {suggestions1.map((suggestion1, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick1(suggestion1.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion1 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion1.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
       
      
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={cabinetQty || ''} onChange={(e) => setCabinetQty(e.target.value)} placeholder='Qty' style={QtyInput} />
     
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Pump</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={pump} onChange={handleChange2} placeholder='Pump'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive2 && (
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
              {suggestions2.map((suggestion2, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick2(suggestion2.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion2 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion2.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={pumpQty || ''} onChange={(e) => setPumpQty(e.target.value)} placeholder='Qty'  style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>PumpElbo</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={pumpElbow} onChange={handleChange3} placeholder='PumpElbo'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive3 && (
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
              {suggestions3.map((suggestion3, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick3(suggestion3.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion3 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion3.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={pumpElbowQty || ''} onChange={(e) => setPumpElbowQty(e.target.value)} placeholder='Qty'  style={QtyInput} />
      </div>
    </div>

  

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>PumpPlate</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={pumpPlate} onChange={handleChange4} placeholder='Pump plate'  style={NameInput}/>
   <div style={{marginRight:"350px"}}>
      {suggestionsActive4 && (
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
              {suggestions4.map((suggestion4, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick4(suggestion4.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion4 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion4.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={pumpPlateQty || ''} onChange={(e) => setPumpPlateQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>


    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>SV</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={sv} onChange={handleChange5}  placeholder='SV'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive5 && (
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
              {suggestions5.map((suggestion5, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick5(suggestion5.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion5 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion5.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={svQty || ''} onChange={(e) => setSvQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>SV Elbow</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={svElbow} onChange={handleChange6}  placeholder='SV Elbow' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive6 && (
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
              {suggestions6.map((suggestion6, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick6(suggestion6.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion6 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion6.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={svElbowQty || ''} onChange={(e) => setSvElbowQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>SMPS</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={smps} onChange={handleChange7} placeholder='SMPS'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive7 && (
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
              {suggestions7.map((suggestion7, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick7(suggestion7.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion7 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion7.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={smpsQty || ''} onChange={(e) => setSmpsQty(e.target.value)}  placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>PreCarbon</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={preCarbon} onChange={handleChange8} placeholder='PreCarbon'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive8 && (
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
              {suggestions8.map((suggestion8, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick8(suggestion8.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion8 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion8.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={preCarbonQty || ''} onChange={(e) => setPreCarbonQty(e.target.value)}  placeholder='Qty'  style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Sediment</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={sediment} onChange={handleChange9} placeholder='Sediment' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive9 && (
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
              {suggestions9.map((suggestion9, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick9(suggestion9.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion9 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion9.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={sedimentQty || ''} onChange={(e) => setSedimentQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Post Carbon</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={postCarbon} onChange={handleChange10} placeholder='Post Carbon' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive10 && (
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
              {suggestions10.map((suggestion10, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick10(suggestion10.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion10 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion10.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={postCarbonQty || ''} onChange={(e) => setPostCarbonQty(e.target.value)}  placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Copper</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={copper} onChange={handleChange11} placeholder='Copper'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive11 && (
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
              {suggestions11.map((suggestion11, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick11(suggestion11.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion11 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion11.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={copperQty || ''} onChange={(e)=> setCopperQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>UV</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={uv} onChange={handleChange12} placeholder='UV' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive12 && (
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
              {suggestions12.map((suggestion12, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick12(suggestion12.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion12 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion12.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={uvQty || ''} onChange={(e) => setUvQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>UF</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={uf} onChange={handleChange13} placeholder='UF'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive13 && (
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
              {suggestions13.map((suggestion13, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick13(suggestion13.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion13 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion13.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={ufQty || ''} onChange={(e)=>setUfQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}> Alkaline</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={alkaline} onChange={handleChange14} placeholder=' Alkaline'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive14 && (
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
              {suggestions14.map((suggestion14, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick14(suggestion14.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion14 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion14.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={alkalineQty || ''} onChange={(e) => setAlkalineQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>DoublePushElbow</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={doublePushElbow} onChange={handleChange15} placeholder='DoublePushElbow' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive15 && (
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
              {suggestions15.map((suggestion15, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick15(suggestion15.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion15 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion15.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={doublePushElbowQty || ''} onChange={(e) =>setDoublePushElbowQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Membrane Housing</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={membraneHousing} onChange={handleChange16} placeholder='Membrane Housing'  style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive16 && (
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
              {suggestions16.map((suggestion16, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick16(suggestion16.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion16 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion16.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={membraneHousingQty || ''} onChange={(e)=>setMembraneHousingQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Membrane Elbow</lable> 
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={membraneElbow} onChange={handleChange17} placeholder='Membrane Elbow' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive17 && (
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
              {suggestions17.map((suggestion17, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick17(suggestion17.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion17 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion17.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={membraneElbowQty || ''} onChange={(e)=>setMembraneElbowQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Fr</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={fr} onChange={handleChange18} placeholder='Fr' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive18 && (
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
              {suggestions18.map((suggestion18, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick18(suggestion18.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion18 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion18.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={frQty || ''} onChange={(e) =>setFrQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Dolphin Float</lable> 
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={dolphinFloat} onChange={handleChange19} placeholder='Dolphin Float' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive19 && (
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
              {suggestions19.map((suggestion19, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick19(suggestion19.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion19 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion19.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={dolphinFloatQty || ''}  onChange={(e)=>setDolphinFloatQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Dolphin</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={dolphin} onChange={handleChange20} placeholder='Dolphin' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive20 && (
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
              {suggestions20.map((suggestion20, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick20(suggestion20.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion20 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion20.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>  
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={dolphinQty || ''} onChange={(e)=>setDolphinQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Bulkit</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={bulkit} onChange={handleChange21} placeholder='Bulkit' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive21 && (
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
              {suggestions21.map((suggestion21, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick21(suggestion21.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion21 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion21.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={bulkitQty ||''} onChange={(e)=> setBulkitQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Tap</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={tap} onChange={handleChange22}  placeholder='Tap' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive22 && (
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
              {suggestions22.map((suggestion22, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick22(suggestion22.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion22 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion22.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={tapQty || ''} onChange={(e) => setTapQty(e.target.value)} placeholder='Qty'style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Taflon</lable> 
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={taflon} onChange={handleChange23} placeholder='Taflon' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive23 && (
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
              {suggestions23.map((suggestion23, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick23(suggestion23.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion23 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion23.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={taflonQty || ''} onChange={(e)=> setTaflonQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Tube</lable> 
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={tube} onChange={handleChange24} placeholder='Tube' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive24 && (
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
              {suggestions24.map((suggestion24, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick24(suggestion24.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion24 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion24.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={tubeQty || ''} onChange={(e)=> setTubeQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Cuplink</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={cupLink} onChange={handleChange25} placeholder='Cuplink' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive25 && (
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
              {suggestions25.map((suggestion25, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick25(suggestion25.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion25 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion25.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label> 
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={cupLinkQty || ''} onChange={(e)=>setCuplinkQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>ON/Off Switch</lable> 
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={onof} onChange={handleChange26} placeholder='ON/Off Switch' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive26 && (
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
              {suggestions26.map((suggestion26, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick26(suggestion26.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion26 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion26.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={onofQty || ''} onChange={(e)=>setOnOfQty(e.target.value)}  placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Wire</lable> 
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={wire} onChange={handleChange27} placeholder='Wire' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive27 && (
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
              {suggestions27.map((suggestion27, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick27(suggestion27.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion27 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion27.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={wireQty || ''} onChange={(e)=>setWireQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

    <div className="grid-container" style={gridContainerStyle}>
      <div className="grid-item" style={gridItemStyle}>
      <lable style={{fontWeight:"500", marginLeft:"2px"}}>Clamp</lable>
      </div>
      <div className="grid-item" style={gridItemStyle1}>
      <input value={clamp} onChange={handleChange28} placeholder='clamp' style={NameInput}/>
      <div style={{marginRight:"350px"}}>
      {suggestionsActive28 && (
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
              {suggestions28.map((suggestion28, index) => (
                <div
                  key={index}
                  className="pumpPlate"
                  onClick={() => handleClick28(suggestion28.itemName)}
                  style={{
                    padding: '4px',
                    margin: "0",
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: index === suggestion28 ? '#f2f2f2' : 'white',
                  }}
                >
                  {suggestion28.itemName}
                </div>
              ))}
            </div>
          )}
     </div>
     </div>
      <div className="grid-item" style={gridItemStyle2}>
      <label style={{fontWeight:"500", marginLeft:"45px"}}>Qty</label>
     </div>
      <div className="grid-item" style={gridItemStyle3}>
      <input value={clampQty || ''} onChange={(e)=>setClampQty(e.target.value)} placeholder='Qty' style={QtyInput} />
      </div>
    </div>

   

         </div>

        </div>


        <div style={{marginTop:"610px", width:"850px",position:'absolute', marginLeft:"535px"}}>
        <div className="grid-container" style={footerStyleGrid}>
      <div className="grid-item" style={footerStyle}>
      <lable style={{fontWeight:"500", marginLeft:"7px"}}>Machine Qty</lable>
      </div>
      <div className="grid-item" style={footerStyle1}>
      <input 
       placeholder='cabinets'
       value={machineQty || ''}
       onChange={(e) => setMachineQty(e.target.value)}
       style={{ 
        borderRadius:"5px",
        border: '1px solid #ccc',
        fontSize:"16px",
        outline:"none",
        padding: '2px',
        width:"100px"}}/>
     </div>
      <div className="grid-item" style={footerStyle2}>
      <label style={{fontWeight:"500"}}>MachinePrice</label>
     </div>
      <div className="grid-item" style={footerStyle3}>
      <input placeholder='Price'
      value={machinePrice}
      style={{ 
        borderRadius:"5px",
        border: '1px solid #ccc',
        fontSize:"16px",
        outline:"none",
        padding: '2px',
        width:"100px"}} />
      </div>
      <div style={{footerStyle4}}> 
        <button style={{
          paddingLeft:"20px",
          paddingRight:"20px",
          paddingTop:"3px",
          paddingBottom:"3px",
          border:"none",
          background:"#216fff",
          borderRadius:"10px",
          color:"white"
        }} onClick={handleSubmit}>save</button>
        </div>
    </div>
        </div>
        
    </div>
  )
}

export default MachineEntry