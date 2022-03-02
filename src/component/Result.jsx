import React from 'react';
import Info from './Info';
import { useParams } from 'react-router-dom';

export default function Result() {
  return <Info params={useParams()} />;
}