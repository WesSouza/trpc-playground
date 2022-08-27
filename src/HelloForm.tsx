import React, { useCallback, useState } from 'react';

import { trpc } from './utils/trpc';

export function HelloForm() {
  const [text, setText] = useState('world');
  const hello = trpc.useQuery(['hello', { text }]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setText(event.currentTarget.value);
    },
    [],
  );

  return (
    <>
      <p>{hello.isLoading ? 'Loading...' : `Result ${hello.data?.greeting}`}</p>
      <p>
        Hello <input type="text" value={text} onChange={handleChange} />
      </p>
    </>
  );
}
