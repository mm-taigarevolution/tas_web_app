import React from 'react';
import PropTypes from 'prop-types';
import {InputGroup, Input} from 'reactstrap';

const containerStyle = {
  margin: '0px',
  padding: '0px'
};

const SearchBarControl = ({keyword, onKeywordChanged}) => {
  return (
    <InputGroup style={containerStyle}>
      <Input id="keywordInput"
             value={keyword}
             placeholder="Enter your keyword here"
             onChange={onKeywordChanged}/>
    </InputGroup>
  );
};

SearchBarControl.propTypes = {
  keyword: PropTypes.string.isRequired,
  onKeywordChanged: PropTypes.func.isRequired
};

export default SearchBarControl;
