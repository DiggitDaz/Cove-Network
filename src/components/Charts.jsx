import styled from 'styled-components';
const Section = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  overflow: none;
  position: relative;
  padding: 0px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.div`
  font-family: arial black;
  text-transform: uppercase;
  font-size: 72px;
  font-weight: bold;
  @media screen and (max-width: 850px) {
    font-size: 9vw;
  }
`;
const Chart = () => {
  return (
    <Section>
      <Container>
        <Title className="gradient-text2">Price</Title>
        <div
          style={{
            maxWidth: '1000px',
            height: '600px',
            width: '100%',
          }}>
          <iframe
            src="https://teams.bogged.finance/embeds/chart?address=0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7&chain=avax&charttype=candles&theme=bg:eed69a|bg2:c56a39|primary:c56a39|secondary:995218|text:black|text2:black|candlesUp:c56a39|candlesDown:78938a|chartLine:018CF0FF&defaultinterval=1h&showchartbutton=true"
            frameBorder="0"
            height="100%"
            width="100%"
          />
        </div>
        <div
          style={{
            marginTop: 10,
            maxWidth: '1000px',
            height: '600px',
            width: '100%',
          }}>
          <iframe
            src="https://teams.bogged.finance/embeds/chart?address=0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7&chain=avax&charttype=candles&theme=bg:eed69a|bg2:c56a39|primary:c56a39|secondary:995218|text:black|text2:black|candlesUp:c56a39|candlesDown:78938a|chartLine:018CF0FF&defaultinterval=1h&showchartbutton=true"
            frameBorder="0"
            height="100%"
            width="100%"
          />
        </div>
      </Container>
    </Section>
  );
};

export default Chart;

// 0xE16253892F126D068E711C2fdde6DB56969dBCf6

// 0xbc6f589171d6d66EB44ebCC92dFFb570Db4208da
