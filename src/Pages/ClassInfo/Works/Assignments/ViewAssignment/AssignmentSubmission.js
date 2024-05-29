import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AssignmentSubmission = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [url, setUrl] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('token', '16f220d0decf01a3ba26ee30d54ce893');

        fetch('https://api.upfiles.com/upload',
            {
                method: 'POST',
                body: formData,
            })
            .then(res => res.json())
            .then(result => {
                if (result.status === 'success') {
                    toast.success("Submission Success");
                    setUrl(result.url);
                    setMessage('');
                } else {
                    setMessage(result.message);
                    setUrl('');
                }
            })
            .catch(err => {
                setMessage('An error occurred', err);
                setUrl('');
            })

    };
    return (
        <div className="my-5">
            <h1 className="text-3xl font-bold">Note</h1>
            <p className="text-xl text-justify"><span className="font-bold text-red-600">Read It Carefully -</span>
                <br />
                1. Document Name must contain Student Name, Id and Subject.    
                <span className="font-bold"> Example : Md_Minhajur_Rahman_193_16_477_OOP</span>
                <br />
                2. Complete Your Submission on before deadline. No excuse after deadline.
                <br />
                3. Accepted file format Doc, Docx and PDF only.
            </p>

            <div className="flex flex-col">
                {!url &&
                    <>
                        <input className="file-input file-input-bordered file-input-lg w-full max-w-xs my-5"
                        accept=".pdf, .docx" 
                        type="file" 
                        onChange={handleFileChange} />
                        {message && <p>{message}</p>}

                        <button className="btn btn-neutral w-full max-w-xs" onClick={handleUpload}>Upload</button>
                    </>
                }

                {url && <p>File URL: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>}
            </div>
        </div>
    );
};

export default AssignmentSubmission;