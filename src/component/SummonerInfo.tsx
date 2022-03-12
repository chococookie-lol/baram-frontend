import { getProfileIconUrl } from 'model/Ddragon';
import { fetchMatchData, fetchSummonerData, UserData } from '../model/Api';
import '../css/SummonerInfo.css';
import { Button, Col, Container, Placeholder, Row, Spinner, Stack } from 'react-bootstrap';
import { useState } from 'react';

interface SummonerInfoProps {
  userdata?: UserData
}

export default function SummonerInfo(props: SummonerInfoProps) {
  const { userdata } = props;
  const [isFetching, setIsFetching] = useState(false);

  async function onButtonClick() {
    if (userdata === undefined || userdata.data === undefined) {
      return;
    }

    setIsFetching(true);

    let promises = [];

    try {
      promises.push(fetchSummonerData(userdata.data.name));
      promises.push(fetchMatchData(userdata.data.puuid));

      await Promise.all(promises);

      setIsFetching(false);
      window.location.reload();

      return;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        setIsFetching(false);
      }
    }
  }

  if (userdata?.error !== undefined) {
    return (
      <div id="userData">
        <div>{userdata.error}</div>
      </div>
    )
  } else {
    return (
      <div id="userData">
        <Stack gap={3}>
          <div></div>
          <Container>
            <Row className='justify-content-start'>
              <Col xxl={1} md={2} xs={5}>
                {
                  userdata === undefined ?
                    <div></div>
                    :
                    <div className='profile-wrap'>
                      <div className='icon-image'>
                        <img className='profileIcon' src={getProfileIconUrl(String(userdata?.data?.profileIconId))} />
                      </div>
                      <div className='level-text'>
                        <p className='level-text'>{userdata?.data?.summonerLevel}</p>
                      </div>
                    </div>
                }
              </Col>
              <Col xxl={11} md={10} xs={7}>
                <Stack gap={2}>
                  {
                    userdata === undefined ?
                      <Placeholder xs={2} size='lg' />
                      :
                      <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{userdata?.data?.name}</span>
                  }
                  <div>
                    <Button variant='outline-primary' size='sm' onClick={onButtonClick} disabled={isFetching}>
                      {
                        isFetching ?
                          <>
                            <Spinner as='span' animation='border' size='sm' role='status' area-hidden='true' />
                            <span> </span>
                          </>
                          :
                          <></>
                      }
                      전적갱신
                    </Button>
                  </div>
                  {
                    userdata === undefined ?
                      <Placeholder xs={4} />
                      :
                      userdata.data === undefined ?
                        <Placeholder xs={4} />
                        :
                        userdata.data.recentUpdate === null ?
                          <span style={{ fontSize: '0.9em' }}>갱신 기록 없음</span>
                          :
                          <span style={{ fontSize: '0.9em' }}>최근 갱신: {new Date(Number(userdata.data.recentUpdate)).toLocaleDateString()}</span>
                  }
                </Stack>
              </Col>
            </Row>
          </Container>
          <div></div>
        </Stack>
      </div>
    )
  }

}