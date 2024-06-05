import styles from './AboutUs.module.css'
import workshopImage from '../../assets/workshop.webp'

const AboutUs = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.description}>
          Welcome to Galore Boutique, a small boutique that specializes in
          selling handmade bags from various talented sellers and designers.
          Each piece is crafted with care and precision, ensuring the highest
          quality for our customers. Our mission is to bring unique and stylish
          bags to fashion enthusiasts all over the world.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <img src={workshopImage} alt="Workshop" className={styles.image} />
      </div>
    </div>
  )
}

export default AboutUs
