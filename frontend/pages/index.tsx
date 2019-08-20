import { useState } from 'react';

import { call } from '../api';

export default () => {
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState('');

  const onClick = async () => {
    setStatus('loading... (wait 8 seconds)')
    let result;
    if (count % 2 === 0) {
      result = await call('.test-js');
    } else {
      result = await call('.test-python');
    }
    setStatus(`Backend returned: ${result}`);
    setCount(count + 1);
  };

  return (
    <div>
      <div>Count: {count} {status}</div>
      <button onClick={onClick}>
        +
      </button>
    </div>
  )
}
