import styles from './card.module.scss';

export default function Card(){
  const {
    text,
  } = styles;

  return(
    <div className={text}>
      I am a Card
    </div>
  );
}