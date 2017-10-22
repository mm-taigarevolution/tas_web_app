import React from 'react';
import PropTypes from 'prop-types';
import {Row, InputGroup, Input, InputGroupButton, Button} from 'reactstrap';

const SearchBar = ({onKeywordChanged}) => {
  return (
    <InputGroup>
      <Input placeholder="Enter your keyword here"
             onChange={onKeywordChanged}/>
    </InputGroup>
  );
};

SearchBar.propTypes = {
  onKeywordChanged: PropTypes.func.isRequired
};

export default SearchBar;
