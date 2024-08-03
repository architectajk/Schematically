import React,{useState,useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import NumericInput2 from './NumericInput2';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MathJax } from 'better-react-mathjax';

const NaturalLightVentCalc = () => {
    const {mode} = useContext(SchematicContext);
    const textColorClass = `text-${mode === 'dark' ? 'light' : 'dark'}`;
    const [title,setTitle] = useState('')
    const [area,setArea] = useState('');
    const [windowArea,setWindowArea] = useState(0);
    const [windowOpenable,setWindowOpenable] = useState(0);
    const [mainTask,setMainTask] = useState([])

    const [titleError, setTitleError] = useState("");
    const [areaError, setAreaError] = useState("");

    const submitHandler=(e)=>{
      e.preventDefault();
      if (!title) {
        setTitleError("Please enter a room name");
        return;
      }
      setMainTask([...mainTask,{title,area,windowArea,windowOpenable,GlazingFloorAreaRatio}]);
      setTitle("");
      setArea(0);
      setWindowArea(0);
      setWindowOpenable(0);
    };

    const handleAreaChange = (value) => {
      if (value <= 2) {
        setAreaError("Please enter Area");
      } else {
        setAreaError("");
      }
      setArea(value);
    };

  const deleteHandler=(i)=>{
    let copytask = [...mainTask]
    copytask.splice(i,1)
    setMainTask(copytask)
  }
  const handleEdit = (i) => {
    const updatedTasks = [...mainTask];
  
    if (updatedTasks[i]) {
      // Check if task object exists at the specified index
      updatedTasks[i] = {
        title: updatedTasks[i].title,
        area: updatedTasks[i].area,
        windowArea: updatedTasks[i].windowArea,
        windowOpenable: updatedTasks[i].windowOpenable,
        GlazingFloorAreaRatio: updatedTasks[i].GlazingFloorAreaRatio,
      };
      setMainTask(updatedTasks);
    }
  };
  const GlazingFloorAreaRatio =()=>{
    let ratio = (windowArea*(windowOpenable/100))/area;
    return (ratio*100).toFixed(2);
  }


    let renderTask =(<tr>
    <td colSpan={8}>No Rooms Added</td>
  </tr>);

    if(mainTask.length>0){
    renderTask = mainTask.map((t,i)=>{
      return (
      <tr key={i}>
        <td>{i+1}</td>
        <td>{t.title}</td>
        <td>{t.area}</td>
        <td>{t.windowArea}</td>
        <td>{t.windowOpenable}</td>
        <td>{t.GlazingFloorAreaRatio()}</td>
        <td>
        <div className='btn-group'>
          <button onClick={() => deleteHandler(i)} className='btn'><MdOutlineDeleteOutline color='red' size={20}/></button><div className=' vr'></div>
          <button onClick={() => handleEdit(i)} className='btn'><FaEdit color='grey' size={20}/></button>
        </div>
        </td>
      </tr>
      );
    })
  }

  return (
 <div className='container'>
  <div className='row gx-4 gb-4' data-bs-theme={mode}>
    <h1 className={`${textColorClass} d-flex mb-4`}>Natural Light and Ventilation Calculation</h1>
      <div className={`col-lg-6 col-sm-auto`}>
        <form onSubmit={submitHandler} className={`bg-${mode} p-4 mb-4`}>
          <div className='mb-3'>
            <div className='form-floating'>
              <input type="text" className="form-control" id="floatingInput" value={title} onChange={(e)=>{setTitle(e.target.value);setTitleError("")}} />
              <label htmlFor="floatingInput">Room Name</label>
              {titleError && <div className="text-danger">{titleError}</div>}
            </div>
          </div>
          <div className='mb-3'>
            <NumericInput2 floatingLable="Area of Room (ft²/m²)" value={area} onChange={handleAreaChange}/>
            {areaError &&<div className='text-danger'>{areaError}</div>}
          </div>
          <div className='mb-3'>
            <NumericInput2 floatingLable="Area of Window (ft²/m²)" value={windowArea} onChange={setWindowArea}/>
          </div>
          <div className='mb-3'>
            <NumericInput2 floatingLable="Window Openable %" value={windowOpenable} onChange={setWindowOpenable}/>
          </div>
        <div>
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
        <div className='table-responsive my-2'>
        <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
          <thead className='text-center'>
            <tr>
              <th>Sl No.</th>
              <th>Room Name</th>
              <th>Carpet Area (ft²/m²)</th>
              <th>Window area</th>
              <th>Window Openable (%)</th>
              <th>Window-to-Floor Area Ratio (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderTask}
          </tbody>
        </table>
      </div>
      </div>
    <div className={`col-lg-6 col-sm-auto p-3`}>
      <h3 className={`${textColorClass} d-flex mb-4`}>Natural Light Calculation Requirements</h3>
      <p className={`${textColorClass} d-flex mb-4`}>The aggregate glazing area for a Habitable Room shall not be less than 8% of the floor area of the room.</p>
      <h3 className={`${textColorClass} d-flex my-4`}>Natural Ventilation Calculation Requirements</h3>
      <p className={`${textColorClass} d-flex mb-4`}>Habitable rooms must provide openings that total no less than 4% of the floor area of the room being ventilated. The openable area shall be open to the outdoors, not another room. These openings can be provided through windows, skylights, doors, louvers, or other approved methods that open to the outside air.</p>
      <h3 className={`${textColorClass} d-flex my-4`}>Openable Window-to-Floor Area Ratio (WFRₒₚ)</h3>
      <p className={`${textColorClass} d-flex mb-4`}>Openable window-to-floor area ratio (WFRₒₚ) indicates the potential of using external air for ventilation. Ensuring minimum WFRₒₚ helps in ventilation, improvement in thermal comfort, and reduction in cooling energy.</p>
      <p className={`${textColorClass} d-flex mb-4`}>The openable window-to-floor area ratio (WFRₒₚ) is the ratio of openable area to the carpet area of dwelling units.</p>
      <h4 className={`${textColorClass} d-flex mb-4 justify-content-center`}>
        <MathJax>{"\\(WFRₒₚ=\\frac{A \\scriptscriptstyle openable}{A \\scriptscriptstyle carpet}\\)"}</MathJax>
      </h4>
      <h5 className={`${textColorClass} d-flex mb-4`}>Minimum requirement of window-to-floor area ratio (WFRₒₚ)</h5>
      <div className='table-responsive'>
        <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col">Climate Zone</th>
              <th scope="col">Minimum WFRₒₚ(%)</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            <tr>
              <th scope="row">Composite</th>
              <td>12.50</td>
            </tr>
            <tr>
              <th scope="row">Hot-Dry</th>
              <td>10.00</td>
            </tr>
            <tr>
              <th scope="row">Warm-Humid</th>
              <td>16.66</td>
            </tr>
            <tr>
              <th scope="row">Temperate</th>
              <td>12.50</td>
            </tr>
            <tr>
              <th scope="row">Cold</th>
              <td>8.33</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='table-responsive'>
        <table className={`table table-sm table-${mode} table-hover table-bordered align-middle`}>
          <thead className='table-primary align-middle'>
            <tr>
              <th scope="col">Type of window/ventilator/door</th>
              <th scope="col">Openable area(%)</th>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            <tr>
              <th scope="row">Casement</th>
              <td>90%</td>
            </tr>
            <tr>
              <th scope="row">Sliding (2 panes)</th>
              <td>50%</td>
            </tr>
            <tr>
              <th scope="row">Sliding (3 panes)</th>
              <td>67%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  </div>
  )
}

export default NaturalLightVentCalc
