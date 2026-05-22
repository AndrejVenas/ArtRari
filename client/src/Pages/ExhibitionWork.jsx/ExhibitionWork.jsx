import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AUCTIONS, EXHIBITIONS } from '../../constants';
import api from '../../api/axiosInstance';
import ItemsGrid from '../../Components/ItemsGrid/ItemsGrid';
import AuctionCard from '../../Components/AuctionCard/AuctionCard';
import ExhibitionCard from '../../Components/ExhibitionCard/ExhibitionCard';

const filtersConfig = [
    {
        name: "checkbox",
        label: "Теги",
        type: "checkbox",
        options: [],
    },
    {
        name: "search",
        label: "Пошук",
        type: "search",
    }
];

const ExhibitionWork = () => {
    const [result, setResult] = useState({})
    const [exhibition, setExhibition] = useState({})
    const {title, id} = useParams()

    const getExhibition = async (id, page, tags) => {
        const response = await api.get(`/exhibitions/${id}?page=${page}&tags=${tags}`)
        //response.data.lotPreviews.map(item => item['startDate'] = response.data.startDate)
        //filtersConfig[0]['options'] = response.data.lotPreviews[0]?.tags
        setExhibition(response.data)
    }

    useEffect(() => {
        if(Object.keys(result).length == 0) {
            getExhibition(id, 0, "")
        } else {
            getExhibition(id, 0, result['checkbox'].map(item => item.name).join(","))
        }
        console.log(filtersConfig)
    }, [id, result])
    const navigate = useNavigate()
  return (
        <ItemsGrid
            title={`Виставка ${title}`}
            items={exhibition?.artworks}
            filters={filtersConfig}
            setResult={setResult}
            result={result}
            renderCard={(item, index) => (
                <ExhibitionCard key={index} item={item} onClick={() => navigate(EXHIBITIONS + '/' + title + '/' + id + '/work' + '/' + item.id)}/>
            )}
        />
  )
}

export default ExhibitionWork