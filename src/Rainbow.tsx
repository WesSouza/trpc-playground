import { useState } from 'react';
import { useMemo } from 'react';
import { useCallback } from 'react';

import { colors as defaultColors } from './constants/colors';
import styles from './Rainbow.module.css';
import { trpc } from './utils/trpc';

function noop() {}

function ColorButton({
  color,
  disabled,
  onClick,
}: {
  color: { id: string; hex: string; count: number };
  disabled: boolean;
  onClick: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    onClick(color.id);
  }, [color.id, onClick]);

  return (
    <button
      className={styles.colorButton}
      disabled={disabled}
      onClick={handleClick}
      style={{ '--hex': color.hex, '--proportion': color.count }}
      type="button"
    ></button>
  );
}

export function Rainbow() {
  const [lock, setLock] = useState(false);
  const colors = trpc.useQuery(['getColors']);
  const vote = trpc.useMutation('vote');

  const handleColorClick = useCallback(
    (id: string) => {
      setLock(true);
      vote
        .mutateAsync(id)
        .then(() => colors.refetch())
        .finally(() => setLock(false));
    },
    [colors, vote],
  );

  const className = useMemo(
    () =>
      [
        styles.rainbow,
        colors.isFetching ? styles.rainbowLoading : '',
        colors.isError ? styles.rainbowError : '',
      ].join(' '),
    [colors.isError, colors.isFetching],
  );

  const locked = colors.isFetching || colors.isError || lock;

  if (!colors.data) {
    return (
      <div className={className}>
        {defaultColors.map((color) => (
          <ColorButton
            key={color.id}
            color={{ ...color, count: 1 }}
            disabled={true}
            onClick={noop}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={className}>
      {colors.data.map((color) => (
        <ColorButton
          key={color.id}
          color={color}
          disabled={locked}
          onClick={handleColorClick}
        />
      ))}
    </div>
  );
}
