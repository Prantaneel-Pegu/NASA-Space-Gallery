import './styles/SearchComponent.css'
import { Dispatch, SetStateAction} from 'react';
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
    setNewSubmitEvent: Dispatch<SetStateAction<boolean>>
}

function SearchComponent (props: SearchComponentProps) {
    const searchQuery = props.searchQuery;
    const setSearchQuery = props.setSearchQuery;
    const searchResult = props.searchResult;
    const setSearchResult = props.setSearchResult;
    const newSubmitEvent = props.newSubmitEvent;
    const setNewSubmitEvent = props.setNewSubmitEvent;

    return (
        <div id="SearchComponent">
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} newSubmitEvent={newSubmitEvent} setNewSubmitEvent={setNewSubmitEvent} />
            <SearchResults searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchResult={searchResult} setSearchResult={setSearchResult} newSubmitEvent={newSubmitEvent} setNewSubmitEvent={setNewSubmitEvent} />
        </div>
    )
}

export default SearchComponent;