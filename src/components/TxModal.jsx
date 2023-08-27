import { Modal, Spin, Image } from 'antd';
import styled from 'styled-components';
const TxModalMessage = styled.div`
  font-size: 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
const TxModal = ({ visible, text, modalClosable }) => {
  return (
    <Modal
      visible={visible}
      closable={modalClosable}
      footer={null}
      centered
      // width={300}
      bodyStyle={{
        backgroundColor: '#4e2e4b',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#dacc79',
      }}>
      <TxModalMessage>
        <p>
          <Image src="/logodrop.png" preview={false} />
        </p>
        <p>{text}</p>
        <Spin className="yellowSpin" size={'large'} />
      </TxModalMessage>
    </Modal>
  );
};

export default TxModal;
