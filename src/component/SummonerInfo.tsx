import getProfileIconUrl from 'model/Ddragon';
import { UserData } from '../model/Api';
import '../css/SummonerInfo.css';
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';

interface SummonerInfoProps {
  userdata?: UserData
}

export default function SummonerInfo(props: SummonerInfoProps) {
  const { userdata } = props;

  function onButtonClick() {
    //alert('a');
  }

  if (userdata === undefined) {
    return (
      <div id="userData">
        <div>Loading...</div>
      </div>
    )

  } else if (userdata.error !== undefined) {
    return (
      <div id="userData">
        <div>{userdata.error}</div>
      </div>
    )
  } else if (userdata.data !== undefined) {
    return (
      <div id="userData">
        <Stack gap={3}>
          <div></div>
          <Container>
            <Row className='justify-content-start'>
              <Col xxl={1} md={2} xs={5}>
                <img className='profileIcon' src={getProfileIconUrl(String(userdata.data.profileIconId))} />
              </Col>
              <Col xxl={11} md={10} xs={7}>
                <Stack gap={2}>
                  <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{userdata.data.name}</span>
                  <div>
                    <Button variant='outline-primary' size='sm' onClick={onButtonClick}>전적갱신</Button>
                  </div>
                  <span style={{ fontSize: '0.9em' }}>최근 갱신: 22/03/09</span>
                </Stack>
              </Col>
            </Row>
          </Container>
          <div></div>
        </Stack>
      </div>
    )
  } else {
    return (<></>);
  }

}