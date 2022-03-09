import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Stack, FormControl, FormGroup, Row } from 'react-bootstrap';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

export default function Search() {
  const [summonerName, setSummonerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoading && summonerName !== '') {
      setIsLoading(true);
      navigate('/search/' + summonerName);
      setIsLoading(false);
    }
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSummonerName(e.target.value);
  }

  useEffect(() => {
    if (name !== undefined) {
      setSummonerName(name);
    }
  }, [name])

  return (
    <>
      <div className='HeaderBox'></div>
      <div className="SearchBoxContainer">
        <form onSubmit={onSubmit}>
          <FormGroup role='form'>
            <Stack gap={2}>
              <div></div>
              <Container>
                <Row className='justify-content-center'>
                  <Col md={6} sm={9} xs={12} className='mb-1'>
                    <FormControl type='text' value={summonerName} onChange={onChange} placeholder="소환사명" />
                  </Col>
                  <Col md={2} sm={3} xs={12} className='mb-1'>
                    <div className='d-grid'>
                      <Button variant='primary' disabled={isLoading} type='submit'>검색</Button>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Stack>
          </FormGroup>
        </form>
      </div>
      <Outlet />
    </>
  );
}
