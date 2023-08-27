import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Space, Checkbox } from 'antd';
import numeral from 'numeral';
const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #7c625a;
  padding: 10px 20px;
  color: #dacc79;
  border: ${(props) => (props.selected ? '2px solid #dacc79' : 'none')};
`;
const ParticipantData = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;
const DepositsAndDirects = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #dacc79;
  padding: 5px 20px;
  color: #4e2e4b;
  border-radius: 10px;
`;
const Participant = ({ data, index, selection, onSelectionChange }) => {
  return (
    <ParticipantContainer
      onClick={() => onSelectionChange(index)}
      selected={selection.includes(index)}>
      <Space>
        <Checkbox
          checked={selection.includes(index)}
          //   onChange={() => {
          //     onSelectionChange(index);
          //   }}
        />
        <ParticipantData>
          <Space>
            <span>{index}.</span>
            <span style={{ wordBreak: 'break-all' }}>{data.address}</span>
          </Space>
          <DepositsAndDirects>
            <Space>
              <strong>Deposits: </strong>
              <span>{numeral(data.deposits).format('0,0.000')} Splash</span>
            </Space>
            <Space>
              <strong>Directs: </strong>
              {data.referrals}
            </Space>
          </DepositsAndDirects>
        </ParticipantData>
      </Space>
    </ParticipantContainer>
  );
};

export default Participant;
