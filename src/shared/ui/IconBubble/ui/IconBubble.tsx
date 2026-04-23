import { IconBubbleProps } from '../model/types';
import styles from './IconBubble.module.css';

export const IconBubble = ({ content = 0 }: IconBubbleProps) => (
  <span className={styles.iconBubble}>{content}</span>
);
