import React, {useState} from "react";
import Axios from "axios";
import Answer from "./Answer"

const Form = ()=> {
    /*States*/
    const [data, setData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        org:'',
        euResident:'',
        advances:'',
        alerts:'',
        other:''

    });
    const [error,setError] = useState({});
    const [show,setShow] = useState(false);
    const [answer, setAnswer] = useState("");

    /*Handles*/
    const handleInputChange = (e) =>{
        let errors = {};
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setData({
            ...data,
            [name]: value
            
        })
        //Validate Email
        if(e.target.name === "email"){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(data.email)) {
            errors.email="Email address is not valid"
            }
        }else{
            errors.email=""
        }
        setError(errors)
    }

    const handleSubmit = (e)=>{
        const url="https://613988081fcce10017e78b2e.mockapi.io/form";
        e.preventDefault();
        validateData()
        if(validateData()){
            Axios.post(url,{
                email:data.email,
                firstName:data.firstName,
                lastName: data.lastName,
                org: data.org,
                euResident: data.euResident,
                advances: (data.advances) ? 'advances' : "",
                alerts: (data.alerts) ? 'alerts' : "",
                other: (data.other) ? 'other' : "",
                
            })
            .then(res=>{
                setShow(true)
                let status = res.data.status;
                console.log(res.data.status)
                if(res.data.status === "success"){
                    setAnswer(res.data.message);
                    console.log(res.data.message)
                }
                
            })
        }
    }
    const handleReset = (e)=>{
        e.preventDefault();
        setData({
            firstName:'',
            lastName:'',
            email:'',
            org:'',
            euResident:'',
            advances:'',
            alerts:'',
            other:''
        });
        setError({});
    }

    /*Validations*/
    const validateData = ()=>{
        let errors = {};
        let valid = true;
        if(!data.firstName){
            valid = false;
            errors.firstName= "First Name is required"
        };

        if(!data.lastName){
            valid = false;
            errors.lastName="Last Name is required"
        };

        if(!data.email){
            valid = false;
            errors.email="Email address is required"
        }

        if(!data.euResident){
            valid = false;
            errors.euResident="EU Resident is required"
        };
        if(!data.advances && !data.alerts && !data.other){
            valid = false;
            errors.checks = "Please, select at least one option"
        }
        setError(errors)

        if(valid){
            return true
        }else{
            return false;
        }
        
    }
    
   
  return (
    <div className="Form">
      {!show && (
      <div>
      <header className="Form-header">
        <h2>Sign Up for email updates</h2>
            <p>*Indicates Required Field</p>
      </header>
     
      <div className="Form-container">
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Personnel information</legend>
                <div className="input-cont">
                    <div className="col">
                        <div className = "errorMsg">{error.firstName}</div>
                        <label for="firstName">
                            <span className="lbl">FIRST NAME*</span>
                            <input 
                                type="text"
                                name="firstName" 
                                id="firstName" 
                                onChange={handleInputChange}
                                value={data.firstName}
                            />
                        </label>
                    </div>
                    <div className="col">
                        <div className = "errorMsg">{error.lastName}</div>
                        <label for="lastName">
                            <span className="lbl">LAST NAME*</span>
                            <input 
                                type="text" 
                                name="lastName"
                                id="lastName"
                                onChange={handleInputChange} 
                                value={data.lastName}
                            />
                        </label>
                    </div>
                </div>
                <div className="input-cont">
                    <div className="col">
                        <div className = "errorMsg">{error.email}</div>
                        <label for="email">
                            <span className="lbl">EMAIL ADDRESS*</span>
                            <input 
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleInputChange} 
                                value={data.email}

                            />
                        </label>
                    </div>
                    <div className="col">
                        <label for="org">
                            <span className="lbl">ORGANIZATION</span>
                            <input 
                                type="text" 
                                name="org"
                                id="org"
                                onChange={handleInputChange}
                                value={data.org} 
                            />
                        </label>
                    </div>
                </div>
                <div className="input-cont">
                    <div className="col">
                        <label for="euResident">
                            <div className = "errorMsg">{error.euResident}</div>
                            <span className="lbl">EU RESIDENT*</span>
                            <div className="slct">
                                <select 
                                    name="euResident"
                                    id="euResident"
                                    onChange={handleInputChange}
                                > 
                                    <option value="">- SELECT ONE -</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend>Emails you will receive</legend>
                <div className="input-cont">
                    <div className="col">
                        <div className = "errorMsg">{error.checks}</div>
                        <label className="check" for="advances">
                            <input 
                                name="advances"
                                id="advances"
                                type="checkbox"
                                onChange={handleInputChange}
                                checked = {data.advances}
                            />
                                <span className="custom-check"></span>
                                <span>ADVANCES</span>
                        </label>
                    </div>
                    <div className="col">
                        <label className="check" for="alerts">
                            <input
                                name="alerts"
                                id="alerts"
                                type="checkbox"
                                onChange={handleInputChange}
                                checked = {data.alerts}
                            />
                                <span className="custom-check"></span>
                                <span> ALERTS</span>
                        </label>
                    </div>
                </div>

                <div>
                    <label className="check" for="other">
                        <input 
                            name="other"
                            id="other"
                            type="checkbox"
                            onChange={handleInputChange}
                            checked = {data.other}    
                        />
                            <span className="custom-check"></span>
                            <span>OTHER COMMUNCATIONS</span>
                    </label>
                </div>
            </fieldset>
            <footer className = "form-footer">
                <input type="submit" className="btn btn-prim" value="Submit" /> 
                <button className="btn btn-sec" onClick={handleReset}>Reset</button>
            </footer>
            
        </form>
      </div>
    </div>)}
    {show && <Answer answer={answer} />}
  
    </div>
  
  )
}

export default Form;