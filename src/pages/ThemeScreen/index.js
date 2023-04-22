import React from 'react';
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ReactPaginate from 'react-paginate';

import './styles.css';

import Ball from '../../components/Ball';

const ThemeScreen = ({ proposicaoPorTema }) => {
    // console.log(Object.keys(proposicaoPorTema));
    const themes = [];
    for (var k = 0; k < Object.keys(proposicaoPorTema).length; ++k) {
        if (k !== 0 && k !== 1) {
            themes.push(Object.keys(proposicaoPorTema)[k]);
        }
    };

    themes.sort();

    const [themeSelected, setThemeSelected] = useState(themes[0]);
    const [filterScreen, setFilterScreen] = useState(false);
    const [sortingAttribute, setSortingAttribute] = useState('name');
    const [sortingType, setSortingType] = useState(0);
    const [showNoProposition, setShowNoProposition] = useState(false);

    const [items, setItems] = useState(Object.keys(proposicaoPorTema['id']));
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const endOffset = itemOffset + itemsPerPage;
    const [currentItems, setCurrentItems] = useState(items.slice(itemOffset, endOffset));
    const [currentItemsCount, setCurrentItemsCount] = useState(items.length);
    const [pageCount, setPageCount] = useState(0);

    const [biggersName, setBiggerName] = useState([]);
    const [biggersCount, setBiggerCount] = useState([]);
    const [minorsName, setMinorsName] = useState([]);
    const [minorsCount, setMinorsCount] = useState([]);

    const [valueVisualization, setValueVisualization] = useState(0);
    const handleChangeValueVisualization = (event, newValueVisualization) => {
        setValueVisualization(newValueVisualization);
    };

    useEffect(() => {
        async function fetchData() {
            await setItemOffset(0);
            // Fetch items from another resources.
            const endOffset = itemOffset + itemsPerPage;
            // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
            // setCurrentItems(items.slice(itemOffset, endOffset));
            await handleChangeStateItems(endOffset);
            await setPageCount(Math.ceil(currentItemsCount / itemsPerPage));
            // console.log("effect 1")
        }
        fetchData();
    }, [itemsPerPage, themeSelected, sortingAttribute, sortingType, showNoProposition]);

    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + itemsPerPage;
        // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        // setCurrentItems(items.slice(itemOffset, endOffset));
        handleChangeStateItems(endOffset);
        setPageCount(Math.ceil(currentItemsCount / itemsPerPage));
        // console.log("effect 2")
    }, [itemOffset]);

    const handlePageClick = (event) => {
        const newOffset = event.selected * itemsPerPage % items.length;
        setItemOffset(newOffset);
    };

    const orders = ( a, b ) => {
        if ( a['value'] < b['value'] ){
            return -1;
        }
        if ( a['value'] > b['value'] ){
            return 1;
        }
        return 0;
    };

    const compare = ( a, b ) => {
        if (sortingType === 0) {
            if ( a[sortingAttribute] < b[sortingAttribute] ){
                return -1;
            }
            if ( a[sortingAttribute] > b[sortingAttribute] ){
                return 1;
            }

        } else {
            if ( a[sortingAttribute] > b[sortingAttribute] ){
                return -1;
            }
            if ( a[sortingAttribute] < b[sortingAttribute] ){
                return 1;
            }
        }
        return 0;
    };

    async function handleChangeStateItems(endOffset) {
        const array = [];
        for (var index = 0; index < Object.keys(proposicaoPorTema['id']).length; ++index) {
        if (showNoProposition) {
            array.push(
                {
                    id: proposicaoPorTema['id'][index],
                    name: proposicaoPorTema['nome'][index],
                    value: proposicaoPorTema[themeSelected][index].length,
                    index: index
                }
            );

        } else if (!showNoProposition && proposicaoPorTema[themeSelected][index].length > 0) {
            array.push(
                {
                    id: proposicaoPorTema['id'][index],
                    name: proposicaoPorTema['nome'][index],
                    value: proposicaoPorTema[themeSelected][index].length,
                    index: index
                }
            );
        }
        };

        array.sort( orders );
        const biggerName = [];
        const biggerCount = [];
        const minorsName = [];
        const minorsCount = [];
        array.slice(0, 5).map((n) => {
            minorsName.push(n['name']);
            minorsCount.push(n['value']);
        });

        array.slice(array.length - 5, array.length).map((n) => {
            biggerName.push(n['name']);
            biggerCount.push(n['value']);
        });
        setBiggerName(biggerName);
        setBiggerCount(biggerCount);
        setMinorsName(minorsName);
        setMinorsCount(minorsCount);
        
        array.sort( compare );
        setCurrentItemsCount(array.length);
        const newCurrentItems = [];
        array.map((element) => {newCurrentItems.push(element['index'])});
        setCurrentItems(newCurrentItems.slice(itemOffset, endOffset));
    };

    const arrayDeputiesThemes = [];
    // for (var index = 0; index < Object.keys(proposicaoPorTema['id']).length; ++index) {
    //     arrayDeputiesThemes.push(
    //         {
    //             id: proposicaoPorTema['id'][index],
    //             name: proposicaoPorTema['nome'][index],
    //             value: proposicaoPorTema[themeSelected][index].length
    //         }
    //     );
    // };
    currentItems.forEach((index) => {
        arrayDeputiesThemes.push(
            {
                id: proposicaoPorTema['id'][index],
                name: proposicaoPorTema['nome'][index],
                value: proposicaoPorTema[themeSelected][index].length
            }
        )
    });

    const handleChangeStateThemeSelected = (event) => {
        // setItemOffset(0);
        setThemeSelected(event.target.value);
    };

    const handleChangeStateSortingAttribute = (event) => {
        setSortingAttribute(event.target.value);
    };

    const handleChangeStateSortingType = (event) => {
        setSortingType(event.target.value);
    };

    const handleChangeStateNoProposition = (event) => {
        setShowNoProposition(event.target.value);
    };
      
    arrayDeputiesThemes.sort( compare );
    const deputiesIds = [];
    const deputiesNames = [];
    const count = [];

    for (var index = 0; index < arrayDeputiesThemes.length; ++index) {
        if (showNoProposition) {
            deputiesIds.push(arrayDeputiesThemes[index]['id']);
            deputiesNames.push(arrayDeputiesThemes[index]['name']);
            count.push(arrayDeputiesThemes[index]['value']);

        } else if (!showNoProposition && arrayDeputiesThemes[index]['value'] > 0) {
            deputiesIds.push(arrayDeputiesThemes[index]['id']);
            deputiesNames.push(arrayDeputiesThemes[index]['name']);
            count.push(arrayDeputiesThemes[index]['value']);
        }
    };

    // console.log(arrayDeputiesThemes.slice(0,5).map((e, i) => e['name']));
    // console.log(minorsNames);

    return (
        <div className='containerThemeScreen'>
            <div className='headerThemeScreen'>
                <h1>Deputados por Tema da Proposição</h1>
            </div>

            <div 
                style={{
                    display: 'flex', minWidth: '60%', flexDirection: 'row', justifyContent: 'space-around',
                    marginTop: '10px', alignSelf: 'center', backgroundColor: '#FFF', padding: '20px 0px'
                }}
            >
                <div style={{display:'flex', width:'60%', minWidth: '90px', alignItems: 'center'}}>
                    <h3>Tema selecionado: {themeSelected}</h3>  
                </div>
                <Button
                    variant={!filterScreen ? "outlined" : "contained"}
                    onClick={() => setFilterScreen(!filterScreen)}
                >
                    {!filterScreen ? "Abrir Configuração" : "Voltar"}
                </Button>
            </div>

            {!filterScreen && (
                <div className='divViewChoiceThemeScreen'>
                    <p>Escolha o tipo de visualização:</p>
                    <Box sx={{bgcolor: 'background.paper', margin: '0px 50px' }}>
                        <Tabs
                            value={valueVisualization}
                            onChange={handleChangeValueVisualization}
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab label="Exibição com Bolinhas" />
                            <Tab label="Gráfico de Barras" />
                        </Tabs>
                    </Box>
                </div>
            )}

            {filterScreen && (
                <div className='containerSetupThemeScreen'>
                    <div style={{display:'flex', width:'100%', justifyContent: 'space-around', marginTop: '50px'}}>
                        <div style={{display:'flex', width:'40%'}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tema Selecionado</InputLabel>
                            <Select
                                value={themeSelected}
                                label="Selecione um tema"
                                onChange={handleChangeStateThemeSelected}
                            >
                                {themes.map((t, i) => (
                                    <MenuItem value={t} key={i}>{t}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        </div>
                        <div style={{display:'flex', width:'20%'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Exibir deputados sem proposições</InputLabel>
                                <Select
                                    value={showNoProposition}
                                    label="Exibir deputados sem proposições"
                                    onChange={handleChangeStateNoProposition}
                                >
                                    <MenuItem value={false}>Não</MenuItem>
                                    <MenuItem value={true}>Sim</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div style={{display:'flex', width:'100%', justifyContent: 'space-around', marginTop: '50px'}}>
                        <div style={{display:'flex', width:'40%'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Atributo de Ordenação</InputLabel>
                                <Select
                                    value={sortingAttribute}
                                    label="Atributo de Ordenação"
                                    onChange={handleChangeStateSortingAttribute}
                                >
                                    <MenuItem value={'name'}>Nome do Deputado</MenuItem>
                                    <MenuItem value={'value'}>Quantidade de Proposições</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{display:'flex', width:'20%'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tipo de Ordenação</InputLabel>
                                <Select
                                    value={sortingType}
                                    label="Tipo de Ordenação"
                                    onChange={handleChangeStateSortingType}
                                >
                                    <MenuItem value={0}>Crescente</MenuItem>
                                    <MenuItem value={1}>Decrescente</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            )}
            
            {!filterScreen && valueVisualization === 0 && (
                <div style={{display:'flex', width:'100%', flexDirection: 'column'}}>
                    <div>
                        <div className="headerGraficBallsTheme">
                            <h2>Deputado</h2>
                            <h2>Proposições com o tema selecionado</h2>
                        </div>
                    </div>
                    <div className='graficBallsTheme'>
                        {deputiesNames.map((name, i) => (
                            <div className="deputieThemeScreen" key={i}>
                                <div style={{width: '40%', display:'flex'}}>
                                    <div className="deputieImageThemeScreen">
                                        <img src={require(`../../data/deputiesPictures/${name}_${deputiesIds[i]}.jpg`)} />
                                    </div>
                                    <div className='deputieNameThemeScreen'>
                                        <h2>{name}</h2>
                                    </div>
                                </div>
                                <div className='divBallsTheme'>
                                    <Ball
                                        amount={count[i]}
                                        color='rgba(55,128,191,0.6)'
                                    />
                                    <p>{count[i]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {!filterScreen && valueVisualization === 1 && (
                <div style={{marginTop: '30px'}}>
                    <Plot
                        // data = {[
                        //     {
                        //         type: "bar",
                        //         x: minorsCount.concat(biggersCount),
                        //         y: minorsName.concat(biggersName),
                        //         orientation: "h",
                        //     }
                        // ]}
                        data = {[
                            {
                                type: "bar",
                                x: minorsCount,
                                y: minorsName,
                                orientation: "h",
                                name: 'Deputados com menos proposições',
                                marker: {
                                    color: 'red'
                                }
                            },
                            {
                                type: "bar",
                                x: biggersCount,
                                y: biggersName,
                                orientation: "h",
                                name: 'Deputados com mais proposições',
                                marker: {
                                    color: 'blue'
                                }
                            }
                        ]}
                        layout = {
                            {
                                title: "Deputados mais e menos atuantes no tema",
                                showgrid: true,
                                margin: {"t": 80, "b": 50, "l": 110, "r": 10},
                                showticklabels: true,
                            }
                        } 
                    />
                    
                </div>
            )}

            {!filterScreen && valueVisualization === 0 && (
                <div>
                    <ReactPaginate
                        nextLabel="Próximo >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="< Anterior"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            )}
        </div>
    )
}

export default ThemeScreen