import React, { useEffect, useState } from 'react'
import './MeinWorksSection.css'

import MyWorkCard from "../../UI/MyWorkCard/MyWorkCard";
import Title from "../../UI/title/Title";
import Pagination from "../../UI/Pagination/Pagination";
import ConfirmDeleteModal from "../../UI/ConfirmDeleteModal/ConfirmDeleteModal";
import axios from 'axios'
import {useSelector} from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';
import { CREATE_EXHIBITION } from '../../../constants';
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
            setAction('http://localhost:8080/exhibitions/my')
        } else if(location.pathname.toLowerCase().includes('auctions')) {
            setAction('http://localhost:8080/auctions/my')
        } else {
            setAction('http://localhost:8080/artworks/my')
        }
    }
    const myWorkGet = async () => {
        try {
            const response = await axios.get(action, {
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
        try {
            const response = await axios.get(`http://localhost:8080/exhibitions/${item.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate(CREATE_EXHIBITION, {state: {item: response.data, theme: item.theme}})
            //console.log("edit", item);
        } catch(error) {
            console.log(error)
        }
    };

    const handleDeleteClick = (item) => {
        navigate(CREATE_EXHIBITION, {state: {item}})
        //setSelectedId(id);
        //setIsModalOpen(true);
    };
    const handleDate = async (data, id) => {
        data['exhibitionId'] = id
        console.log(data)
        try {
            const response = await axios.post('http://localhost:8080/auctions', data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
        } catch(error) {
            console.log(error)
        }
    }
    const confirmDelete = () => {
        console.log("delete", selectedId);

        setIsModalOpen(false);
        setSelectedId(null);
    };
    useEffect(() => {
        console.log(action)
        getAction()
        myWorkGet()
    }, [action])
    return (
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
    );
};

export default MeinWorksSection;