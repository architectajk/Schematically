import React,{useState, useContext} from 'react';
import image from '../../../../assets/SanReq/13.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const ProduceMarkets = () => {
  const {mode} = useContext(SchematicContext);
  const [inputValue1, setInputValue1] = useState(0);
  const [inputValue2, setInputValue2] = useState(0);
  const [inputValue3, setInputValue3] = useState(0);
  const [inputValue4, setInputValue4] = useState(0);
  const [inputValue5, setInputValue5] = useState(0);
  const [inputValue6, setInputValue6] = useState(0);
  let shopOwnerMale = Number(inputValue1);
  let shopOwnerFemale = Number(inputValue2);
  let totalShopOwners= shopOwnerMale+shopOwnerFemale;
  let commonMale = Number(inputValue3);
  let commonFemale = Number(inputValue4);
  let totalCommon = commonMale+commonFemale;
  let m = Number(inputValue5); // m is number of males
  let f = Number(inputValue6); // f is number of females
  let totalPublic = m+f;

  const calculateFacilityCount = (count, ratio) => Math.round(count / ratio);
  const ShopOwnerWcCount = ()=> calculateFacilityCount(totalShopOwners,8)
  const CommonMaleWcCount=()=>{
    let commonMaleWcCount=0;
    if(commonMale>200){commonMaleWcCount=((commonMale-100)*0.025)+4}
    else if(commonMale>=101){commonMaleWcCount=((commonMale-100)*0.03)+4}
    else if(commonMale>=66){commonMaleWcCount=4}
    else if(commonMale>=36){commonMaleWcCount=3}
    else if(commonMale>=16){commonMaleWcCount=2}
    else if(commonMale>0){commonMaleWcCount=1}
    return Math.round(commonMaleWcCount)
  };
  const CommonFemaleWcCount=()=>{
    let commonFemaleWcCount=0;
    if (commonFemale>200){commonFemaleWcCount=((commonFemale-100)*0.04)+6}
    else if (commonFemale>=101){commonFemaleWcCount=((commonFemale-100)*0.05)+6}
    else if (commonFemale>=78){commonFemaleWcCount=6}
    else if (commonFemale>=58){commonFemaleWcCount=5}
    else if (commonFemale>=41){commonFemaleWcCount=4}
    else if (commonFemale>=26){commonFemaleWcCount=3}
    else if (commonFemale>=13){commonFemaleWcCount=2}
    else if (commonFemale>0){commonFemaleWcCount=1}
    return Math.round(commonFemaleWcCount)
  };
  const PublicMaleWcCount=()=> { 
    let publicMaleWcCount=0;
    if (m<100 & m>0){return 2}
    else publicMaleWcCount = m/50;
    return Math.round(publicMaleWcCount)
    
  };
  const PublicFemaleWcCount=()=>{
    let publicFemaleWcCount=0;
    if (f<100 & m>0){return 2}
    else publicFemaleWcCount=f/50;
    return Math.round (publicFemaleWcCount)
  };
  const CommonUrinalCount=()=>{
    let commonUrinalCount=0;
    if (commonMale>200){commonUrinalCount=((commonMale-100)*0.025)+4}
    else if (commonMale>=101){commonUrinalCount=((commonMale-100)*0.03)+4}
    else if (commonMale>=71){commonUrinalCount=4}
    else if (commonMale>=46){commonUrinalCount=3}
    else if (commonMale>=21){commonUrinalCount=2}
    else if(commonMale>=7){commonUrinalCount=1}
    return Math.round(commonUrinalCount)
  };
  const PublicUrinalCount=()=> calculateFacilityCount(m,50)
  const ShopOwnerMaleBathCount = ()=> calculateFacilityCount(shopOwnerMale,8)
  const ShopOwnerFemaleBathCount = ()=> calculateFacilityCount(shopOwnerFemale,6)
  const PublicMaleBathCount=()=> calculateFacilityCount(m,50)
  const PublicFemaleBathCount=()=> calculateFacilityCount(f,50)
  
  return (
    <div>
        <div className='d-flex justify-content-center'>
        <table className={`table table-${mode} table-hover table-bordered w-75 align-middle`}>
          <thead className='align-middle'>
            <tr>
              <th scope="col">Sl No.</th>
              <th scope="col">Fixture</th>
              <th scope="col" colSpan="2">Shop Owners</th>
              <th scope="col" colSpan="2">Common Toilets in Market Building</th>
              <th scope="col" colSpan="2">Public Toilet for Floating Population</th>
            </tr>
            <tr>
              <th scope="col" colSpan="2"></th>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
              <th scope="col">Male</th>
              <th scope="col">Female</th>
            </tr>
          </thead> 
          <tbody className='table-group-divider'>
            <tr>
              <th scope="row">1</th>
              <td>Water Closets</td>
              <td colSpan={2}>{ShopOwnerWcCount()}</td>
              <td>{CommonMaleWcCount()}</td>
              <td>{CommonFemaleWcCount()}</td>
              <td>{PublicMaleWcCount()}</td>
              <td>{PublicFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Ablution Tap</td>
              <td colSpan={6}>One in each water closet</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Urinals</td>
              <td>-</td>
              <td>-</td>
              <td>{CommonUrinalCount()}</td>
              <td>-</td>
              <td>{PublicUrinalCount()}</td>
              <td>-</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Wash Basins</td>
              <td colSpan={2}>{ShopOwnerWcCount()}</td>
              <td>{CommonMaleWcCount()}</td>
              <td>{CommonFemaleWcCount()}</td>
              <td>{PublicMaleWcCount()}</td>
              <td>{PublicFemaleWcCount()}</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Bath/Showers</td>
              <td>{ShopOwnerMaleBathCount()}</td>
              <td>{ShopOwnerFemaleBathCount()}</td>
              <td>-</td>
              <td>-</td>
              <td>{PublicMaleBathCount()}</td>
              <td>{PublicFemaleBathCount()}</td>
            </tr>           
          </tbody>
        </table>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="ShopOwner(Male)" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="ShopOwner(Female)" value={inputValue2} onChange={setInputValue2}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of ShopOwners</span>
            <input className="form-control" type="text" value={totalShopOwners} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Common Market (Male)" value={inputValue3} onChange={setInputValue3}/>
            <NumericInput span="Common Market (Female)" value={inputValue4} onChange={setInputValue4}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of personnel</span>
            <input className="form-control" type="text" value={totalCommon} aria-label="readonly input" readonly/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <NumericInput span="Male" value={inputValue5} onChange={setInputValue5}/>
            <NumericInput span="Female" value={inputValue6} onChange={setInputValue6}/>
      </div>
      <div className="container input-group mb-3 w-75 ">
            <span className="input-group-text">Total Number of People</span>
            <input className="form-control" type="text" value={totalPublic} aria-label="readonly input" readonly/>
      </div>
      <div className='d-flex justify-content-center'>
        <img src={image} alt="" />
      </div>       
    </div>
  )
}

export default ProduceMarkets
