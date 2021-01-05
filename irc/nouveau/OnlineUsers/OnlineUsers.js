import React from 'react';

import './OnlineUsers.css';

const OnlineUsers = ({ users }) => (
  <div>
    <div>
      <h1>Realtime Chat Application <span role="img" aria-label="emoji">💬</span></h1>
    </div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({nickname}) => (
                  <div key={nickname}>
                    {nickname}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default OnlineUsers;