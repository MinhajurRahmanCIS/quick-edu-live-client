import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import useTeacher from '../../../hooks/useTeacher';
import Loading from '../../Shared/Loading/Loading';
import Swal from 'sweetalert2';

const PeopleList = ({ people, i, refetch, isTeacher }) => {
    const { image, name, email } = people;

    const handelDeletePeople = email => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this Student!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove Student"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/enrollmentPeople/${email}`, {
                    method: "DELETE",
                    headers: {
                        authorization: `bearer ${localStorage.getItem("quickEdu-token")}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            refetch();
                            Swal.fire({
                                title: "Student Removed!",
                                text: "Your Student has been Removed.",
                                icon: "success"
                            });
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong! Please Try Again"
                            });
                        }
                    })
            };
        });
    };

    return (
        <tr className="hover">
            <th>
                {i + 1}
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt='' />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                    </div>
                </div>
            </td>
            <td>
                {email}
            </td>
            <td>
                {
                    isTeacher &&
                    <button onClick={() => handelDeletePeople(email)} className="btn btn-error">Remove</button>
                }
            </td>
        </tr>
    );
};

export default PeopleList;