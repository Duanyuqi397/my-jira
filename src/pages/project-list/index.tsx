import React,{useState,useEffect} from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import * as qs from "qs";
import { cleanObject, useDebounce, useMount } from "utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectList = () => {
    const [users,setUsers] = useState([]); 
    const [list,setList] = useState([]);
    const [param,setParam] = useState({
        name:'',
        personId:''
    })
    const debouncedParam = useDebounce(param,200);

    const client = useHttp();

    useEffect(() => {
        client('projects',{data: cleanObject(debouncedParam)}).then(setList)
    },[debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return (
        <Container>
            <h1>项目列表</h1>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </Container>
    )
}

const Container = styled.div`
    padding: 3.2rem;
`