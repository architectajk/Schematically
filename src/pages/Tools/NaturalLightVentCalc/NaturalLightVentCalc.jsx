import React,{useState,useContext} from 'react'
import { SchematicContext } from '../../../context/Schematic/SchematicContextProvider';
import NumericInput2 from './NumericInput2';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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
  <div className='row gx-4 gb-4' data-bs-theme={mode}>
    <h1 className={`${textColorClass} d-flex mb-4`}>Natural Light and Ventilation Calculation</h1>
      <div className={`col-lg-8 col-sm-auto`}>
        <form onSubmit={submitHandler} className={`bg-${mode} p-4 rounded-5 mb-4`}>
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
              <th>Floor Area (ft²/m²)</th>
              <th>Window Glazing area</th>
              <th>Window Openable (%)</th>
              <th>Glazing to Floor-Area Ratio (%)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {renderTask}
          </tbody>
        </table>
      </div>
      </div>
    <div className={`col-lg-4 col-sm-auto p-3`}>
      <h3 className={`${textColorClass} d-flex mb-4`}>Natural Light Calculation Requirements</h3>
      <p className={`${textColorClass} d-flex mb-4`}>The aggregate glazing area for a Habitable Room shall not be less than 8 percent of the floor area of the room.</p>
      <h3 className={`${textColorClass} d-flex my-4`}>Natural Ventilation Calculation Requirements</h3>
      <p className={`${textColorClass} d-flex mb-4`}>Habitable rooms must provide openings that total no less than 4 percent of the floor area of the room being ventilated. The openable area shall be open to the outdoors, not another room. These openings can be provided through windows, skylights, doors, louvers, or other approved methods that open to the outside air.</p>
    </div>
  </div>
  
  )
}

export default NaturalLightVentCalc
