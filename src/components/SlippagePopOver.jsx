import { Popover, Radio, InputNumber, Space } from 'antd';
import styled from 'styled-components';
const PopoverContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 300px;
  align-items: center;
`;
const Title = styled.div`
  color: #dacc79;
  margin-bottom: 10px;
  font-size: 16px;
`;
const RadioContainer = styled.div`
  margin-bottom: 10px;
`;
const SlippageValue = styled.div`
  font-size: 14px;
`;
const SlippagePopOver = ({ slippage, setSlippage, children }) => {
  return (
    <Popover
      content={
        <SlippageContent setSlippage={setSlippage} slippage={slippage} />
      }
      trigger="click"
      style={{ backgroundColor: 'green' }}>
      {children}
    </Popover>
  );
};
const SlippageContent = ({ setSlippage, slippage }) => {
  return (
    <PopoverContent>
      <Title>Set Slippage</Title>
      <RadioContainer>
        <Space>
          <Radio.Group
            value={slippage}
            buttonStyle="solid"
            onChange={({ target }) => {
              setSlippage(target.value);
            }}>
            <Radio.Button value={1}>
              <SlippageValue>1 %</SlippageValue>
            </Radio.Button>
            <Radio.Button value={3}>
              <SlippageValue>3 %</SlippageValue>
            </Radio.Button>
            <Radio.Button value={5}>
              <SlippageValue>5 %</SlippageValue>
            </Radio.Button>
          </Radio.Group>
          <div>
            <InputNumber
              controls={false}
              className="SlippageInput"
              style={{
                width: 50,
              }}
              value={slippage}
              onChange={setSlippage}
              placeholder="%"
            />
            <span style={{ fontSize: 14 }}>%</span>
          </div>
        </Space>
      </RadioContainer>
    </PopoverContent>
  );
};

export default SlippagePopOver;
