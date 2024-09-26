import { useEffect, useMemo, useState } from 'react';
import axiosClient from '../../../utils/axiosClient';

const defaultFields = {
    patient_id: '',
    consultationDate: '',
    consultationTime: '',
    laboratoryName: '',
    frame: '',
    pxName: '',
    previousEyeGrade: { OD: { sphere: '', cylinder: '', axis: '', add: '' }, OS: { sphere: '', cylinder: '', axis: '', add: '' } },
    currentEyeGrade: { OD: { sphere: '', cylinder: '', axis: '', add: '' }, OS: { sphere: '', cylinder: '', axis: '', add: '' } },
    pd: '',
    lens: 'single vision',
    lensType: 'plastic',
    mcBrand: '',
    mcType: '1.5',
    tint: '',
    labInstruction: '',
    doubleVisionOptions: '',
};

const spheres = [
    -0.25, -0.50, -1.00, -1.50, -2.00, -3.00, -4.00, +0.25, +0.50, +1.00, +1.50, +2.00, +3.00, +4.00
]
const SphereOptions = <>
    <option value="" hidden>Sphere</option>
    {spheres.map((sphere, id) => <option key={id} value={sphere}>{sphere}</option>)}
</>;

const cylinders = [
    -0.25, -0.50, -0.75, -1.00, -1.25, -1.50, -2.00, -2.50
]

const CylinderOptions = <>
    <option value="" hidden>Cylinder</option>
    {cylinders.map((cylinder, id) => <option key={id} value={cylinder}>{cylinder}</option>)}
</>;

const axes = [
    0, 10, 20, 45, 90, 135, 180
]

const AxesOptions = <>
    <option value="" hidden>Axis</option>
    {axes.map((axis, id) => <option key={id} value={axis}>{axis}</option>)}
</>;

const adds = [
    +0.75, +1.00, +1.25, +1.50, +1.75, +2.00, +2.25, +2.50, +2.75, +3.00
]

const AddOptions = <>
    <option value="" hidden>Add</option>
    {adds.map((add, id) => <option key={id} value={add}>{add}</option>)}
</>;


const LensConsultationModal = ({ handleCloseModal, isModalVisible, selectedPatient }) => {

    const [formData, setFormData] = useState(defaultFields);

    const [error, setError] = useState("");

    const [patients, setPatients] = useState([]);


    useMemo(() => {
        if (selectedPatient._id)
            setFormData({ patient_id: selectedPatient._id, ...selectedPatient.lensConsultation });
        else
            setFormData(defaultFields)
    }, [selectedPatient])

    useEffect(() => {
        axiosClient
            .get("/patients")
            .then(({ data }) => {
                setPatients(data);
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    alert(message);
                }
            );
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNestedChange = (e, field, subfield, subsubfield) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [field]: {
                ...prevData[field],
                [subfield]: {
                    ...prevData[field][subfield],
                    [subsubfield]: value,
                },
            },
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axiosClient
            .put("/patient-lens/", { lensConsultation: formData })
            .then(({ data: { message } }) => {
                alert(message);
                window.location.reload();
            })
            .catch(
                ({
                    response: {
                        data: { message },
                    },
                }) => {
                    setError(message);
                }
            );
    };

    if (!isModalVisible)
        return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto p-4 bg-white shadow-md rounded">
                <h2 className="text-2xl font-bold mb-4">Patient Visit Details</h2>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <div className="grid grid-cols-4 gap-4">
                    <select
                        type="text"
                        name="patient_id"
                        placeholder="Patient Name"
                        value={formData.patient_id}
                        onChange={handleChange}
                        className="mb-2 p-2 w-full border rounded"
                    >
                        <option value="" hidden>-- Select Patient -- </option>
                        {patients.map(patient => <option key={patient._id} value={patient._id}>{patient.name}</option>)}
                    </select>
                    <input
                        type="text"
                        name="laboratoryName"
                        placeholder="Laboratory Name"
                        value={formData.laboratoryName}
                        onChange={handleChange}
                        className="mb-2 p-2 w-full border rounded"
                    />
                    <input
                        type="text"
                        name="pxName"
                        placeholder="Px Name"
                        value={formData.pxName}
                        onChange={handleChange}
                        className="mb-2 p-2 w-full border rounded"
                    />
                    <input
                        type="text"
                        name="pd"
                        placeholder="P.D"
                        value={formData.pd}
                        onChange={handleChange}
                        className="mb-2 p-2 w-full border rounded"
                    />

                    {/* Consultation Date/Time */}
                    <div className="col-span-2">
                        <h3 className="font-bold mb-2">Consultation Date/Time</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input
                                type="date"
                                name="consultationDate"
                                value={formData.consultationDate}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            />
                            <input
                                type="time"
                                name="consultationTime"
                                value={formData.consultationTime}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            />
                        </div>
                    </div>

                    <div className="col-span-4">
                        <div className='grid grid-cols-4 gap-8'>
                            {/* Previous Eye Grade */}
                            <div className="col-span-2">
                                <h3 className="font-bold mb-2">Previous Eye Grade</h3>
                                <div className="w-full grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">OD</h3>
                                        <select
                                            value={formData.previousEyeGrade.OD.sphere}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OD', 'sphere')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {SphereOptions}
                                        </select>
                                        <select
                                            value={formData.previousEyeGrade.OD.cylinder}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OD', 'cylinder')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {CylinderOptions}
                                        </select>
                                        <select
                                            value={formData.previousEyeGrade.OD.axis}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OD', 'axis')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AxesOptions}
                                        </select>
                                        <select
                                            value={formData.previousEyeGrade.OD.add}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OD', 'add')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AddOptions}
                                        </select>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">OS</h3>
                                        <select
                                            value={formData.previousEyeGrade.OS.sphere}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OS', 'sphere')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {SphereOptions}
                                        </select>
                                        <select
                                            value={formData.previousEyeGrade.OS.cylinder}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OS', 'cylinder')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {CylinderOptions}
                                        </select>
                                        <select
                                            value={formData.previousEyeGrade.OS.axis}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OS', 'axis')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AxesOptions}
                                        </select>
                                        <select
                                            value={formData.previousEyeGrade.OS.add}
                                            onChange={(e) => handleNestedChange(e, 'previousEyeGrade', 'OS', 'add')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AddOptions}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Current Eye Grade */}
                            <div className="col-span-2">
                                <h3 className="font-bold mb-2">Current Eye Grade</h3>

                                <div className="w-full grid grid-cols-2 gap-4">
                                    <div>
                                        <h3 className="font-semibold mb-2">OD</h3>
                                        <select
                                            value={formData.currentEyeGrade.OD.sphere}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OD', 'sphere')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {SphereOptions}
                                        </select>
                                        <select
                                            value={formData.currentEyeGrade.OD.cylinder}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OD', 'cylinder')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {CylinderOptions}
                                        </select>
                                        <select
                                            value={formData.currentEyeGrade.OD.axis}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OD', 'axis')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AxesOptions}
                                        </select>
                                        <select
                                            value={formData.currentEyeGrade.OD.add}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OD', 'add')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AddOptions}
                                        </select>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">OS</h3>
                                        <select
                                            value={formData.currentEyeGrade.OS.sphere}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OS', 'sphere')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {SphereOptions}
                                        </select>
                                        <select
                                            value={formData.currentEyeGrade.OS.cylinder}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OS', 'cylinder')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {CylinderOptions}
                                        </select>
                                        <select
                                            value={formData.currentEyeGrade.OS.axis}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OS', 'axis')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AxesOptions}
                                        </select>
                                        <select
                                            value={formData.currentEyeGrade.OS.add}
                                            onChange={(e) => handleNestedChange(e, 'currentEyeGrade', 'OS', 'add')}
                                            className="mb-2 p-2 w-full border rounded"
                                            required
                                        >
                                            {AddOptions}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Others */}
                    <div className="col-span-4">
                        <h3 className="font-bold mb-2">Others</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <input
                                type="text"
                                name="frame"
                                placeholder="Frame"
                                value={formData.frame}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            />
                            <select
                                name="lens"
                                value={formData.lens}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            >
                                <option value="single vision">Single Vision</option>
                                <option value="double vision">Double Vision</option>
                            </select>
                            {formData.lens === 'double vision' && (
                                <select
                                    name="doubleVisionOptions"
                                    value={formData.doubleVisionOptions}
                                    onChange={handleChange}
                                    className="mb-2 p-2 w-full border rounded"
                                >
                                    <option value="KK">KK</option>
                                    <option value="FT28">FT28</option>
                                    <option value="FT35">FT35</option>
                                    <option value="NL">NL</option>
                                    <option value="PROG">PROG</option>
                                </select>
                            )}
                            <select
                                name="lensType"
                                value={formData.lensType}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            >
                                <option value="plastic">Plastic</option>
                                <option value="glass">Glass</option>
                            </select>
                            <input
                                type="text"
                                name="mcBrand"
                                placeholder="M.C Brand"
                                value={formData.mcBrand}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            />
                            <select
                                name="mcType"
                                value={formData.mcType}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            >
                                <option value="1.5">1.5</option>
                                <option value="1.56">1.56</option>
                            </select>
                            <input
                                type="text"
                                name="tint"
                                placeholder="TINT"
                                value={formData.tint}
                                onChange={handleChange}
                                className="mb-2 p-2 w-full border rounded"
                            />
                        </div>
                    </div>
                </div>
                <textarea
                    name="labInstruction"
                    placeholder="Lab Instruction"
                    value={formData.labInstruction}
                    onChange={handleChange}
                    className="mb-2 p-2 w-full border rounded"
                />
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        className="text-white bg-green-500 hover:bg-green-600 px-9 py-2 rounded"
                    >
                        Save
                    </button>
                    <button
                        type="button"
                        className="text-white bg-blue-500 hover:bg-blue-600 px-9 py-2 rounded ml-2"
                        onClick={handleCloseModal}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LensConsultationModal;
