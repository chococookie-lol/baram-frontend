import { getProfileIconUrl } from 'model/Ddragon';
import { fetchMatchData, fetchSummonerData } from '../model/Api';
import '../css/SummonerInfo.css';
import * as Api from '../model/Api';
import { Button, Col, Container, Placeholder, Row, Spinner, Stack } from 'react-bootstrap';
import { useState } from 'react';

interface SummonerInfoProps {
  userdata?: Api.SummonerData,
}

export default function SummonerInfo(props: SummonerInfoProps) {
  const { userdata } = props;
  const [isFetching, setIsFetching] = useState(false);

  async function onButtonClick() {
    if (!userdata) {
      return;
    }

    setIsFetching(true);

    let promises = [];

    try {
      promises.push(fetchSummonerData(userdata.name!));
      promises.push(fetchMatchData(userdata.puuid!));

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

  if (!userdata) {
    return (
      //loading
      <div id="userData">
        <Stack gap={3}>
          <div></div>
          <Container>
            <Row className='justify-content-start'>
              <Col xxl={1} md={2} xs={5}>
                <div className='profile-wrap'>
                  <div className='icon-image profileIcon loading'/>
                </div>
              </Col>
              <Col xxl={11} md={10} xs={7}>
                <Stack gap={2}>
                  <div className='loading' style={{height:'1.2em', width:'200px'}}/>
                  <div className='loading' style={{height:'1.2em', width:'180px'}}/>
                  <div className='loading' style={{height:'1.2em', width:'150px'}}/>
                </Stack>
              </Col>
            </Row>
          </Container>
          <div></div>
        </Stack>
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
                        <img className='profileIcon' src={getProfileIconUrl(String(userdata.profileIconId))} />
                      </div>
                      <div className='level-text'>
                        <p className='level-text'>{userdata.summonerLevel}</p>
                      </div>
                    </div>
                }
              </Col>
              <Col xxl={11} md={10} xs={7}>
                <Stack gap={2}>
                  {
                    !userdata ?
                      <Placeholder xs={2} size='lg' />
                      :
                      <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{userdata.name}</span>
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
                    !userdata ? <Placeholder xs={4} />
                      :
                      !userdata.recentUpdate ?
                        <span style={{ fontSize: '0.9em' }}>갱신 기록 없음</span>
                        :
                        <span style={{ fontSize: '0.9em' }}>최근 갱신: {new Date(Number(userdata.recentUpdate)).toLocaleDateString()}</span>
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