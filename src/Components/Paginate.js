import React from 'react';
import { useEffect, useState} from 'react';
import View from './View'
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';

export default function Paginate () {
    
    const [SavedTasks, setSavedTasks] = useState({
        email: '',
        date: '',
        tasks: []
    });
    const [error, setError] = useState(false);
    const [pageNo, setPageNo] = useState(0);

        useEffect(() => {
            fetch('http://localhost:3000/tasks')
            .then(response => {
                // console.log(response);
                if(!response.ok){ 
                    throw Error("Invalid API Fetch");
                }
                return response.json();  
            })  
            .then(res => {
                console.log(res.data)
                if(!res.data.length <= 0){
                    setSavedTasks(() => {
                        return {
                        email: res.data[0].email,
                        date: res.data[0].date,
                        tasks: res.data[0].tasks
                        }
                    });
            }else{
                    throw Error('No Tasks Available');
                }
            }).catch(err => {setError(true); toast.warning(err.message,{ autoClose: 2000, position: toast.POSITION.BOTTOM_CENTER})})
        }, [])

///////////////////// Pagination Code /////////////////////////////////////////////////////
    const usersPerPage = 6;
    const pagesVisited =  pageNo * usersPerPage;
    const pageCount = Math.ceil(SavedTasks.tasks.length/usersPerPage);
    const changePage = ({selected}) => {setPageNo(selected)};
/////////////////////////////////////////////////////////////////////////////////////////////

    const viewAll = SavedTasks.tasks.slice(pagesVisited, pagesVisited + usersPerPage) 
        .map((task) => <View data = {{
        email: SavedTasks.email,
        date: SavedTasks.date,
        task: task.task
    }}/>);


    return (
    <>

        {<div className='containerView'>
            {viewAll}
        </div>}

        {!error && <ReactPaginate 
            previousLabel = {'Previous'}
            nextLabel = {'Next'}
            pageCount = {pageCount}
            onPageChange = {changePage}
            containerClassName = {'paginationButton'}
            previousLinkClassName = {'previousButton'}
            nextClassName = {'nextButton'}
            disabledClassName = {'paginationDisabled'}
            activeClassName = {'paginationActive'}

            />   }
    </>

    );
}