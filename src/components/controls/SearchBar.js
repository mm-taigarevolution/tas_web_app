import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({onKeywordChanged}) => {
  return (
    <div>
      <input defaultValue=""
             placeholder="Enter your keyword here"
             onChange={onKeywordChanged}/>
    </div>
  );
};

SearchBar.propTypes = {
  onKeywordChanged: PropTypes.func.isRequired
};

export default SearchBar;
