import React from 'react';
import { useState } from 'react';
import Plot from 'react-plotly.js';


import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import './styles.css';

import Ball from '../../components/Ball';

const AnalysisThemesScreen = ({ proposicaoPorTema }) => {
    const themes = [];
    for (var k = 0; k < Object.keys(proposicaoPorTema).length; ++k) {
        if (k !== 0 && k !== 1 && Object.keys(proposicaoPorTema)[k] !== "Sem tema") {
            themes.push(Object.keys(proposicaoPorTema)[k]);
        }
    };

    themes.sort();

    const onlyUnique = (value, index, array) => {
        return array.indexOf(value) === index;
    };

    const themesCount = [];
    themes.forEach((t) => {
        var aux = [];
        for (var k = 0; k < Object.keys(proposicaoPorTema[t]).length; ++k) {
            aux = aux.concat(proposicaoPorTema[t][k]);
        };

        themesCount.push(aux.filter( onlyUnique ).length);
    });

    // console.log(themesCount);

    const [valueVisualization, setValueVisualization] = useState(0);
    const handleChangeValueVisualization = (event, newValueVisualization) => {
        setValueVisualization(newValueVisualization);
    };

    return (
        <div className='containerAnalysisThemesScreen'>
            <div className='headerAnalysisThemesScreen'>
                <h1>Temas das Proposições</h1>
            </div>
            <div className='divViewChoiceAnalysisThemesScreen'>
                <p>Escolha o tipo de visualização:</p>
                <Box sx={{bgcolor: 'background.paper', margin: '0px 50px' }}>
                    <Tabs
                        value={valueVisualization}
                        onChange={handleChangeValueVisualization}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab label="Exibição com Bolinhas" />
                        <Tab label="Gráfico de Pizza" />
                        <Tab label="Gráfico de Barras" />
                    </Tabs>
                </Box>
            </div>

            {valueVisualization === 0 && (
                <div>
                    <div>
                        <div className="headerGraficBallsAnalysisThemesScreen">
                            <h2>Temas</h2>
                            <h2>Quantidade de Proposições</h2>
                        </div>
                    </div>
                    <div className='graficBallsAnalysisThemesScreen'>
                        {themes.map((theme, i) => (
                            <div className="themeAnalysisThemesScreen" key={i}>
                                <div className='themeNameAnalysisThemesScreen'>
                                    <h2>{theme}</h2>
                                </div>
                                <div className='divBallsAnalysisThemesScreen'>
                                    <Ball
                                        amount={themesCount[i]}
                                        color='rgba(55,128,191,0.6)'
                                    />
                                    <p>{themesCount[i]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {valueVisualization === 1 && (
                <div style={{marginTop: '30px'}}>
                    <div>
                        <Plot
                            data = {[
                                {
                                    type: "pie",
                                    values: themesCount,
                                    labels: themes,
                                    textinfo: "label+percent",
                                    textposition: "inside",
                                    automargin: true,
                                }
                            ]}
                              
                            layout = {
                                {
                                    title: "Percentagem de proposições por tema",
                                    height: 1000,
                                    width: 1000,
                                    margin: {"t": 80, "b": 50, "l": 50, "r": 50},
                                    showlegend: false,
                                }
                            }
                           
                        />
                    </div>
                </div>
            )}

            {valueVisualization === 2 && (
                <div style={{marginTop: '30px'}}>
                    <div>
                        <Plot
                            data = {[
                                {
                                    type: "bar",
                                    x: themesCount,
                                    y: themes,
                                    orientation: "h",
                                }
                            ]}
                            layout = {
                                {
                                    title: "Quantidades de proposições por tema",
                                    height: 1000,
                                    width: 1000,
                                    showgrid: true,
                                    margin: {"t": 50, "b": 50, "l": 300, "r": 10},
                                    showticklabels: true
                                }
                            } 
                        />
                    </div>
                </div>
            )}

        </div>
    )
}

export default AnalysisThemesScreen