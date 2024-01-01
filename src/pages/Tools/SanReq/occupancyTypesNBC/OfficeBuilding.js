import React,{useState,useContext} from "react";
import image from '../../../../assets/SanReq/1.png'
import { SchematicContext } from '../../../../context/Schematic/SchematicContextProvider';
import NumericInput from '../NumericInput'; // Import the NumericInput component

const OfficeBuilding=()=>{
    const {mode} = useContext(SchematicContext);

    const [inputValue1, setInputValue1] = useState(0);
    const [inputValue2, setInputValue2] = useState(0);
    const [inputValue3, setInputValue3] = useState(0);
    let m = Number(inputValue1); // m is number of males
    let f = Number(inputValue2); // f is number of females
    let total = m+f;

    const MaleWcCount=()=>{
        let maleWcCount;
        maleWcCount=m/25;
        if(isNaN(maleWcCount)){maleWcCount=0;}
        if(m<13 && m>0){return 1;}
        return Math.round(maleWcCount);
    };
    const FemaleWcCount=()=>{
        let femaleWcCount;
        femaleWcCount=f/15;
        if(isNaN(femaleWcCount)){femaleWcCount=0;}
        if(f<8 && f>0){return 1;}
        return Math.round(femaleWcCount);
    };
    const MaleUrinalCount=()=>{
        let maleUrinalCount;
        if(m>=200){maleUrinalCount=(m*0.025)+4;}
        else if(m>=101){maleUrinalCount=(m*0.03)+4;}
        else if(m>=71){maleUrinalCount=4;}
        else if(m>=46){maleUrinalCount=3;}
        else if(m>=21){maleUrinalCount=2;}
        else if(m>=7){maleUrinalCount=1;}
        else{maleUrinalCount=0;}
        return Math.round(maleUrinalCount);
    };
    const MaleWbCount=()=>{
        let maleWbCount;
        if(isNaN(maleWbCount)){maleWbCount=0;}
        if(m>25){maleWbCount=m/25;}
        else if(m>0){maleWbCount=1;}
        return Math.round(maleWbCount);
    };
    const FemaleWbCount=()=>{
        let femaleWbCount;
        if(isNaN(femaleWbCount)){femaleWbCount=0;}
        if(f>25){femaleWbCount=f/25;}
        else if(f>0){femaleWbCount=1;}
        return Math.round(femaleWbCount);   
    };
    const WaterFountainCount=()=>{
        let waterFountainCount;
        waterFountainCount=(m+f)/100;
        if(isNaN(waterFountainCount)){waterFountainCount=0;}
        if((m+f)<100 && (m+f)>0){return 1;}
        return Math.round(waterFountainCount);
    }
    return(
    <>
        <div className='table-responsive'>
            <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
                <thead className='table-primary align-middle'>
                    <tr>
                    <th scope="col" rowSpan={2}>Sl No.</th>
                    <th scope="col"rowSpan={2}>Fixture</th>
                    <th scope="col" colSpan="2">Public</th>
                    <th scope="col" colSpan="2">Staff</th>
                    </tr>
                    <tr>
                    <th scope="col">Males</th>
                    <th scope="col">Females</th>
                    <th scope="col">Males</th>
                    <th scope="col">Females</th>
                    </tr>
                </thead>
                <tbody className='table-group-divider'>
                    <tr>
                    <th scope="row">1</th>
                    <td>Executive Rooms and Conference Halls in Office building</td>
                    <td colSpan="2">Unit could be common for male/ female or separate depending on the number of user of each facility</td>
                    <td colSpan="2">for individual office rooms</td>
                    </tr>
                    <tr>
                    <th colSpan="6">Main Office Toilets for Staff and Visitors</th>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Water Closets</td>
                    <td colSpan="2"></td>
                    <td>{MaleWcCount()}</td>
                    <td>{FemaleWcCount()}</td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Ablution Tap</td>
                    <td colSpan="2"></td>
                    <td></td>
                    <td></td>
                    </tr>
                    <tr>
                    <th scope="row">4</th>
                    <td>Urinals</td>
                    <td colSpan="2"></td>
                    <td>{MaleUrinalCount()}</td>
                    <td>-</td>
                    </tr>
                    <tr>
                    <th scope="row">5</th>
                    <td>Wash Basins</td>
                    <td colSpan="2"></td>
                    <td>{MaleWbCount()}</td>
                    <td>{FemaleWbCount()}</td>
                    </tr>
                    <tr>
                    <th scope="row">6</th>
                    <td>Drinking Water fountain</td>
                    <td colSpan="2"></td>
                    <td colSpan="2">{WaterFountainCount()}</td>
                    </tr>
                    <tr>
                    <th scope="row">7</th>
                    <td>Cleaner's sink</td>
                    <td colSpan="4">{inputValue3}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="input-group mb-3 ">
            <NumericInput span="Male" value={inputValue1} onChange={setInputValue1}/>
            <NumericInput span="Female" value={inputValue2} onChange={setInputValue2}/>
        </div>
        <div className="input-group mb-3">
            <span className="input-group-text">Total Number of People</span>
            <input className="form-control" type="text" value={total} aria-label="readonly input" readOnly/>
        </div>
        <div className="input-group mb-3">
            <NumericInput span="Number of Floors in a Building" value={inputValue3} onChange={setInputValue3}/>
        </div>
        <div className='d-flex justify-content-start'>
            <img src={image} className="img-fluid" alt="" />
        </div>
    </>
    );
};

export default OfficeBuilding;