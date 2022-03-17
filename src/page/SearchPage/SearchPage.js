import React, { useContext, useState } from "react"

import GlobalStateContext from '../../global/GlobalStateContext';

import { useNavigate } from 'react-router-dom';
import { Card, Container, ContainerList, IconSearch, Img, Input, Li, Title, Ul } from "./styled";
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import img from "../../images/Whopper_Hero.png";
import { GoSearch } from 'react-icons/go'



export default function Search({ isSearch }) {

  const navigate = useNavigate()
  const { states } = useContext(GlobalStateContext)
  const [inputValue, setValue] = useState("")

  const onChangeValue = (event) => {
    setValue(event.target.value)
  }

  return (
    <>
      <Container>
        <div style={{ width: "100%" }}>
          <MdOutlineArrowBackIosNew onClick={() => { navigate(-1) }} style={{ float: 'left', marginLeft: "15px", }} />
          <Title>Busca</Title>
        </div>
        <div style={{
          border: 0,
          borderBottom: '1px solid #6c6c6c',
          opacity: '25%',
          width: '100%',
          padding: 4
        }} />

        <div style={{
          position: 'relative',
          width: '90%',
          height: "56px",
          marginTop: "8px",
          borderRadius: "2px"
        }}>
          <Input style={{ position: 'relative', }} onChange={onChangeValue} placeholder="Restaurante" />
          <IconSearch >
            < GoSearch />
          </IconSearch>
        </div>
        {states.restaurants && states.restaurants.filter(restaurantes => {
          if (isSearch)
            if (!inputValue) {
              return false
            }
          return restaurantes.name.toLowerCase().includes(inputValue.toLowerCase())

        })
          .map((restaurant) => (
            <>
              {states.restaurants.length > 0? 
              <Ul>
                <Card>
                  <Li>
                    <Img src={restaurant.logoUrl} alt={restaurant.name} />
                  </Li>
                  <div
                    style={{
                      width: "100%",
                    }}>
                    <div>
                      <Li style={{ color: "#57B16A", marginLeft: "-6%" }}>{restaurant.name}</Li>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        color: "#000000",
                        opacity: "25%",
                        
                      }}>
                      <Li>{restaurant.deliveryTime}min</Li>
                      <Li>Frete: R${restaurant.shipping.toFixed(2)}</Li>
                    </div>
                  </div>
                </Card>
              </Ul>
              : (<p>digite</p>)
              }
            </>
          ))}


      </Container>

    </>
  )

}