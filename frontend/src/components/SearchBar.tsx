import './styles/SearchBar.css';
import { SearchIcon } from './SvgIcons';
import { Dispatch, FormEvent, SetStateAction, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

type SearchBarProps = {
    searchQuery: { query: string },
    setSearchQuery: Dispatch<SetStateAction<{query: string}>>,
    newSubmitEvent: boolean,
    setNewSubmitEvent: Dispatch<SetStateAction<boolean>>
}

function SearchBar (props: SearchBarProps) {
    const searchQuery = props.searchQuery;
    const setSearchQuery = props.setSearchQuery;
    const [searchParams, setSearchParams] = useSearchParams();
    const setNewSubmitEvent = props.setNewSubmitEvent;

    useEffect(() => {
        // Updates searchBox text after new search or after user clicks back button
        const searchBox = document.querySelector<HTMLInputElement>("#search-box");
        searchBox!.value = searchParams.get('search') || searchQuery.query
    })

    function handleSubmit (e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        e.stopPropagation();
    
        const searchBox = document.querySelector<HTMLInputElement>("#search-box");
        const formElement = e.currentTarget
        const newSearchQuery = { query: new FormData(formElement).get("search-query")?.toString() || "" }; 

        setSearchQuery(newSearchQuery); 
        if (newSearchQuery.query === "") {
            setSearchParams({});
            searchBox!.value = "";
        } else {
            setSearchParams({ search: newSearchQuery.query });
            setNewSubmitEvent(true);
        }
    
        console.log(searchParams, newSearchQuery.query);
    }

    return (
        <form method="POST" onSubmit={handleSubmit}>
            <div id="search-bar">
                <SearchIcon classNames='' id='search-icon'/>
                <input type="text" id="search-box" name="search-query" placeholder="supernovae..."/>
            </div>
        </form>
    )
}

export default SearchBar;