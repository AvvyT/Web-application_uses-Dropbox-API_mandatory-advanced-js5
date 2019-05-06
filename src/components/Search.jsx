import React, { useState } from "react";
import { dbx } from "./functions";
import styles from "./css/main.module.css";

// Visa sökresultat istället för huvudinnehållet
// Om en användare klickar på en katalog ska applikationen navigera till den katalogen
// Om en användare klickar på en fil ska filen laddas ner


const Search = () => {
  const [searchWord, updateSearchWord] = useState(null);

  // En användare ska kunna söka efter filer och kataloger
  const searchFileOrFolder = () => {
    console.log(searchWord);

    // path in the user's Dropbox to search. Should probably be a folder

    let results = [];
    let path = '';
    // query is For file name and folder searching 
    // starting index within the search results (used for paging)
    //	max_results => The maximum number of search results to return.
    dbx.filesSearch({
      path: path, query: searchWord, start: 0, max_results: 10, mode: { '.tag': 'filename_and_content' }
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    searchFileOrFolder();
  }

  return (
    <form className={styles.fromStyle} onSubmit={handleSubmit}>
      <input placeholder="search" className={styles.inputStyle}
        onChange={(e) => updateSearchWord(e.target.value)} />
      <input type='submit' className={styles.buttonStyle} value='Search'/>
    </form>
  );
}

export default Search;
