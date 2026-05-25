import React, { useActionState, useEffect, useState } from 'react'
import './MeinWorksSection.css'

import MyWorkCard from "../../UI/MyWorkCard/MyWorkCard";
import Title from "../../UI/title/Title";
import Pagination from "../../UI/Pagination/Pagination";
import ConfirmDeleteModal from "../../UI/ConfirmDeleteModal/ConfirmDeleteModal";
import api from '../../../api/axiosInstance'
import {useSelector} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_EXHIBITION, EDIT_EXHIBITION, EDIT_WORK, WORK_UPLOAD } from '../../../constants';
import Message from '../../UI/Message/Message';
const worksMock = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    title: "Тиша, що пам’ятає світло",
    image: "/images/exhibition.png",
}));

const MeinWorksSection = () => {
    const [page, setPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedId, setSelectedId] = useState(null);
    const [myWork, setMyWork] = useState({})
    const {token} = useSelector(state => state.Auth)
    const [action, setAction] = useState('')
    const [deleteWork, setDeleteWork] = useState(0)
    const [flag, setFlag] = useState(false)
    const [message, setMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const [data, setData] = useState({
        exhibitionId: 0,
        startDate: "",
        endDate: "",
        step: 0
    })
    const getAction = () => {
        if(location.pathname.toLowerCase().includes('exhibitions')) {
            setAction('/exhibitions/my')
        } else if(location.pathname.toLowerCase().includes('auctions')) {
            setAction('/auctions/my')
        } else {
            setAction('/artworks/my')
        }
    }
    const myWorkGet = async () => {
        try {
            const response = await api.get(action, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setMyWork(response.data)
        } catch(error) {
            console.log(error)
        }
    }
    const handleEdit = async (item) => {
        if(action.includes('artworks')) {
        try {
            const response = await api.get(`/artworks/my/${item.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate(EDIT_WORK, {state: {item: response.data}})
            //console.log("edit", item);
        } catch(error) {
            console.log(error)
        }
        } else if(action.includes('exhibitions')) {
            try {
            const response = await api.get(`/exhibitions/my/${item.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate(EDIT_EXHIBITION, {state: {item: response.data, theme: item.theme}})
            //console.log("edit", item);
        } catch(error) {
            console.log(error)
        }
        }
    };

    const handleDeleteClick = (item) => {
        //navigate(CREATE_EXHIBITION, {state: {item}})
        //setSelectedId(id);
        setIsModalOpen(true);
        setDeleteWork(item)
    };
    const handleDate = async (data, id) => {
        data['exhibitionId'] = id
        console.log(data)
        try {
            const response = await api.post('/auctions', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }
    const confirmDelete = async () => {
        console.log("delete", selectedId);
        
        setIsModalOpen(false);
        try {
            const response = await api.delete(window.location.pathname.includes('Exhibitions') ? `/exhibitions/${deleteWork}` : `/artworks/${deleteWork}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setTimeout(() => {
                window.location.reload()
            }, 3000)
            setMessage('Ваша робота успішно видалена.')
            setFlag(true)
        } catch(error) {
            const message = error.response.data.message
            console.log(message)
            setMessage(message)
            setFlag(true)
        }
    };
    useEffect(() => {
        console.log(action)
        getAction()
        myWorkGet()
    }, [action])
    return (
        <>
        <section className="mein-works">
            <div className="container">

                <Title title={"Перегляд своїх робот"} />

                <div className="mein-works__grid">
                    {myWork.items?.length == 0 ? <p>Поки у вас немає своїх робот</p> : myWork.items?.map((item) => (
                        <MyWorkCard
                            key={item.id}
                            item={item}
                            onEdit={handleEdit}
                            onDelete={handleDeleteClick}
                            onDate={handleDate}
                            location={location}
                        />
                    ))}
                </div>

                {myWork.items?.length > 0 && <div className="mein-works__pagination">
                    <Pagination
                        currentPage={page}
                        onChange={setPage}
                        totalPages={2}
                    />
                </div>
                }

            </div>

            <ConfirmDeleteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </section>
        <Message flag={flag} setFlag={setFlag} message={message} />
        </>
    );
};

export default MeinWorksSection;