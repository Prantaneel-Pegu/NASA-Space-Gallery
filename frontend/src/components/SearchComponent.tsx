import './styles/SearchComponent.css'
import { Dispatch, SetStateAction, useState} from 'react';
import { GetImageResults } from '../services/communication';
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

type SearchQuery = {
    query: string
}

type SearchResult = GetImageResults;

type SearchComponentProps = {
    searchQuery: SearchQuery,
    setSearchQuery: Dispatch<SetStateAction<SearchQuery>>,
    searchResult: SearchResult,
    setSearchResult: Dispatch<SetStateAction<GetImageResults>>,
    newSubmitEvent: boolean,
    setNewSubmitEvent: Dispatch<SetStateAction<boolean>>,
    searchBoxValue: string,
    setSearchBoxValue: Dispatch<SetStateAction<string>>,
}

function SearchComponent (props: SearchComponentProps) {
    const searchQuery = props.searchQuery;
    const setSearchQuery = props.setSearchQuery;
    const searchResult = props.searchResult;
    const setSearchResult = props.setSearchResult;
    const newSubmitEvent = props.newSubmitEvent;
    const setNewSubmitEvent = props.setNewSubmitEvent;
    const searchBoxValue = props.searchBoxValue;
    const setSearchBoxValue= props.setSearchBoxValue;
    const [clickBackEvent, setClickBackEvent] = useState(false);

    return (
        <div id="SearchComponent">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} newSubmitEvent={newSubmitEvent} setNewSubmitEvent={setNewSubmitEvent} searchResult={searchResult} searchBoxValue={searchBoxValue} setSearchBoxValue={setSearchBoxValue} clickBackEvent={clickBackEvent} setClickBackEvent={setClickBackEvent} />
            <SearchResults searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResult={searchResult} setSearchResult={setSearchResult} newSubmitEvent={newSubmitEvent} setNewSubmitEvent={setNewSubmitEvent} clickBackEvent={clickBackEvent} setClickBackEvent={setClickBackEvent} />
        </div>
    )
}

export default SearchComponent;