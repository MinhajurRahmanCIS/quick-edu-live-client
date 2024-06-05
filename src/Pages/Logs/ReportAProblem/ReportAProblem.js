import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const ReportAProblem = () => {
    const { user } = useContext(AuthContext);
    const handelReport = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const title = form.title.value;
        const message = form.message.value;
        const report = {
            name,
            email,
            title,
            message
        }
        fetch("http://localhost:5000/report", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
            },
            body: JSON.stringify(report)
        })
            .then(res => res.json())
            .then(data => {
                if (data.data.insertedId) {
                    toast.success("Your Issue Will be fixing soon!")
                    form.reset();
                }
                else{
                    toast.error("Something went wrong. Try Again")
                }
            })
    };
    return (
        <div>
            <h1 className="text-3xl text-center font-bold mt-5">Report A Problem</h1>
            <form onSubmit={handelReport} className="card-body">
                <label className="input input-bordered flex items-center gap-2">
                    <strong>Name : </strong>
                    <input
                        type="text"
                        className="grow"
                        defaultValue={user?.displayName}
                        disabled
                        name="name"
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <strong>Email : </strong>
                    <input
                        type="text"
                        className="grow"
                        placeholder=""
                        defaultValue={user?.email}
                        disabled
                        name="email"
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2">
                    <strong>Title : </strong>
                    <input
                        type="text"
                        className="grow"
                        placeholder="Enter The Issue"
                        required
                        name="title"
                    />
                </label>
                <label className="textarea textarea-bordered">
                    <strong>Message : </strong>
                    <textarea
                        placeholder="Tell Us More About Issue"
                        className="textarea textarea-lg w-full mt-1"
                        required
                        name="message"
                    ></textarea>
                </label>

                {/* <input type="file" className="file-input file-input-bordered file-input-md w-full md:w-1/3" /> */}

                <input className="btn btn-neutral text-xl my-2" type="submit" value="Report" />
            </form>
        </div>
    );
};

export default ReportAProblem;