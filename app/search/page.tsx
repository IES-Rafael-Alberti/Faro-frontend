"use client"
import styles from "./page.module.css";
import { useState, useEffect, useContext } from "react";
import SearchBar from "@/components/search/searchBar/searchbar";
import Dropdown from "@/components/search/dropdown/dropdwon";
import Icon from "@/components/icons";
import { User } from "@/types/User.interface";
import { AuthContext } from "@/context/auth";
import { fetchAllUsers, fetchBasicUserInfo } from "@/utils/fetchData";
import { BasicUserInfoInterface } from "@/types/BasicUserInfo.interface";
import ContactCard from "@/components/search/contactCard/ContactCard";

export default function Search() {
  const [filter, setFilter] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { token } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<BasicUserInfoInterface[]>([]);
  const [userDetails, setUserDetails] = useState<BasicUserInfoInterface[]>([]);
  const options = ["admin", "student", "teacher", "company"];

  const fetchUsers = async () => {
    try {
      const result: User[] = await fetchAllUsers(token);
      setAllUsers(result);
      fetchDetailsForAllUsers(result);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchDetailsForAllUsers = async (users: User[]) => {
    try {
      const details: BasicUserInfoInterface[] = [];
      for (const user of users) {
        const detail = await fetchBasicUserInfo(user.user_id, token);
        details.push(detail);
      }
      setUserDetails(details);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (query: string) => {
    setQuery(query);
    if(query === "" || query === null) {
      setSearchResults([]);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();

    if (searchResults.length > 0) {
      const filteredResults = searchResults.filter(user =>
        user.username.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(filteredResults);
    } else {
      const filteredResults = userDetails.filter(user =>
        user.username.toLowerCase().includes(lowerCaseQuery)
      );
      setSearchResults(filteredResults);
    }
  };


  const handleFilterSelect = (filter: string) => {
    setFilter(filter);
    console.log(filter)
    if(filter === "" || filter === null) {
      setSearchResults([]);
      return;
    }
    const filteredResults = userDetails.filter(user =>
      user.rol.toLowerCase().includes(filter));
    setSearchResults(filteredResults);
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.searchItems}>
        <SearchBar onSearch={handleSearch}/>
        <Dropdown options={options} onSelect={handleFilterSelect} />
        <button className={styles.reloadButton} onClick={fetchUsers}>
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
                <ContactCard user={user}/>
              </div>
            ))
          )}
          {searchResults.length === 0 && query === "" && filter === "" && userDetails.map((user, index) => (
            <div key={index} className={styles.userCard}>
              <ContactCard user={user}/>
            </div>
          ))}
        </section>
      </div>

    </main>
  );
}
