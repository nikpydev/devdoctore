import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src={'/images/site/nikhil.jpg'}
          alt={'An image showing Nikhil'}
          height={300}
          width={300}
        />
      </div>
      <h1>Hi, I'm Nikhil</h1>
      <p>
        I am a Full-Stack developer who blogs about web development - especially
        frontend frameworks like React or Vue.
      </p>
    </section>
  );
};

export default Hero;
