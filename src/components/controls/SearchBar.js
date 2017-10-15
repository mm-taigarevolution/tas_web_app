import React from 'react';
import PropTypes from 'prop-types';
import {Row, InputGroup, Input, InputGroupButton, Button} from 'reactstrap';

const SearchBar = ({onKeywordChanged, onSearchButtonClicked}) => {
  return (
    <InputGroup>
      <Input placeholder="Enter your keyword here"
             onChange={onKeywordChanged}/>
      <InputGroupButton>
        <Button color="secondary" onClick={onSearchButtonClicked}>Go!</Button>
      </InputGroupButton>
    </InputGroup>
  );
};

SearchBar.propTypes = {
  onKeywordChanged: PropTypes.func.isRequired,
  onSearchButtonClicked: PropTypes.func.isRequired
};

export default SearchBar;
