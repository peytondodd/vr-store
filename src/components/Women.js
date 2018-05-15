import React, { Component } from 'react';
import styled from 'styled-components';
import MenuList from './details/sideMenu/MenuList';
import MainContainer from './details/mainContainer/MainContainer';
import Title from './details/Title';

const WomanComponent = styled.div`
    margin-top: 80px;
`
export default class Women extends Component {

    render() {
        return (
            <WomanComponent >
                <Title title="WOMAN"/>
                <MenuList category="women"/>
                <MainContainer banner="WOMAN BANNER" category="Women"/>
            </WomanComponent>
        )
    }
}