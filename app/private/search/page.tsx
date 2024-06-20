"use client"
import styles from "./page.module.css";
import { useState, useEffect, useContext } from "react";
import SearchBar from "@/components/search/searchBar/searchbar";
import Dropdown from "@/components/search/dropdown/dropdwon";
import Icon from "@/components/icons";
import { User } from "@/types/User.interface";
import { AuthContext } from "@/app/context/auth";
import { fetchAllUsers, fetchBasicUserInfo, fetchAllConnectionsOfAnUser } from "@/utils/fetchData";
import ContactCard from "@/components/search/contactCard/ContactCard";
import { BasicUserInfoWithIdInterface } from "@/types/BasicUserInfoWithId.interface";

export default function Search() {
  const [filter, setFilter] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const { id, token } = useContext(AuthContext);
  const [connections, setConnections] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<BasicUserInfoWithIdInterface[]>([]);
  const [userDetails, setUserDetails] = useState<BasicUserInfoWithIdInterface[]>([]);
  const options = ["admin", "student", "teacher", "company"];

  /**
   * Fetches all users except the current user and retrieves their basic details.
   */
  const fetchUsers = async () => {
    try {
      const result: User[] = await fetchAllUsers(token);
      const users = result.filter(user => user.id !== id);
      fetchDetailsForAllUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  /**
   * Fetches the details for all users and sets the state.
   * 
   * @param {User[]} users - Array of users to fetch details for.
   */
  const fetchDetailsForAllUsers = async (users: User[]) => {
    try {
      const details: BasicUserInfoWithIdInterface[] = [];
      for (const user of users) {
        const detail = await fetchBasicUserInfo(user.id, token);
        const detailWithUserId = { ...detail, user_id: user.id };
        details.push(detailWithUserId);
      }
      setUserDetails(details);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  /**
   * Fetches all connections of the current user.
   * 
   * @param {string} token - Authentication token.
   * @param {string} id - Current user ID.
   */
  const fetchConnections = async (token: string, id: string) => {
    try {
      const response = await fetchAllConnectionsOfAnUser(token, id);
      setConnections(response);
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  }

  /**
   * useEffect hook to fetch users and connections on component mount.
   */
  useEffect(() => {
    fetchUsers();
    fetchConnections(token, id);
  }, []);

  /**
   * Filters and searches users based on query and filter criteria.
   * 
   * @param {string} query - Search query.
   * @param {string} filter - Filter criteria.
   */
  const filterAndSearchUsers = (query: string, filter: string) => {
    const lowerCaseQuery = query.toLowerCase();
    const lowerCaseFilter = filter.toLowerCase();
    
    let filteredResults = userDetails;
    
    if (filter) {
      filteredResults = filteredResults.filter(user =>
        user.rol.toLowerCase().includes(lowerCaseFilter)
      );
    }

    if (query) {
      filteredResults = filteredResults.filter(user =>
        user.username.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setSearchResults(filteredResults);
  };

  /**
   * Handles search input changes.
   * 
   * @param {string} query - Search query.
   */
  const handleSearch = (query: string) => {
    setReset(false);
    setQuery(query);
    filterAndSearchUsers(query, filter);
  };

  /**
   * Handles filter selection changes.
   * 
   * @param {string} filter - Selected filter.
   */
  const handleFilterSelect = (filter: string) => {
    setFilter(filter);
    filterAndSearchUsers(query, filter);
  };

  /**
   * Resets the search and filter criteria.
   */
  const resetSearch = () => {
    setQuery("");
    setFilter("");
    setSearchResults([]);
    setReset(true);
  };


  useEffect(() => {
    if(reset){
      setReset(false);
    }
  }, [reset]);

  return (
    <main className={styles.wrapper}>
      <section className={styles.searchItems}>
        <SearchBar onSearch={handleSearch} reset={reset} />
        <Dropdown options={options} reset={reset} onSelect={handleFilterSelect} />
        <button className={styles.reloadButton} onClick={resetSearch}>
          <Icon src="/icons/rotate-right.svg" width={35} height={35} />
        </button>
      </section>
      <div className={styles.overflowActive}>
        <section className={styles.searchResults}>
          {(searchResults.length === 0 && (query !== "" || filter !== "")) ? (
            <p>No hay resultados para la búsqueda.</p>
          ) : (
            searchResults.map((user, index) => (
              <div key={index} className={styles.userCard}>
                <ContactCard user={user} isConnected={connections.includes(user.user_id)} />
              </div>
            ))
          )}
          {searchResults.length === 0 && query === "" && filter === "" && userDetails.map((user, index) => (
            <div key={index} className={styles.userCard}>
              <ContactCard user={user} isConnected={connections.includes(user.user_id)} />
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
