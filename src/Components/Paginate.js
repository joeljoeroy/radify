import React from 'react';
import { useEffect, useState, useLayoutEffect } from 'react';
import View from './View'
import ReactPaginate from 'react-paginate';

export default function Paginate () {
    
    const [SavedTasks, setSavedTasks] = useState({});
    const [jsonRendered, setjsonRendered] = useState(false);
    const [pageNo, setPageNo] = useState(0);

    useEffect(() => {
       const json = localStorage.getItem('saved') ;
       const saved = JSON.parse(json);

       setSavedTasks(() =>{ return {  
           email: saved.email,
           date: saved.date,
           tasks: saved.tasks
        }}
        );
        setjsonRendered(true);

    },[]);

    const usersPerPage = 6;
    const pagesVisited =  pageNo * usersPerPage;
    const pageCount = Math.ceil(jsonRendered && (SavedTasks.tasks.length)/usersPerPage);

    
    const viewAll = jsonRendered && SavedTasks.tasks.slice(pagesVisited, pagesVisited + usersPerPage) 
        .map((task) => <View data = {{
        email: SavedTasks.email,
        date: SavedTasks.date,
        task: task
    }}/>);

    const changePage = ({selected}) => {setPageNo(selected)};


    return (
    <>
        <div className='containerView'>
            {viewAll}
        </div>
        <ReactPaginate 
            previousLabel = {'Previous'}
            nextLabel = {'Next'}
            pageCount = {pageCount}
            onPageChange = {changePage}
            containerClassName = {'paginationButton'}
            previousLinkClassName = {'previousButton'}
            nextClassName = {'nextButton'}
            disabledClassName = {'paginationDisabled'}
            activeClassName = {'paginationActive'}

            />  
    </>

    );
}