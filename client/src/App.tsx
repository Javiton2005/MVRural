import React, { useState, useEffect } from 'react';

interface MembersResponse {
  members: string[];
}

function App() {
  const [data, setData] = useState<MembersResponse | null>(null);

  useEffect(() => {
    fetch("/members")
      .then(res => res.json())
      .then((data: MembersResponse) => {
        setData(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      {!data ? (
        <p>loading...</p>
      ) : (
        data.members.map((member, i) => (
          <p key={i}>{member}</p>
        ))
      )}
    </div>
  );
}

export default App;
