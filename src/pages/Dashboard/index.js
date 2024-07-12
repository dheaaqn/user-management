import React, { useEffect, useState } from "react";
import './style.css';
import * as constant from './constant/constant';
import ReactModal from "react-modal";

const Dashboard = () => {
    const [datas, setDatas] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [dataDetail, setDataDetail] = useState(constant.defaultDetail);

    const callApiGetUsers = () => {
        fetch('https://fakestoreapi.com/users')
            .then((response) => response.json())
            .then((response) => setDatas(response))
            .catch((error) => window.alert(error))
    }

    const onClickShowDetail = (id) => {
        fetch(`https://fakestoreapi.com/users/${id}`)
            .then((response) => response.json())
            .then((response) => {
                setDataDetail(response)
                setShowDetail(true)
            })
            .catch((error) => window.alert(error))
    }

    const onClickCloseDetail = () => {
        setShowDetail(false)
        setDataDetail(constant.defaultDetail)
    }

    const onClickDeleteUser = (id) => {
        fetch(`https://fakestoreapi.com/users/${id}`,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then(response => {
            const data = datas.filter((x) => x.id !== id)
            setDatas(data)
        })
        .catch((error) => window.alert(error))
    }

    const onClickShowEdit = (id) => {
        fetch(`https://fakestoreapi.com/users/${id}`)
        .then((response) => response.json())
        .then((response) => {
            setDataDetail(response)
            setShowEdit(true)
        })
        .catch((error) => window.alert(error))
    }

    const onClickCloseEdit = () => {
        setShowEdit(false)
        setDataDetail(constant.defaultDetail)
    }

    useEffect(() => {
        callApiGetUsers()
    }, [])

    return (
        <>
        <div className="container">
            <h1 className="title">List User</h1>
            <div className="content">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {constant.tableHead.map((item, index) => (
                                <th key={index} className="border-b border-blue-gray-100 p-4">
                                    <h3 key={index}>{item}</h3>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((item) => (
                            <tr key={item.id} className="even:bg-blue-gray-50/50">
                                <td className="p-4">
                                    <p>{item.id}</p>
                                </td>
                                <td className="p-4">
                                    <p>{item.username}</p>
                                </td>
                                <td className="p-4">
                                    <p>{item.email}</p>
                                </td>
                                <td className="p-4">
                                    <input className={'buttonModal'} type="button" onClick={() => onClickShowDetail(item.id)} value={"Show Detail"}/>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <input className={'buttonModal'} type="button" onClick={() => onClickShowEdit(item.id)} value={"Edit"}/>
                                    &nbsp;&nbsp;|&nbsp;&nbsp;
                                    <input className={'buttonModal'} type="button" onClick={() => onClickDeleteUser(item.id)} value={"Delete"}/>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ReactModal contentLabel="Detail User" isOpen={showDetail} className="modal_content">
                <p className="modal_body">ID: {dataDetail.id}</p>
                <p className="modal_body">Email: {dataDetail.email}</p>
                <p className="modal_body">Username: {dataDetail.username}</p>
                <p className="modal_body">Password: {dataDetail.password}</p>
                <p className="modal_body">First Name: {dataDetail.name.firstname}</p>
                <p className="modal_body">Last Name: {dataDetail.name.lastname}</p>
                <p className="modal_body">Address: {dataDetail.address.street}, {dataDetail.address.number}, {dataDetail.address.city}, {dataDetail.address.zipcode}</p>
                <p className="modal_body">Phone: {dataDetail.phone}</p>
                <button className="button_close" onClick={() => onClickCloseDetail()}>Close</button>
            </ReactModal>
            <ReactModal contentLabel="Edit User" isOpen={showEdit} className="modal_content">
                <p className="modal_body">ID: {dataDetail.id}</p>
                <p className="modal_body">Email: {dataDetail.email}</p>
                <p className="modal_body">Username: {dataDetail.username}</p>
                <p className="modal_body">Password: {dataDetail.password}</p>
                <p className="modal_body">First Name: {dataDetail.name.firstname}</p>
                <p className="modal_body">Last Name: {dataDetail.name.lastname}</p>
                <p className="modal_body">Address: {dataDetail.address.street}, {dataDetail.address.number}, {dataDetail.address.city}, {dataDetail.address.zipcode}</p>
                <p className="modal_body">Phone: {dataDetail.phone}</p>
                <button className="button_close" onClick={() => onClickCloseEdit()}>Close</button>
            </ReactModal>
        </div>
        </>
    )
}

export default Dashboard;