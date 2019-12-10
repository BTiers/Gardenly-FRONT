import React, { useState, useEffect } from 'react';
import { Card, CardImg, CardBody, CardHeader, CardFooter, Col, Row } from 'reactstrap';
import Moment from 'react-moment';

export default function News() {
  const API_TOKEN = process.env.REACT_APP_NEWSAPI_TOKEN;
  const TOPIC = 'jardinage';
  const TOPIC2 = 'jardin';

  const [news, setnews] = useState();
  const [news2, setnews2] = useState();

  useEffect(() => {
    fetch(
      `https://newsapi.org/v2/everything?qInTitle=${TOPIC}&language=fr&sortBy=publishedAt&apiKey=${API_TOKEN}`
    )
      .then(response => response.json())
      .then(data => setnews(data));

    fetch(
      `https://newsapi.org/v2/everything?qInTitle=${TOPIC2}&language=fr&sortBy=publishedAt&apiKey=${API_TOKEN}`
    )
      .then(response => response.json())
      .then(data => setnews2(data));
  }, []);

  function parseArticles(elem, index) {
    return (
      <Card style={{ width: '80%' }} key={index}>
        <CardHeader>{elem.title}</CardHeader>
        <CardImg src={elem.urlToImage} />
        <CardBody>
          {elem.description}
          <br />
          <a href={elem.url}> Lire la suite</a>
        </CardBody>
        <CardFooter>
          {`${elem.source.name} `}
          <Moment style={{ float: 'right' }} locale="fr" element="strong" fromNow>
            {elem.publishedAt}
          </Moment>
        </CardFooter>
      </Card>
    );
  }

  if (news === undefined || news2 === undefined) return <div>loading</div>;

  return (
    <div className="animated fadeIn">
      <Row>
        <Col style={{ margin: 'auto' }} xs="24" sm="12" md="8">
          {news.articles.map((elem, index) => parseArticles(elem, index))}
          {news2.articles.map((elem, index) => parseArticles(elem, index))}
        </Col>
      </Row>
    </div>
  );
}
