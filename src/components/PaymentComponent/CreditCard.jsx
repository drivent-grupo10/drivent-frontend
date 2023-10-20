import styled from 'styled-components';
import { useState } from 'react';
import Chip from '../../assets/images/chip.png';
import usePayment from '../../hooks/api/usePayment';
import { toast } from 'react-toastify';

export default function CreditCard({ ticketId }) {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [validThru, setValidThru] = useState('');
  const [CVV, setCVV] = useState('');

  const { loadingProcessPayment, paymentProcess } = usePayment();

  const handleCardNumber = (e) => {
    const valuesOfInput = e.target.value.replaceAll(" ", "");
    const regex = /^[0-9\b]+$/;

    if (!regex.test(valuesOfInput) && e.target.value !== '') {
      return;
    }

    if (e.target.value.length > 14) {
      setCardNumber(valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4"));
    } else if (e.target.value.length > 9) {
      setCardNumber(valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3"));
    } else if (e.target.value.length > 4) {
      setCardNumber(valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2"));
    } else {
      setCardNumber(valuesOfInput);
    }
  }

  const handleName = (e) => {
    setName(e.target.value.toUpperCase());
  }

  const handleValidThru = (e) => {
    const valuesOfInput = e.target.value.replace("/", "");
    const regex = /^[0-9\b]+$/;

    if (!regex.test(valuesOfInput) && e.target.value !== '') {
      return;
    }

    if (e.target.value.length > 2) {
      setValidThru(valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2"));
    } else {
      setValidThru(valuesOfInput);
    }
  }

  const handleCVV = (e) => {
    const regex = /^[0-9\b]+$/;

    if (!regex.test(e.target.value) && e.target.value !== '') {
      return;
    }

    setCVV(e.target.value);
  }


  async function finishPayment(e) {
    e.preventDefault();

    try {
      const body = {
        ticketId: ticketId,
        cardData: {
          issuer: 'Mastercard',
          number: cardNumber.replaceAll(" ", ""),
          name: name,
          expirationDate: validThru,
          cvv: CVV
        }
      };
      const test = await paymentProcess(body);
      console.log(test)
      toast('Pagamento realizado com sucesso!');
      navigate('/dashboard/hotel');
    } catch (err) {
      toast('Não foi possível fazer o pagamento! ' + err);
    }
   
  }

  return <>
    <TopContainer>
      <Card>
        <img src={Chip} width={40} />
        <CardNumber>
          {!cardNumber ? `
            \u25CF\u25CF\u25CF\u25CF 
            \u25CF\u25CF\u25CF\u25CF 
            \u25CF\u25CF\u25CF\u25CF 
            \u25CF\u25CF\u25CF\u25CF`
            : cardNumber}
        </CardNumber>
        <br />
        <Name>{!name ? 'YOUR NAME HERE' : name}</Name>
        <ValidText>valid thru</ValidText>
        <ValidThru>
          {!validThru ? `
            \u25CF\u25CF/\u25CF\u25CF`
            : validThru}
        </ValidThru>
      </Card>
      <Form onSubmit={finishPayment}>
        <CardNumberInput
          placeholder='Card Number'
          value={cardNumber}
          type='text'
          maxlength='19'
          required
          onChange={handleCardNumber}
        />
        <p>E.g: 49..., 51..., 36..., 37...</p>
        <NameInput
          placeholder='Name'
          value={name}
          type='text'
          maxlength='19'
          required
          onChange={handleName}
        />
        <br />
        <ContainerFormBottom>
          <ValidThruInput
            placeholder='Valid Thru'
            value={validThru}
            type='text'
            maxlength='5'
            required
            onChange={handleValidThru}
          />
          <CVVInput
            placeholder='CVV'
            value={CVV}
            type='text'
            maxlength='3'
            required
            onChange={handleCVV}
          />
        </ContainerFormBottom>
        <Button type='submit'>FINALIZAR PAGAMENTO</Button>
      </Form>
    </TopContainer>
  </>
}

const TopContainer = styled.div`
  //font-family: ""; TO DO: Add Roboto
  display: flex;
  margin-top: 15px;
  margin-bottom: 35px;
  gap: 20px;
`

const Card = styled.div`
  position: relative;
  padding: 20px;
  width: 290px;
  height: 170px;
  background-color: #929292;
  border-radius: 15px;
  font-family: 'Roboto';
  line-height: 20px;

  a {
    color: #b8b8b8;
  }
`;

const CardNumber = styled.p`
  color: #FFFFFF;
  font-size: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
`;

const Name = styled.a`
  font-size: 14px;
`;

const ValidText = styled.a`
  position: absolute;
  right: 20px;
  top: 105px;
  font-size: 11px;
`;

const ValidThru = styled.a`
  position: absolute;
  margin-top: 2px;
  right: 20px;
  color: #b8b8b8;
  font-size: 14px;
`;

const Form = styled.form`
  position: relative;
  input {
    border-radius: 5px;
    height: 45px;
    border: 1px solid #b8b8b8;
    padding: 5px;
    font-size: 14px;
  }
  p {
    line-height: 20px;
    font-size: 11px;
  }
`

const CardNumberInput = styled.input`
  width: 290px;
`;

const NameInput = styled.input`
  width: 290px;
`;

const ContainerFormBottom = styled.div`
  display: flex;
  margin-top: 15px;
  gap: 20px;
`

const ValidThruInput = styled.input`
  width: 180px;
`;

const CVVInput = styled.input`
  width: 90px;
`;

const Button = styled.button`
  position: absolute;
  margin-top: 30px;
  left: -310px;
  width: 182px;
  height: 37px;
  border-radius: 4px;
  border: none;
`