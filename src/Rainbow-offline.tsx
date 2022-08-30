import { useState } from 'react';
import { useCallback } from 'react';

import { colors as defaultColors } from './constants/colors';
import styles from './Rainbow.module.css';

function ColorButton({
  color,
  onClick,
}: {
  color: { id: string; hex: string; count: number };
  onClick: (id: string) => void;
}) {
  const handleClick = useCallback(() => {
    onClick(color.id);
  }, [color.id, onClick]);

  return (
    <button
      type="button"
      className={styles.colorButton}
      style={{ '--hex': color.hex, '--proportion': color.count }}
      onClick={handleClick}
    ></button>
  );
}

export function Rainbow() {
  const [colors, setColors] = useState(() =>
    defaultColors.map((color) => ({ ...color, count: Math.random() })),
  );
  const handleColorClick = useCallback((id: string) => {
    console.log(id);
    setColors(
      defaultColors.map((color) => ({ ...color, count: Math.random() })),
    );
  }, []);

  return (
    <div className={styles.rainbow}>
      {colors.map((color) => (
        <ColorButton key={color.id} color={color} onClick={handleColorClick} />
      ))}
    </div>
  );
}
