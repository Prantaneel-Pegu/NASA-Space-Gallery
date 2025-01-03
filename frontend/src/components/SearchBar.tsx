import { GetImageResults } from '../services/communication';
import './styles/SearchBar.css';
import { SearchIcon } from './SvgIcons';
import { Dispatch, FormEvent, SetStateAction, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchBarProps = {
    searchQuery: { query: string },
    setSearchQuery: Dispatch<SetStateAction<{query: string}>>,
    newSubmitEvent: boolean,
    setNewSubmitEvent: Dispatch<SetStateAction<boolean>>,
    searchResult: GetImageResults,
    searchBoxValue: string,
    setSearchBoxValue: Dispatch<SetStateAction<string>>,
    clickBackEvent: boolean,
    setClickBackEvent: Dispatch<SetStateAction<boolean>>,
}

function SearchBar (props: SearchBarProps) {
    const searchQuery = props.searchQuery;
    const setSearchQuery = props.setSearchQuery;
    const [searchParams, setSearchParams] = useSearchParams();
    const setNewSubmitEvent = props.setNewSubmitEvent;
    const searchResult = props.searchResult;
    const searchBoxValue = props.searchBoxValue;
    const setSearchBoxValue= props.setSearchBoxValue;
    const setClickBackEvent = props.setClickBackEvent;
    const isFirstClickBack = useRef(true);

    useEffect(() => {
        // Updates searchBox text after new search or after user clicks back button
        const searchBox = document.querySelector<HTMLInputElement>("#search-box");
        searchBox!.value = searchBoxValue || searchParams.get('search') || searchQuery.query
        if (searchResult.results.length === 0 && !isFirstClickBack) setClickBackEvent(true); else isFirstClickBack.current = false;
    })

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
    
        const formElement = e.currentTarget
        const newSearchQuery = { query: new FormData(formElement).get("search-query")?.toString() || "" }; 

        setSearchQuery(newSearchQuery); 
        if (newSearchQuery.query === "") {
            setSearchParams({});
        } else {
            setSearchParams({ search: newSearchQuery.query });
            setNewSubmitEvent(true);
        }
    
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <div id="search-bar">
                <SearchIcon classNames='' id='search-icon'/>
                <input type="text" id="search-box" name="search-query" placeholder="supernovae..." value={searchBoxValue} onChange={e => {setSearchBoxValue(e.target.value)}} />
            </div>
        </form>
    )
}

export default SearchBar;