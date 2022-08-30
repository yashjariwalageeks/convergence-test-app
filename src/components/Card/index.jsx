import React from 'react'
import './card.css'

const cardColors = [
    {
        background: "#009db8"
    },
    {
        background: "#cf6679"
    },
    {
        background: "#bb86fc"
    },
    {
        background: "#f0872f"
    },
    {
        background: "#00ac82"
    },

]

const CustomCard = ({name, position, info, description, image,index}) => {
    const cardBgColor = cardColors[index]
    return (
        <article className="card" style={cardBgColor}>
            <div className="card-profile-wrapper">
                <div>
                    <img src={image} alt="daniel clifford"/>
                </div>
                <div>
                    <h2 className="name">{name}</h2>
                    <p className="position">{position}</p>
                </div>
            </div>
            <p>
                {info}
            </p>
            <p>
                {description}
            </p>
        </article>
    )
}

export default CustomCard;