import React from 'react';
import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import './styles.css';

const AbstractScreen = ({ ementasProposicao }) => {
  const [items, setItems] = useState(Object.keys(ementasProposicao['ementas']));
  const [abstractForSearch, setAbstractForSearch] = useState('');
  const [otherAbstractForSearch, setOtherAbstractForSearch] = useState('');
  const [searched, setSearched] = useState(false);
  const [filterScreen, setFilterScreen] = useState(false);
  const [snippets, setSnippets] = useState([]);

  const handleChangeStateAbstractForSearch = (e) => {
    setAbstractForSearch(e.target.value);
  };

  const handleChangeStateOtherAbstractForSearch = (e) => {
    setOtherAbstractForSearch(e.target.value);
  };

  const searchAbstract = () => {
    const indexAbstractsFound = Object.keys(ementasProposicao['ementas']).filter((_, index) => {
      return ementasProposicao['ementas'][index].toLowerCase().includes(abstractForSearch.toLowerCase());
    });
    setItems(indexAbstractsFound);
    setSnippets([abstractForSearch]);
    setAbstractForSearch('');
    setSearched(true);
    setFilterScreen(false);
  };

  const addSearchAbstract = () => {
    const indexAbstractsFound = items.filter((i) => {
      return ementasProposicao['ementas'][i].toLowerCase().includes(otherAbstractForSearch.toLowerCase());
    });
    setItems(indexAbstractsFound);
    const newSnippets = [].concat(snippets);
    newSnippets.push(otherAbstractForSearch);
    setSnippets(newSnippets);
    setOtherAbstractForSearch('');
    setSearched(true);
    setFilterScreen(false);
  };

  const removeSnippet = (removeIndex) => {
    console.log(snippets[removeIndex])
    if (snippets.length === 1) {
      setSnippets([]);
      setSearched(false);
      setFilterScreen(false);

    } else if (snippets.length > 1) {
      const newSnippets = snippets.filter((_, index) => {
        return index !== removeIndex;
      });

      setSnippets(newSnippets);

      var indexAbstractsFound = Object.keys(ementasProposicao['ementas']).filter((_, index) => {
        return ementasProposicao['ementas'][index].toLowerCase().includes(newSnippets[0].toLowerCase());
      });
      
      for (var sni = 1; sni < newSnippets.length; ++sni) {
        indexAbstractsFound = indexAbstractsFound.filter((i) => {
          return ementasProposicao['ementas'][i].toLowerCase().includes(newSnippets[sni].toLowerCase());
        });
      }

      setItems(indexAbstractsFound);
      setFilterScreen(false);
    }
  };

  // console.log(snippets)
  return (
    <div className='containerAbstractScreen'>
      <div className='headerAbstractScreen'>
        <h1>Ementas</h1>
      </div>

      
      <div style={{
          width: "30%", backgroundColor: "#fff", padding: "10px 0px",
          marginBottom: "20px"
      }}>
        <Button
            variant={!filterScreen ? "outlined" : "contained"}
            onClick={() => {setFilterScreen(!filterScreen)}}
        >
          {!filterScreen ? "Abrir tela de busca" : "Voltar"}
        </Button>  
      </div>

      {filterScreen && (
        <div className='divFilterScreenAbstractScreen'>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
            <TextField
                id="outlined-basic"
                label="Trecho da Ementa"
                variant="outlined"
                value={abstractForSearch}
                onChange={handleChangeStateAbstractForSearch}
            />
            <Button
                variant="contained"
                onClick={searchAbstract}
                style={{marginLeft: '20px'}}
                disabled={abstractForSearch === '' ? true : false}
            >
              {!searched ? "Buscar" : "Realizar nova busca"}
            </Button>  
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '20px'}}>
            <TextField
                id="outlined-basic"
                label="Adicionar trecho na busca"
                variant="outlined"
                value={otherAbstractForSearch}
                onChange={handleChangeStateOtherAbstractForSearch}
            />
            <Button
                variant="contained"
                onClick={addSearchAbstract}
                style={{marginLeft: '20px'}}
                disabled={otherAbstractForSearch !== '' && searched ? false : true}
            >
                    Adicionar Busca
            </Button>  
          </div>
          <div className='divSnippetsAbstractScreen'>
            <h4>Trechos Buscados:</h4>
            {snippets.map((snippet, i) => (
                <div className='divSnippetAbstractScreen' key={i}>
                  <h5>{snippet}</h5>
                  <IconButton
                    aria-label="delete"
                    onClick={() => {removeSnippet(i)}}
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
            ))}
          </div>
        </div>
      )}

      {searched && !filterScreen && (
        <div>
          <div className="headerPropositionsListAbstractScreen">
              <h2 style={{display: 'flex', width: '20%', justifyContent: 'center', marginLeft: '2%'}}>
                ID da Proposição
              </h2>
              <h2 style={{display: 'flex', width: '80%', justifyContent: 'center'}}>
                Ementa da Proposição
              </h2>
          </div>
          <div className='divPropositionsAbstractScreen'>
            {items.map((i) => (
              <div className='divPropositionAbstractScreen' key={i}>
                <h4 style={{display: 'flex', width: '20%', justifyContent: 'center', alignItems:'center'}}>
                  {ementasProposicao['proposicoes'][i]}
                </h4>
                <h4 style={
                  {
                    display: 'flex', width: '80%', justifyContent: 'center', alignItems:'center',
                    textAlign: 'justify', marginLeft: '10%'
                  }
                }>
                  {ementasProposicao['ementas'][i]}
                </h4>
              </div>
            ))}

          </div>
        </div>
      )}

    </div>
  )
}

export default AbstractScreen