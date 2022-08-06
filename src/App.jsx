import Card from "./components/Card"
import { HeaderApp, ContentCards } from "./style/App"
import { GlobalStyle } from "./style/GlobalStyle"
import { ArrowCircleUp, ArrowCircleDown, Money } from "phosphor-react";
import ButtonModal from "./components/ButtonModal";
import LogoApp from '../src/assets/logo-2.png';
import TableProducts from "./components/TableProducts";
import Container from "@mui/material/Container";
import { useContext, useEffect, useState } from "react";
import { ItemsContexts } from "./contexts/Items";

export default function App() {

  const { lists } = useContext(ItemsContexts);

  let ListProductsInputs = [];
  let ListProductsOutputs = [];

  const [valueTotalInput, setValueTotalInput] = useState(0);
  const [valueTotalOutput, setValueTotalOutput] = useState(0);

  for (let x in lists) {
    if (lists[x].typeProduct == 'entrada') {
      ListProductsInputs.push(lists[x].valueProduct);
    } else {
      ListProductsOutputs.push(lists[x].valueProduct);
    }
  }

  useEffect(() => {
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

  return (
    <div className="App">
      <GlobalStyle />

      <HeaderApp>
        <Container maxWidth='xl'>
          <div>
            <img src={LogoApp} alt="" />
            <h1>ReFinance</h1>
          </div>
          <div>
            <ButtonModal title_button="Nova Transação" />
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
            bgColor="#7b1fa2"
            colorCard="#f1f1f1"
          />
        </ContentCards>

        <TableProducts />
      </Container>
    </div>
  )
}


