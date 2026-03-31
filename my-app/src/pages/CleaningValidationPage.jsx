import {  useState } from 'react';
import ImageUploadBox from '../component/cleaningValidation/ImageUploadBox';
import ImagePreview from '../component/cleaningValidation/ImagePreview';
import ValidateButton from '../component/cleaningValidation/ValidationButton';
import CompareResult from '../component/cleaningValidation/CompareResult'; 
import useGeminiValidation from '../hooks/useGeminiValidation';

const CleaningValidationPage = () => {
    const [beforeImage,setBeforeImage]=useState(null);
    const [afterImage,setAfterImage]=useState(null);
    const {loading,result,validate}=useGeminiValidation();
    const handleSubmit=async()=>{
        if(!beforeImage || !afterImage){
            alert("please upload both image");
            return;
        }
        validate(beforeImage,afterImage);
        console.log(loading);
    };
    return (
        <div>
            <ImageUploadBox label="BeforeImage" onChange={(e) => setBeforeImage(e.target.files[0])} />
            <ImagePreview file={beforeImage} /> 

            <ImageUploadBox label="AfterImage" onChange={(e) => setAfterImage(e.target.files[0])} />
            <ImagePreview file={afterImage} />

            <ValidateButton onClick={handleSubmit} loading={loading} /> 
            <CompareResult result={result} /> 
        </div>
    );
};

export default CleaningValidationPage;