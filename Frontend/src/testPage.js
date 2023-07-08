import React, { useEffect } from 'react';

function TestPage(){

  useEffect(() => {
    async function fetchData(){
      await fetch('http://localhost:5000/testPage')
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => console.log(err));
    }
    fetchData();
  })
  return (
    <h1>Hello this is test page</h1>
  )
}

export default TestPage;