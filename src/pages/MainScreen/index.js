import React from 'react';

import './styles.css'

const MainScreen = () => {
  return (
    <div className='containerMainScreen'>
      <div className='headerMainScreen'>
          <h1>Veja os temas e ementas das proposições dos deputados</h1>
      </div>

      <div style={
          {
            display: 'flex', flexDirection: 'column',
            backgroundColor: '#fff', minWidth: '80%',
            padding: '10px 20px', borderRadius: '10px',
            marginTop: '20px'
          }
        }>
          <h2>Quais temas recebem mais atenção dos deputados federais?</h2>
          <h2>O deputado no qual votei está ligado a proposições com quais temas?</h2>
          <h2 style={{marginTop: '20px'}}>
            <strong>A aplicação Prometeu: Panorama dos Deputados e Proposições te mostra a resposta.</strong>
          </h2>
      </div>

      <div style={
          {
            display: 'flex', flexDirection: 'column',
            backgroundColor: '#fff', width: '90%',
            marginTop: '40px', padding: '20px 20px'
          }
        }>
          <h3 style={{marginTop: '20px'}}>Atualmente estão disponíveis nesta ferramenta 3 funcionalidades:</h3>
          <div style={{display: 'flex', textAlign: 'left', flexDirection: 'column', border: '1px solid', borderRadius: '10px'}}>
            <h4 style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
              <strong>Temas das Proposições:</strong> observe a quantidade de proposições por temática e note
              quais os temas recebem mais ou menos atenção.
            </h4>
            <h4 style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
              <strong>Deputados por tema da proposição:</strong> veja a quantidade de proposições por tema que cada deputado consta 
              como autor.
            </h4>
            <h4 style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
              <strong>Ementas:</strong> veja as ementas das proposições dos deputados eleitos. Busque as ementas por um termo de sua escolha 
              e veja quantas proposições existem relacionadas ao trecho de busca e quais as suas ementas.
            </h4>
          </div>
          <h3 style={{marginTop: '70px'}}>Funcionalidades futuras:</h3>
          <div style={{display: 'flex', textAlign: 'left', flexDirection: 'column', border: '1px solid', borderRadius: '10px'}}>
            <h4 style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
              <strong>Agrupamento de Deputados:</strong> com o uso de aprendizado de máquina, mais especificamente com modelos de agrupamento, 
              esta funcionalidade propõe exibir a forma como os deputados estão divididos e/ou unidos. O modelo 
              irá definir o agrupamento com base em características dos deputados, por exemplo o voto dele, a quantidade de proposições 
              de sua autoria ligados a determinado tema, entre outras características.
            </h4>
            <h4 style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
              <strong>Interesses dos Deputados:</strong> a ideia dessa funcionalidade é extrair as palavras chaves das ementas 
              das proposições de cada deputado e a partir delas gerar nuvens de palavras para exibir quais os principais termos 
              de suas proposições. Através da extração dessas palavras chaves também se torna possível que o cidadão selecione 
              termos chaves que são de seu interesse e com base nos termos escolhidos sejam apresentados os deputados que possuam 
              os mesmos termos ligados as ementas de suas proposições.
            </h4>
          </div>
        </div>

        <div style={
          {
            display: 'flex', flexDirection: 'column',
            backgroundColor: '#fff', minWidth: '40%',
            marginTop: '40px', padding: '20px 20px'
          }
        }>
          <h2 style={{marginTop: '20px'}}><strong>Fontes dos dados:</strong></h2>
          <div style={{display: 'flex', textAlign: 'left', flexDirection: 'column', border: '1px solid', borderRadius: '10px'}}>
            <h3 style={{marginTop: '20px', marginLeft: '20px', marginRight: '20px'}}>
              Dados Abertos da Câmara dos Deputados
            </h3>
            <h4 style={{marginLeft: '20px', marginRight: '20px'}}>https://dadosabertos.camara.leg.br/</h4>
          </div>
        </div>
    </div>
  )
}

export default MainScreen