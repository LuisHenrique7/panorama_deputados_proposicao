import React from 'react';
import { useState } from 'react';

const ThemeScreen = ({ proposicaoPorTema }) => {
    // console.log(Object.keys(proposicaoPorTema));
    const themes = [];
    for (var k = 0; k < Object.keys(proposicaoPorTema).length; ++k) {
        if (k !== 0 && k !== 1) {
            themes.push(Object.keys(proposicaoPorTema)[k]);
        }
    };
    const [themeSelected, setThemeSelected] = useState(themes[1]);

    const deputiesNames = [];
    const count = [];
    for (var index = 0; index < Object.keys(proposicaoPorTema['id']).length; ++index) {
        deputiesNames.push(proposicaoPorTema['nome'][index]);
        count.push(proposicaoPorTema[themeSelected][index].length);
    };
    // console.log(count);

    return (
        <div>
            <div>ThemeScreen</div>
            <div>
                <h4>Tema Selecionado: {themeSelected}</h4>
                {deputiesNames.map((name, i) => (
                    <p key={i}>Nome: {name}. Quantidade de Proposições: {count[i]}</p>
                ))}
            </div>
        </div>
    )
}

export default ThemeScreen