import React from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Input} from 'reactstrap';

const SearchBarControl = ({onKeywordChanged}) => {
  return (
    <InputGroup>
      <Input id="keywordInput"
             placeholder="Enter your keyword here"
             onChange={onKeywordChanged}/>
    </InputGroup>
  );
};

SearchBarControl.propTypes = {
  onKeywordChanged: PropTypes.func.isRequired
};

export default SearchBarControl;
