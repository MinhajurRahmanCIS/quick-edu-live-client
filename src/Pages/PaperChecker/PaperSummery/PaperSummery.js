import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import { IoArrowUndoOutline } from 'react-icons/io5';

const PaperSummery = () => {
    const { id } = useParams();
    const { data: paperChecking = [], isLoading } = useQuery({
        queryKey: ["PaperChecking", id],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/check/${id}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                }
            });
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    };

    return (
        <div className="p-5">
            <Link to={-1} className="btn btn-neutral rounded-none hover:bg-slate-500 text-xl mb-2"> <IoArrowUndoOutline></IoArrowUndoOutline> Go Back</Link>
            <p className="text-2xl">Result</p>
            {
                paperChecking
                &&
                paperChecking.data.question?.map((pc, i) =>

                    <div className="p-5" key={i}>
                        <h1 className="text-xl">{pc.question} <span className="text-xl"><strong>Total Marks: </strong>{pc.totalMarks}</span></h1>
                        <div className="p-2">
                            <p className="text-xl"><strong>Marks: </strong>{pc.marksGet}</p>
                            {
                                pc.marksGet > 2 ?
                                    <div>
                                        <span className="me-3 font-semibold">{pc.marksGet}</span>
                                        <progress className="progress progress-success w-1/2" value={pc.marksGet} max={pc.totalMarks}></progress>
                                        <span className="ms-3 font-semibold">out of {pc.totalMarks}</span>
                                    </div>
                                    :
                                    <div>
                                        <span className="me-3 font-semibold"> {pc.marksGet}</span>
                                        <progress className="progress progress-error w-1/2" value={pc.marksGet} max={pc.totalMarks}></progress>
                                        <span className="ms-3 font-semibold">out of {pc.totalMarks}</span>
                                    </div>
                            }

                        </div>
                    </div>)
            }
        </div>
    );
};

export default PaperSummery;