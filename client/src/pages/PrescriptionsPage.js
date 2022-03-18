import React, {useState, useEffect} from 'react';
import '../App.css';
import Axios from 'axios';
import PrescriptionsTable from '../components/PrescriptionsTable';

function PrescriptionsPage() {

    const [showTable, openTable] = useState(false)
    const [prescriptions, setPrescriptions] = useState([])

    useEffect(() => {
        loadPrescriptions();
    }, []);

    //Get data from 'Create' field
    const [date, setDate] = useState('')
    const [drug, setDrug] = useState('')
    const [dosage, setDosage] = useState('')
    const [petID, setPetID] = useState('')
    const [doctorID, setDoctorID] = useState('')
    const [petList, setPetList] = useState([])
    const [doctorList, setDoctorList] = useState([])

    //Get data from 'Search' field
    const [sDate, searchDate] = useState('')
    const [sDrug, searchDrug] = useState('')
    const [sDosage, searchDosage] = useState('')
    const [sPetID, searchPetID] = useState('')
    const [sDoctorID, searchDoctorID] = useState('')
    const [sPetList, searchPetList] = useState([])
    const [sDoctorList, searchDoctorList] = useState([])

    //
    const loadPrescriptions = () => {
        Axios.get('http://localhost:3001/prescriptions/get').then((response) => {
            setPrescriptions(response.data)
        });
    }

    const createPrescription = () => {
        Axios.post('http://localhost:3001/prescriptions/insert', {
            date: date,
            drug: drug,
            dosage: dosage,
            petID: petID,
            doctorID: doctorID
        }).then(()=> {
            alert('successful insert');
            loadPrescriptions();
        });
    };

    const searchPrescriptions = () => {
        Axios.post('http://localhost:3001/prescriptions/search', {
            date: sDate,
            drug: sDrug,
            dosage: sDosage,
            petID: sPetID,
            doctorID: sDoctorID
        }).then((response)=> {
            setPrescriptions(response.data)
            alert('Search Complete')
        });
    };

    const deletePrescription = prescriptionID => {
        console.log(prescriptionID)
        Axios.delete(`http://localhost:3001/prescriptions/${prescriptionID}`, {
        }).then(()=> {
            alert("prescription deleted")
            loadPrescriptions();
        });
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/pets/get').then((response) => {
            setPetList(response.data)
        })
    }, [])

    useEffect(() => {
        Axios.get('http://localhost:3001/doctors/get').then((response) => {
            setDoctorList(response.data)
        })
    }, [])

    return (
        <div className="App">
            <h1>Search or Create Prescriptions</h1>
            <table id="CreatePrescription">
                <thead>
                    <th>Create New Prescription</th>
                </thead>
                <tbody>
                    <tr>
                        <td>*Date:</td>
                        <td><input type="date" name="prescriptionDate" onChange= {((e)=> {
                            setDate(e.target.value)
                        })} /></td>
                        <td>*Drug Name:</td>
                        <td><input type="text" name="prescriptionDrug" onChange= {((e)=> {
                            setDrug(e.target.value)
                        })} /></td>
                    </tr>
                    <tr>
                        <td>*Dosage:</td>
                        <td><input type="text" name="prescriptionDosage" onChange= {((e)=> {
                            setDosage(e.target.value)
                        })} /></td>
                        <td>*Pet ID:</td>
                        <td><select name="prescriptionPetID" onChange= {((e)=> {
                            setPetID(e.target.value)
                        })}>
                                <option hidden disabled selected value></option>
                                {petList.map((val) => {
                                    return <option value={val.petID}>{val.petID}</option>
                                })}
                            </select> 
                        </td>
                    </tr>
                    <tr>
                        <td>*Doctor ID:</td>
                        <td><select name="prescriptionDoctorID" onChange= {((e)=> {
                            setDoctorID(e.target.value)
                        })}>
                                <option hidden disabled selected value></option>
                                {doctorList.map((val) => {
                                    return <option value={val.doctorID}>{val.doctorID}</option>
                                })}
                            </select>
                        </td>
                    </tr>
                </tbody>
                <tfoot>*Required</tfoot>
            </table>
            <button onClick={createPrescription}>Create</button>

            <table id="SearchPrescriptions">
                <thead>
                    <th>Find Prescriptions</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Date:</td>
                        <td><input type="date" name="prescriptionDate" onChange={((e)=> {
                            searchDate(e.target.value)
                        })} /></td>
                        <td>Drug Name:</td>
                        <td><input type="text" name="prescriptionDrug"  onChange={((e)=> {
                            searchDrug(e.target.value)
                        })} /></td>
                    </tr>
                    <tr>
                        <td>Dosage:</td>
                        <td><input type="text" name="prescriptionDosage" onChange={((e)=> {
                            searchDosage(e.target.value)
                        })} /></td>
                        <td>Pet ID:</td>
                        <td><input type="number" name="prescriptionPetID" onChange={((e)=> {
                            searchPetID(e.target.value)
                        })} /></td>
                    </tr>
                    <tr>
                        <td>Doctor ID:</td>
                        <td><input type="number" name="prescriptionDoctorID" onChange={((e)=> {
                            searchDoctorID(e.target.value)
                        })} /></td>
                    </tr>
                </tbody>
            </table>
            <button onClick={() => searchPrescriptions()}>Search</button>
            <button onClick={() => loadPrescriptions()}>View All</button>
            <div>
                {<PrescriptionsTable prescriptions={prescriptions} deletePrescription={deletePrescription} />}
            </div>
        </div>
    );
}

export default PrescriptionsPage;