import React from "react";
import styled from "styled-components";

const Spinner = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
`;

const Loadeing = () => {
  return <Spinner />;
};

export default Loadeing;
