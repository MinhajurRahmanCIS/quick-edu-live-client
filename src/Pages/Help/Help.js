import React from 'react';

const Help = () => {
    return (
        <div className="overflow-x-auto p-10">
            <table className="table border border-black">
                <thead>
                    <tr className="text-center text-xl border border-black">
                        <th className="border-e border-black">Icon</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black">Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                    </tr>
                    <tr className="hover text-center border-b border-black font-semibold">
                        <td className="border-e border-black">Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                    </tr>
                    <tr className="hover text-center font-semibold">
                        <td className="border-e border-black ">Brice Swyre</td>
                        <td>Tax Accountant</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Help;