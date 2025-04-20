import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { CustomLoader } from '../../CustomLoader'

export const ViewMyQueries = () => {
    const [queries, setQueries] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getAllMyQueries = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`/queriesByUserId/${localStorage.getItem("id")}`)
            setQueries(res.data.data)
        } catch (error) {
            console.error("Error fetching queries:", error)
            toast.error("Failed to fetch Queries!", { theme: "dark" })
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllMyQueries()
    }, [])

    // Handle Delete Query
    const handleDelete = async (queryId) => {
        if (!window.confirm("Are you sure you want to delete this Query?")) return;

        try {
            await axios.delete(`/query/${queryId}`)
            toast.success("Query deleted successfully!", { theme: "dark" })
            
            // Remove the deleted appointment from UI
            setQueries(queries.filter(query => query._id !== queryId))
        } catch (error) {
            console.error("Delete failed:", error)
            toast.error("Failed to delete Query!", { theme: "dark" })
        }
    }

    return (
        <div style={{ textAlign: "center" }}>
            <ToastContainer position="top-center" autoClose={5000} theme="dark" />
            {isLoading && <CustomLoader />}<br />
            <h2>MY Queries</h2>
            <table className='table table-dark'>
                <thead>
                    <tr>
                        <th>Query Date</th>
                        <th>Query Text</th>
                        <th>Response</th>
                        <th>Status</th>
                        <th>isPublic</th>
                        <th>Priority</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {queries?.map((query) => (
                        <tr key={query._id}>
                            <td>{new Date(query.createdAt).toLocaleDateString()}</td>
                            <td>{query.queryText}</td>
                            <td>{query.response || "N/A"}</td>
                            <td>{query.status}</td>
                            <td><span>{query.isPublic == true? "Yes" : "No"}</span></td>
                            <td>{query.priority}</td>
                            <td>
                                
                                {/* DELETE Button - Always Visible */}
                                <button 
                                    className="btn btn-danger ms-2" 
                                    onClick={() => handleDelete(query._id)}
                                >
                                    DELETE
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}