import styled from "styled-components";

export const TitleHome = styled.div`
    font-family: 'Raleway', sans-serif;
    text-align: center;
    margin-bottom: 20px;
    border: 1px solid #ccc;
`;

export const ContenExit = styled.div`
    display: flex;

    .exit{
        cursor: pointer;
        &:hover{
            color: red;
        }
    }
`

export const Text = styled.h1`
    color: #fcfcfcc3
`;

export const ContainerHome = styled.div`
    background-color:transparent;
    width: 100%;
    max-height: 80%;
    margin-bottom: 15px;
    overflow-y: auto;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

export const Thead = styled.thead`
    background-color: transparent;
    color: #fffefe;
    font-weight: bold;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid black;
`;

export const Tr = styled.tr`
    &:nth-child(odd) {
        background-color: transparent
    }
`;

export const Th = styled.th`
    background-color: transparent;
    color: #000000;
    font-weight: bolder;
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #d0ceffc9;
`;

export const Tbody = styled.tbody`
    padding: 10px;
    border-bottom: 1px solid #d0ceffc9;

    &:nth-child(odd) {
        background-color: transparent;
    }
`;


export const Td = styled.td`
    padding: 10px;
    text-transform: capitalize;
    border-bottom: 1px solid #d0ceffc9;
    color: #fff;
&.email {
    text-transform: lowercase;
}
`;