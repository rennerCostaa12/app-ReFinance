import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { HeaderApp, ContentCards } from "../style/ApplicationRoute"

import { ArrowCircleUp, ArrowCircleDown, Money } from "phosphor-react";

import Card from "../components/Card";
import TableProducts from "../components/TableProducts";

import LogoApp from '../assets/logo.png';

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { ItemsContexts } from "../contexts/Items";
import { UsersContext } from "../contexts/AuthContext";

import AOS from "aos";
import 'aos/dist/aos.css';

export default function ApplicationRoute() {

  const { lists } = useContext(ItemsContexts);
  const { logoutUser, authUser } = useContext(UsersContext);

  let ListProductsInputs = [];
  let ListProductsOutputs = [];

  const [valueTotalInput, setValueTotalInput] = useState(0);
  const [valueTotalOutput, setValueTotalOutput] = useState(0);

  useEffect(() => {
    const separateTypesValues = () => {
      lists.map((value) => {
        if (value.tipo === 'entrada') {
          ListProductsInputs.push(value.valor)
        } else {
          ListProductsOutputs.push(value.valor)
        }
      })
    }

    separateTypesValues();

    if (ListProductsInputs.length > 0) {
      const valueList = ListProductsInputs.reduce(function (PreviousValue, CurrentValue) {
        return PreviousValue + CurrentValue;
      })
      setValueTotalInput(valueList);
    } else {
      setValueTotalInput(0);
    }

    if (ListProductsOutputs.length > 0) {
      const valueList = ListProductsOutputs.reduce(function (PreviousValue, CurrentValue) {
        return PreviousValue + CurrentValue;
      })
      setValueTotalOutput(valueList);
    } else {
      setValueTotalOutput(0);
    }

  }, [lists])

  const LogoutUser = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    AOS.init({ duration: 1000 })
  }, []);

  return (
    <div>
      <HeaderApp>
        <Container>
          <div>
            <img src={authUser.photoURL} alt={authUser.displayName} />
            <h3>
              {authUser.displayName ? authUser.displayName : 'Carregando'}
            </h3>
          </div>
          <Button
            onClick={LogoutUser}
            sx={{ fontWeight: 'bold' }}
            variant="contained"
            color="secondary"
          >
            Logout
          </Button>
        </Container>
        <Container maxWidth='xl'>
          <div>
            <img src={LogoApp} alt="logo" />
            <h1>ReFinance</h1>
          </div>
          <div>
            <Link to="/financas/add">Nova Transação</Link>
          </div>
        </Container>
      </HeaderApp>
      <Container maxWidth='lg'>
        <ContentCards>
          <Card
            title_card="Entradas"
            icon_card={<ArrowCircleUp size={32} color="green" />}
            value_card={valueTotalInput.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            bgColor="#ffffff"
          />
          <Card
            title_card="Saídas"
            icon_card={<ArrowCircleDown size={32} color="red" />}
            value_card={valueTotalOutput.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            bgColor="#ffffff"
          />
          <Card
            title_card="Total"
            icon_card={<Money size={32} />}
            value_card={(valueTotalInput - valueTotalOutput).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
            bgColor="#CCF282"
            colorCard="#000"
          />
        </ContentCards>

        <TableProducts />
      </Container>
    </div>
  )
}